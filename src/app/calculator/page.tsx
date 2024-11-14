"use client"

import React, { useEffect } from "react";
import CalculatorStep from "@/components/CalculatorStep";
import dynamic from "next/dynamic";
import StepWizard, { StepWizardProps } from "react-step-wizard";
import CalculatorNavigator from "@/components/CalculatorNavigator";
import CompanyFormStep from "@/components/CompanyFormStep";
import { useSimulationStore } from "../stores/simulation";
import YearSelectionStep from "@/components/YearSelectionStep";
import { getCategories } from "./api";
import DynamicCategoryForm from "@/components/DynamicCategoryForm";

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
  const { validateSimulation, setNextStep, inputCategories, setInputCategories } = useSimulationStore((state) => state);

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

  useEffect(()=>{
    if(!Object.keys(inputCategories).length){
      const categories = getCategories('');
      setInputCategories(categories);
    }
  },[inputCategories, setInputCategories])

  const dinamicSteps = Object.values(inputCategories).map((category) => (
    <CalculatorStep key={category.id}>
      <DynamicCategoryForm category={category} />
    </CalculatorStep>
  ));

  const steps: JSX.Element[] = [
    <CompanyFormStep key={0} />,
    <YearSelectionStep key={1} />,
    ...dinamicSteps
  ];

  return (
    <>
      {
        dinamicSteps.length > 0 ?
        <StepWizard instance={setInstance} isHashEnabled={true}>
          {steps}
        </StepWizard> :
        'LOADING...'
      }
      <CalculatorNavigator activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} totalSteps={steps.length} />
    </>
  );
}

export default dynamic(() => Promise.resolve(Calculator), {
  ssr: false
})
