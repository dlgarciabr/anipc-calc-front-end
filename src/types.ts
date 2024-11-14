export interface FieldError {
  name: string;
  message: string;
};

export interface Company {
  name: string;
  cae: string;
}

export interface InputCategory {
  id: string;
  name: string;
  inputs: { [key: string ]: Input },
}

export interface Input {
  id: string;
  name: string;
  description: string;
}

export interface Simulation {
  nextStep: number
  company: Company,
  year: string,
  inputCategories: { [key: string ]: InputCategory },
  setInputCategories: (categories: InputCategory[]) => void,
  setNextStep: (nextStep: number) => void; 
  setYear: (year: string) => void;
  setCompanyField: (name: string, valeu: string) => void;
  validateSimulation: () => FieldError[];
}