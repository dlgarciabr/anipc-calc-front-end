import { useSimulationStore } from "@/app/stores/simulation";
import { TextField } from "@mui/material";

interface InputTextFieldProps {
  categoryId: string;
  inputId: string;
  onChangeInput: (inputId: string, value: string, unit: string) => void;
}

const InputTextField = ({categoryId, inputId, onChangeInput}: InputTextFieldProps) => {
  const { validateSimulation, getInput } = useSimulationStore((state) => state);

  const input = getInput(categoryId, inputId);

  if(!input){
    return <></>;
  }

  return (
    <TextField
      error={validateSimulation().some(error => error.name === inputId)}
      label={input.name}
      defaultValue={input.value}
      onChange={(e)=>onChangeInput(inputId, e.target.value, input.unit[0])}
      helperText={validateSimulation().find(error => error.name === inputId)?.message}
      required={input.required}
      fullWidth
    />
  );
};

export default InputTextField;