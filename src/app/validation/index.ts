import { FieldError, InputValue, Simulation } from "../../types";


const customFieldValidators = [2002]; 
const errors:FieldError[]  = [];

export const hasErrors = async (simulation: Simulation, setErrors: (errors:FieldError[]) => void): Promise<boolean> => {

  const runCustomeFieldValidations = async () => {
    await Promise.all(customFieldValidators.map(async fieldId => {
      const module = await import(`./fields/${fieldId}`);
      const inputValue = simulation.getInput(fieldId)
      const errorMessage = module.default(inputValue, simulation);
      if(errorMessage){
        errors.push({
          id: fieldId.toString(),
          message: errorMessage
        });
      }
    }));
  
    setErrors(errors);
    console.log('validation: errors', errors)
  
    return errors.length > 0;
  }

  errors.length = 0;
  if(!simulation){
    return false;
  }

  const groupToValidade = simulation.form.Groups[simulation.nextStep - 1]

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

  return await runCustomeFieldValidations();
}
