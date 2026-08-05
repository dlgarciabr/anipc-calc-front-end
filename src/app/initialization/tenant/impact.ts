import { RequestForm, Simulation } from "@/types";

declare global {
  interface Window {
    userData?: { first_name: string; last_name: string };
  }
}

const postInitialize = (simulation: Simulation) => {
  window.addEventListener(
    "message",
    (event) => {
      if(typeof event.data === "string" && (event.data as string).startsWith("userData:")){
        const userData = JSON.parse(event.data.substring(9)) as { first_name: string; last_name: string };

        if(userData && simulation.form){
          const updatedForm = fillFormData(simulation.form, userData);
          simulation.setForm(updatedForm);
        }
      }
    },
    false,
  );

  
  window.parent.postMessage(
    'react_loaded', 
    '*'
  );

  return '';
}

const fillFormData = (form: RequestForm, userData: { first_name: string; last_name: string }) => {

  form.Groups.find(group => group.Name === 'Dados da Empresa')?.Fields.forEach(field => {
    if(field.ID === 1002){
      field.Values = [userData.last_name];
      field.CustomValue = false;
    }
    if(field.ID === 1003){
      field.Values = [userData.first_name];
      field.CustomValue = false;
    }
  });

  return form;
}

export default postInitialize;