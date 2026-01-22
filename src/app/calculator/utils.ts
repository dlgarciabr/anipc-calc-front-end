import { FileInputGroup, InputGroup, InputValue } from "@/types"
import { ChangeEvent } from "react";

export const mapToObject = (value: unknown): any => {
  if (value instanceof Map) {
    const obj: Record<string, unknown> = {};
    for (const [k, v] of value) {
      // Keys in JSON objects are strings; convert number keys to string
      const key = typeof k === "number" ? String(k) : String(k);
      obj[key] = mapToObject(v);
    }
    return obj;
  }

  if (Array.isArray(value)) {
    return value.map((v) => mapToObject(v));
  }

  if (value !== null && typeof value === "object") {
    // Recurse into plain objects
    const cloned: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      cloned[k] = mapToObject(v);
    }
    return cloned;
  }

  // Primitive value
  return value;
}

export const exportToJSONFile = (versão: string, inputGroups: Map<number, InputGroup>) => {  

  const jsonStr = { 
    Version: versão, 
    ...mapToObject(inputGroups) 
  };

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(jsonStr)));
  element.setAttribute('download', 'calculadora.json');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export const readDataFromFile = async (event: ChangeEvent<HTMLInputElement>): Promise<{ errorMessage?: string, data?: Map<number, InputGroup> }> => {
  if(!event.target.files?.length){
    return {};
  }

  const file = event.target.files[0];

  if(file.type != 'application/json'){
    return { errorMessage: 'Ficheiro inválido' };
  }

  const data = new Map<number, InputGroup>();

  const inportedData = await new Response(file).json() as { [key: number ]: FileInputGroup };

  Object.keys(inportedData).forEach(groupId => {
    const importedGroup = inportedData[parseInt(groupId)];
    const inputGroup = {
      id: importedGroup.id,
      name: importedGroup.name,
      inputs: new Map<number, InputValue>(),
    }
    Object.keys(importedGroup.inputs).forEach(inputId => {
      const importedValue = importedGroup.inputs[parseInt(inputId)];
      const inputValue = {
        id: importedValue.id,
        value: importedValue.value,
        unit: importedValue.unit,
        name: importedValue.name || '',
        customValue: importedValue.customValue
      }
      inputGroup.inputs.set(parseInt(inputId), inputValue);
    })
    data.set(inputGroup.id, inputGroup);
  });

  return { data };
}