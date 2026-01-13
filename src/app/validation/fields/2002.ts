import { InputValue, Simulation } from "@/types"

const validate = (input: InputValue, simulation: Simulation) => {
  const otherId = 2001;
  const other = simulation.getInput(otherId);

  if(!input || !other){
    return '';
  }
  if(Number(input.value) > Number(other.value)){
    const name = simulation.form.Groups.flatMap(g => g.Fields).find(f => f.ID === otherId)?.Name || 'o outro campo';
    return `Valor preenchido maior que ${name}`;
  }
  return '';
}

export default validate;