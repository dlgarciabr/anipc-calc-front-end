import { FieldError, Simulation } from "../../types";

const requiredMessage = 'É obrigatorio';

export const validateSimulation = (simulation: Simulation, nextStep: number): FieldError[] => {
  const errors:FieldError[]  = [];
  const skipValidation = true;

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
      if(!simulation.company. cae){
        errors.push({
          name: 'cae',
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
    case 4:
    default:
  }
  return errors;
}