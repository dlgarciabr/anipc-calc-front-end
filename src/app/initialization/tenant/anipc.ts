import { Simulation } from "@/types";

const postInitialize = (simulation: Simulation) => {
  console.log("Anipc Initializator found.");

  const userData = (window as unknown as { userData: { cnpj?: string } }).userData as Record<string, string>;

  //const userData = { first_name: 'Empresa dummy', last_name: '834244234' } as Record<string, string>;

  const form = simulation.form;

  if(userData){
    form.Groups.find(group => group.Name === 'Dados da Empresa')?.Fields.forEach(field => {
      if(field.ID === 1002){
        field.Values = [userData.first_name];
        field.CustomValue = false;
      }
      if(field.ID === 1003){
        field.Values = [userData.last_name];
        field.CustomValue = false;
      }
    });

    simulation.setForm(form);
  }

  return '';
}

export default postInitialize;