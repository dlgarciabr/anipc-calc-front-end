"use client"

import React, { useEffect, useCallback } from "react";
import CalculatorStep from "@/components/CalculatorStep";
import dynamic from "next/dynamic";
import StepWizard, { StepWizardProps } from "react-step-wizard";
import CalculatorNavigator from "@/components/CalculatorNavigator";
import { useSimulationStore } from "../stores/simulation";
import { getForm } from "./api";
import DynamicGroupForm from "@/components/wizardSteps/DynamicGroupForm";
import { Container, createTheme, Grid2 as Grid, Theme, ThemeProvider } from "@mui/material";
import FinalStep from "@/components/wizardSteps/FinalStep";
import InitialStep from "@/components/wizardSteps/InitialStep";
import { setupScheme } from "@/components/utils/scheme";
import Loading from "@/components/Loading";
import { useLeavePageConfirm } from "../utils/useLeavePageConfirm";
import { useSearchParams } from "next/navigation";
import Error from "@/components/Error";

export interface ExtendedWizardProps extends StepWizardProps {
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
}

export interface ErrorProps {
  title?: string; 
  description?: string; 
  onRetry?: () => void;
}

const Calculator = () => {
  const searchParams = useSearchParams()
  const calcId = searchParams.get('id');
  useLeavePageConfirm(true);
  const [wizardState, setWizardState] = React.useState<ExtendedWizardProps>({
    initialStep: 0,
    nextStep: () => {},
    previousStep: () => {},
    goToStep: (step: number) => {console.log('navigate to step ' + step)},
  });
  const [ activeStep, setActiveStep ] = React.useState<number>(0);
  const { setNextStep, setForm, form, hasErrors, routerParam, setRouterParam, setInputGroups } = useSimulationStore((state) => state);
  const [ theme, setTheme ] = React.useState<Theme>(createTheme());
  const [ loading, setLoading ] = React.useState<boolean>(false);
  const [ error, setError ] = React.useState<ErrorProps | undefined>();

  const handleNext = async () => {
    const nextStep = activeStep + 1;
    setNextStep(nextStep);
    const isStepValid = (!await hasErrors());
    if(isStepValid){
      setActiveStep(nextStep);
      wizardState.nextStep();
    }
  };

  const handleBack = () => {
    const nextStep = activeStep - 1;
    setNextStep(nextStep);
    setActiveStep(nextStep);
    wizardState.previousStep();
  };

  const setInstance = (wizard: StepWizardProps) => setWizardState({
    ...wizardState,
    ...wizard,
  });

  const loadForm = useCallback(async () => {
    setLoading(true);
    let calcForm = form;
    if(!calcId && !calcForm.ID){
      setError({});
      setLoading(false);
      return;
    }
    if(!calcForm.ID && calcId){
      try{
        setError(undefined);
        calcForm = await getForm(calcId);
        setForm(calcForm);
      }catch{
        setError({});
        setLoading(false);
      }
    }
    const customTheme = createTheme(setupScheme(`#${calcForm.Colors[0]}`, `#${calcForm.Colors[1]}`));
    setTheme(customTheme);
    setLoading(false);
  }, [calcId, form, setForm]);

  const renderDynamicSteps = () => { 
    if(!form){
      return []
    }
    return form.Groups.map((group) => (
      <CalculatorStep key={group.ID}>
        <DynamicGroupForm group={group} />
      </CalculatorStep>
    ));
  };

  const goToLastStep = React.useCallback(async () => {
    const nextStep = 7;
    setNextStep(nextStep);
    const isStepValid = (!await hasErrors());
    if(isStepValid){
      setActiveStep(nextStep);
      wizardState.goToStep(8);
      setRouterParam('');
    }
  },[hasErrors, setNextStep, wizardState, setRouterParam]);

  useEffect(() => {
    void loadForm();
  },[loadForm])

  useEffect(() => {
    if(routerParam === 'new' && activeStep === 0){
      setRouterParam('');
      setInputGroups([]);
    }
    if(routerParam === 'edit' && activeStep === 0){
      goToLastStep();
    }
  },[activeStep, goToLastStep, routerParam, setForm, setInputGroups, setRouterParam])

  const generateSteps = (): JSX.Element[] => [
    <InitialStep key="initialStep" onBegin={handleNext}/>,
    ...renderDynamicSteps(),
    <FinalStep key="finalStep" onBeforeSend={() => setLoading(true)} onError={onFinalStepError}/>
  ];

  const onFinalStepError = () => {
    setLoading(false); 
    setError({
      onRetry: () => {
        setError(undefined);
        setActiveStep(0);
      }
    });
  }

  return (
    <ThemeProvider theme={theme} defaultMode="light">
      { loading ? 
        <Loading /> : (
          error ? 
            <Error onRetry={error.onRetry}/> : (
            <Container maxWidth="md">
              <Grid container>
                <Grid size={{ xs: 12, md: 12 }} sx={{minHeight: '780px'}}>
                  {
                    <StepWizard instance={setInstance} >
                      {generateSteps()}
                    </StepWizard>
                  }
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                  <CalculatorNavigator activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} totalSteps={generateSteps().length} />
                </Grid>
              </Grid>
            </Container>
          )
        )
      }
    </ThemeProvider>
  );
}

export default dynamic(() => Promise.resolve(Calculator), {
  ssr: false
})
