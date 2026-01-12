import { InputValue, Simulation } from "@/types"

const validate = (input: InputValue, simulation: Simulation) => {
  const other = simulation.getInput(2007);
  if(!!other?.value && Number(other.value) > 0 && Number(input.value) <= 0){
    return `Tem que ser maior que zero pois existe ${other?.name}`;
  }
  return '';
}

export default validate;