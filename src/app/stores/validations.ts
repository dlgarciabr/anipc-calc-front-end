import { FieldError, Simulation } from "../../types";

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
    const inputValue = simulation.inputGroups[groupToValidade.ID]?.inputs[field.ID];

    if(field.Required && !inputValue){
      errors.push({
        id: field.ID.toString(),
        message: field.Name + " é um campo obrigatório"
      });
    }

    const isOtherOption = !!inputValue && field.CustomValue && !field.Values.some(value => value === inputValue.value);

    if((isOtherOption || !field.Values.length) && field.Units.length > 0 && inputValue && !inputValue.unit){
      errors.push({
        id: `${field.ID}_un`,
        message: 'Campo obrigatório'
      });
    }

    const isInputField = field.Values.length === 0 || (inputValue && field.Values.length > 0 && field.CustomValue && !field.Values.some(value => value === inputValue.value));

    if(isInputField && inputValue && field.Regex && !(new RegExp(field.Regex)).test(inputValue.value)){
      errors.push({
        id: field.ID.toString(),
        message: `Campo ${field.Name} inválido`
      });
    }
  });

  setErrors(errors);
  console.log('validation: errors', errors)
  return errors.length > 0;
}