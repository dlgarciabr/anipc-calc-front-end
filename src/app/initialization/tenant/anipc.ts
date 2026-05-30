import { Simulation } from "@/types";

declare global {
  interface Window {
    userData?: { first_name: string; last_name: string };
  }
}

const postInitialize = (simulation: Simulation) => {
  console.log("Anipc Initializator found.");

  const userData = window.userData;

  console.log("User data from window object:", userData);

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