"use client"

import React from "react";
import CalculatorStep from "@/components/CalculatorStep";
import dynamic from "next/dynamic";
import StepWizard, { StepWizardProps } from "react-step-wizard";
import CalculatorNavigator from "@/components/CalculatorNavigator";
import CompanyFormStep from "@/components/CompanyFormStep";
import { useSimulationStore } from "../stores/simulation";
import YearSelectionStep from "@/components/YearSelectionStep";

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
  const { validateSimulation, setNextStep } = useSimulationStore((state) => state);

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setNextStep(nextStep);
    if(!validateSimulation().length){
      setActiveStep(nextStep);
      wizardState.nextStep();
    }
  };

  const handleBack = () => {
    const nextStep = activeStep - 1;
    setNextStep(nextStep);
    if(!validateSimulation().length){
      setActiveStep(nextStep);
      wizardState.previousStep();
    }
  };

  const setInstance = (wizard: StepWizardProps) => setWizardState({
    ...wizardState,
    ...wizard,
  });

  const steps: JSX.Element[] = [
    <CompanyFormStep key={0} />,
    <YearSelectionStep key={1} />,
    <CalculatorStep key={2}>step 3</CalculatorStep>,
    <CalculatorStep key={3}>step 4</CalculatorStep>
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
