"use client"

import React from "react";
import CalculatorStep from "@/components/CalculatorStep";
import dynamic from "next/dynamic";
import StepWizard, { StepWizardProps } from "react-step-wizard";
import CalculatorNavigator from "@/components/CalculatorNavigator";

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
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    wizardState.nextStep();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    wizardState.previousStep();
  };

  const setInstance = (wizard: StepWizardProps) => setWizardState({
    ...wizardState,
    ...wizard,
  });

  const steps: JSX.Element[] = [
    <CalculatorStep key={1}>step 1</CalculatorStep>,
    <CalculatorStep key={2}>step 2</CalculatorStep>,
    <CalculatorStep key={3}>step 3</CalculatorStep>
  ]
  return (
    <>
      <StepWizard instance={setInstance}>
        {steps}
      </StepWizard>
      <CalculatorNavigator activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} totalSteps={steps.length} />
    </>
  );
}

export default dynamic(() => Promise.resolve(Calculator), {
  ssr: false
})
