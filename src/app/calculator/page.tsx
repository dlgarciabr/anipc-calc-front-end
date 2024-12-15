"use client"

import React, { useEffect, useCallback } from "react";
import CalculatorStep from "@/components/CalculatorStep";
import dynamic from "next/dynamic";
import StepWizard, { StepWizardProps } from "react-step-wizard";
import CalculatorNavigator from "@/components/CalculatorNavigator";
import { useSimulationStore } from "../stores/simulation";
import { getForm } from "./api";
import DynamicGroupForm from "@/components/wizardSteps/DynamicGroupForm";
import { Alert, Container, Grid2 as Grid } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export interface ExtendedWizardProps extends StepWizardProps {
  nextStep: () => void;
  previousStep: () => void;
}

const Calculator = () => {
  const [wizardState, setWizardState] = React.useState<ExtendedWizardProps>({
    initialStep: 0,
    nextStep: () => {},
    previousStep: () => {},
  });
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const { setNextStep, setForm, form, hasErrors } = useSimulationStore((state) => state);

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setNextStep(nextStep);
    if(!hasErrors()){
      console.log('nextStep', nextStep);
      setActiveStep(nextStep);
      wizardState.nextStep();
    }
  };

  const handleBack = () => {
    const nextStep = activeStep - 1;
    setNextStep(nextStep);
    // if(!hasErrors()){
      setActiveStep(nextStep);
      wizardState.previousStep();
    // }
  };

  const setInstance = (wizard: StepWizardProps) => setWizardState({
    ...wizardState,
    ...wizard,
  });

  const loadForm = useCallback(async () => {
    const form = await getForm('');
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
      <CalculatorStep key={group.Name}>
        <DynamicGroupForm group={group} />
      </CalculatorStep>
    ));
};

  const generateSteps = (): JSX.Element[] => [
    ...renderDynamicSteps()
  ];

  return (
    !form ? 
    <>loading</> :
    <Container maxWidth="md">
      <Grid container>
        <Grid size={{ xs: 12, md: 12 }}>
          <Alert icon={<InfoOutlinedIcon fontSize="inherit" />} severity="warning">
            Step information message TODO
          </Alert>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          {
            <StepWizard instance={setInstance}>
              {generateSteps()}
            </StepWizard>
          }
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <CalculatorNavigator activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} totalSteps={generateSteps().length} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default dynamic(() => Promise.resolve(Calculator), {
  ssr: false
})
