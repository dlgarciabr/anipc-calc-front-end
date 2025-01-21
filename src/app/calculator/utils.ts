import { InputGroup } from "@/types"
import { ChangeEvent } from "react";

export const exportToJSONFile = (inputGroups: { [key: string ]: InputGroup }) => {  
  const jsonStr = JSON.stringify(inputGroups);

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
  element.setAttribute('download', 'calculadora.json');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export const readDataFromFile = async (event: ChangeEvent<HTMLInputElement>): Promise<{ errorMessage?: string, data?: { [key: string ]: InputGroup } }> => {
  if(!event.target.files?.length){
    return {};
  }

  const file = event.target.files[0];

  if(file.type != 'application/json'){
    return { errorMessage: 'Ficheiro inválido' };
  }

  const data = await new Response(file).json() as { [key: string ]: InputGroup };

  return { data };
}