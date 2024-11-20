import { FieldError, Simulation } from "../../types";
import { getCategories } from "../calculator/api";

const requiredMessage = 'É obrigatorio';

export const validateSimulation = (simulation: Simulation, nextStep: number): FieldError[] => {
  const errors:FieldError[]  = [];
  const skipValidation = false;

  const validateInputValue = (inputId: string) => {
    const inputValue = simulation.inputValues[inputId];
    if(!inputValue || !inputValue.value){
      errors.push({
        name: inputId,
        message: requiredMessage
      })
    }
  }

  if(skipValidation){
    return [];
  }
  switch(nextStep){
    case 1:
      if(!simulation.company.name){
        errors.push({
          name: 'name',
          message: requiredMessage
        })
      }
      break;
    case 2:
      if(!simulation.year){
        errors.push({
          name: 'year',
          message: requiredMessage
        })
      }
      break;
    case 3:
      const category = getCategories('')[0];
      const inputKeys = Object.keys(category.inputs);
      validateInputValue(category.inputs[inputKeys[0]].id);
      validateInputValue(category.inputs[inputKeys[1]].id);
      validateInputValue(category.inputs[inputKeys[2]].id);
      validateInputValue(category.inputs[inputKeys[3]].id);
      break;
    case 4:
    default:
  }
  return errors;
}