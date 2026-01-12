import { FieldError, Simulation } from "../../types";


const customFieldValidators = [2001, 2002, 2004]; 
const errors:FieldError[]  = [];

export const hasErrors = async (simulation: Simulation, setErrors: (errors:FieldError[]) => void): Promise<boolean> => {
  const runCustomeFieldValidations = async () => {
    await Promise.all(customFieldValidators.map(async fieldId => {
      const validationModule = await import(`./fields/${fieldId}`);
      const inputValue = simulation.getInput(fieldId)
      const errorMessage = validationModule.default(inputValue, simulation);
      if(errorMessage){
        errors.push({
          id: fieldId.toString(),
          message: errorMessage
        });
      }
    }));
  
    setErrors(errors);  
    return errors.length > 0;
  }

  errors.length = 0;
  if(!simulation){
    return false;
  }
  
  if(simulation.nextStep === 1){
    return false;
  }

  const groupToValidade = simulation.form.Groups[simulation.nextStep - 2];

  const skipValidation = false;//change for debug tests only

  if(skipValidation){
    return false;
  }

  groupToValidade.Fields.forEach(field => {
    const hasFixedValue = field.CustomValue === false && field.Values.length === 1;
    if(hasFixedValue){
      return;
    }

    const inputValue = simulation.inputGroups.get(groupToValidade.ID)?.inputs.get(field.ID);

    if(field.Required && !inputValue){
      errors.push({
        id: field.ID.toString(),
        message: field.Name + " é um campo obrigatório"
      });
    }

    if(!field.Required && (!inputValue || !inputValue.value)){
      return;
    }

    const isOtherOption = !!inputValue && field.CustomValue && !field.Values.some(value => value === inputValue.value);

    if((isOtherOption || !field.Values.length) && field.Units.length > 0 && inputValue && (!inputValue.unit || inputValue.unit === 'empty')){
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
  return await runCustomeFieldValidations();
}
