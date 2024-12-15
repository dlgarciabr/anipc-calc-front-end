import { FieldError, Simulation } from "../../types";

const requiredMessage = 'é obrigatorio';

export const hasErrors = (simulation: Simulation, setErrors: (errors:FieldError[]) => void): boolean => {
  if(!simulation){
    return false;
  }

  const groupToValidade = simulation.form.Groups[simulation.nextStep - 1]

  const errors:FieldError[]  = [];
  const skipValidation = false;

  if(skipValidation){
    return false;
  }

  groupToValidade.Fields.forEach(field => {
    const inputValue = simulation.inputGroups[groupToValidade.Name]?.inputs[field.ID];
    if(field.Required && !inputValue){
      errors.push({
        id: field.ID,
        message: field.Name + " " + requiredMessage
      })
    }

    if(inputValue && field.Regex && !(new RegExp(field.Regex)).test(inputValue.value)){
      errors.push({
        id: field.ID,
        message: `Preencha um ${field.Name} válido`
      })
    }
  });

  setErrors(errors);

  return errors.length > 0;
}