import { Company, FieldError } from "../types";

const requiredMessage = 'É obrigatorio';

export const validateCompany = (company: Company): FieldError[] => {
  const errors:FieldError[]  = [];
  if(!company.name){
    errors.push({
      name: 'name',
      message: requiredMessage
    })
  }
  if(!company. cae){
    errors.push({
      name: 'cae',
      message: requiredMessage
    })
  }
  return errors;
}