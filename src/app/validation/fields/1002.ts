import { InputValue, Simulation } from "@/types"

const validate = (input: InputValue, simulation: Simulation) => {
  console.log(input.value.length)
  if(!input || input.value.length < 15){
    return 'nome pequeno demais';
  }
  return '';
}

export default validate;