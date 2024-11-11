"use client"

import React from "react";
import CalculatorStep from "@/components/CalculatorStep";
import dynamic from "next/dynamic";
import StepWizard, { StepWizardProps } from "react-step-wizard";
import CalculatorNavigator from "@/components/CalculatorNavigator";
import CompanyFormStep from "@/components/CompanyFormStep";
import { useSimulationStore } from "../stores/simulation";

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
  const { validateStepCompany } = useSimulationStore((state) => state);

  const handleNext = () => {
    if(validateStepChange(activeStep)){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      wizardState.nextStep();
    }
  };

  const handleBack = () => {
    if(validateStepChange(activeStep)){
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      wizardState.previousStep();
    }
  };

  const setInstance = (wizard: StepWizardProps) => setWizardState({
    ...wizardState,
    ...wizard,
  });

  const validateStepChange = (currentStep: number): boolean => {
    console.log(validateStepCompany())
    switch(currentStep){
      case 0: 
        return !validateStepCompany().length;
      case 1:
        return true;
      default:
        return true;
    }
  };

  const steps: JSX.Element[] = [
    <CompanyFormStep key={1} />,
    <CalculatorStep key={2}>step 2</CalculatorStep>,
    <CalculatorStep key={3}>step 3</CalculatorStep>
  ];

  return (
    <>
      <StepWizard instance={setInstance} isHashEnabled={true}>
        {steps}
      </StepWizard>
      <CalculatorNavigator activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} totalSteps={steps.length} />
    </>
  );
}

export default dynamic(() => Promise.resolve(Calculator), {
  ssr: false
})
