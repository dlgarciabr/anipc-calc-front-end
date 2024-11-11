import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { MobileStepper, Button, useTheme } from "@mui/material";

export interface CalculatorNavigatorProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  totalSteps: number;
}

const CalculatorNavigator = (props:  CalculatorNavigatorProps) => {
  const theme = useTheme();

  return (
    <MobileStepper
    variant="progress"
    steps={props.totalSteps}
    position="static"
    activeStep={props.activeStep}
    nextButton={
      <Button size="small" onClick={props.handleNext} disabled={props.activeStep >= props.totalSteps - 1}>
        Next
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </Button>
    }
    backButton={
      <Button size="small" onClick={props.handleBack} disabled={props.activeStep === 0}>
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
        Back
      </Button>
    }
  />
  )
}

export default CalculatorNavigator;