import { InputValue, Simulation } from "@/types"

const validate = (input: InputValue, simulation: Simulation) => {
  const inputEnergiaFaturada = simulation.getInput(2001);
  if(!input || !inputEnergiaFaturada){
    return '';
  }
  if(Number(input.value) > Number(inputEnergiaFaturada.value)){
    return 'Valor preenchido maior que Energia Faturada';
  }
  return '';
}

export default validate;