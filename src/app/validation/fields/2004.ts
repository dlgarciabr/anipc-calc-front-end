import { InputValue, Simulation } from "@/types"

const validate = (input: InputValue, simulation: Simulation) => {
  const otherId = 2007;
  const other = simulation.getInput(otherId);
  if(!!other?.value && Number(other.value) > 0 && Number(input.value) <= 0){
    const name = simulation.form.Groups.flatMap(g => g.Fields).find(f => f.ID === otherId)?.Name || 'o outro campo';
    return `Tem que ser maior que zero pois existe ${name}`;
  }
  return '';
}

export default validate;