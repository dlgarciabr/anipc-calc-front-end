export interface FieldError {
  name: string;
  message: string;
};

export interface Company {
  name: string;
  cae: string;
  line: string;
  submitterName: string;
  submitterEmail: string;
}

export interface InputCategory {
  id: string;
  name: string;
  inputs: { [key: string ]: Input },
}

export interface Input {
  id: string;
  name: string;
  unit: string[];
  value?: string;
  description: string;
  required?: boolean;
}

export interface InputValue {
  id: string;
  value?: string;
  unit: string;
}

export interface Simulation {
  nextStep: number
  company: Company,
  year: string,
  inputCategories: { [key: string ]: InputCategory },
  setInputCategories: (categories: InputCategory[]) => void,
  setInput: (input: Input) => void;
  getInput: (categoryId: string, inputId: string) => Input;
  setNextStep: (nextStep: number) => void; 
  setYear: (year: string) => void;
  setCompanyField: (name: string, valeu: string) => void;
  validateSimulation: () => FieldError[];
  inputValues: { [key: string]: InputValue };
}