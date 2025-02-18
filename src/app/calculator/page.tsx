"use client"

import React, { useEffect, useCallback } from "react";
import CalculatorStep from "@/components/CalculatorStep";
import dynamic from "next/dynamic";
import StepWizard, { StepWizardProps } from "react-step-wizard";
import CalculatorNavigator from "@/components/CalculatorNavigator";
import { useSimulationStore } from "../stores/simulation";
import { getForm } from "./api";
import DynamicGroupForm from "@/components/wizardSteps/DynamicGroupForm";
import { Container, createTheme, Grid2 as Grid, ThemeProvider } from "@mui/material";
import FinalStep from "@/components/wizardSteps/FinalStep";
import InitialStep from "@/components/wizardSteps/InitialStep";
import { setupScheme } from "@/components/utils/scheme";

export interface ExtendedWizardProps extends StepWizardProps {
  nextStep: () => void;
  previousStep: () => void;
}

const primaryColor = '#c3cf21';
const secondayColor = '#53534a';

const theme = createTheme(setupScheme(primaryColor, secondayColor));

const Calculator = () => {
  const [wizardState, setWizardState] = React.useState<ExtendedWizardProps>({
    initialStep: 0,
    nextStep: () => {},
    previousStep: () => {},
  });
  const [ activeStep, setActiveStep ] = React.useState<number>(0);
  const { setNextStep, setForm, form, hasErrors } = useSimulationStore((state) => state);

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
    const form = await getForm('anipc');
    setForm(form);
  }, [setForm]);

  useEffect(()=>{
    void loadForm();
  },[loadForm])

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

  const generateSteps = (): JSX.Element[] => [
    <InitialStep key="initialStep" onBegin={handleNext}/>,
    ...renderDynamicSteps(),
    <FinalStep key="finalStep"/>
  ];

  return (
    <ThemeProvider theme={theme} defaultMode="light">
      {
        !form ? 
        <>loading</> :
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
      }
    </ThemeProvider>
  );
}

export default dynamic(() => Promise.resolve(Calculator), {
  ssr: false
})
