import { StepWizardChildProps } from "react-step-wizard";

export interface CalculatorStepProps extends Partial<StepWizardChildProps>{
  children : JSX.Element | string;
}

const CalculatorStep = (props: CalculatorStepProps) => {
  return (
    <>
      {props.children}
    </>
  )
}

export default CalculatorStep;