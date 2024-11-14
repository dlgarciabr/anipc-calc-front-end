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
} 

export interface Simulation {
  nextStep: number
  company: Company,
  year: string,
  setNextStep: (nextStep: number) => void;
  setYear: (year: string) => void;
  setCompanyField: (name: string, valeu: string) => void;
  validateSimulation: () => FieldError[];
}