import { InputValue, Simulation } from "@/types"

const validate = (input: InputValue, simulation: Simulation) => {
  const otherId = 2001;
  const other = simulation.getInput(otherId);

  if(!input || !other){
    return '';
  }
  if(Number(input.value) > Number(other.value)){
    return `Valor preenchido maior que ${other.name}`;
  }
  return '';
}

export default validate;