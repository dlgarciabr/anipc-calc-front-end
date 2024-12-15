export interface FieldError {
  name: string;
  message: string;
};

export interface InputGroup {
  id: string;
  name: string;
  inputs: { [key: string ]: InputValue },
}

export interface InputValue {
  id: number;
  groupId: string;
  value: string;
  unit?: string;
}

export interface Simulation {
  nextStep: number;
  year: string;
  inputGroups: { [key: string ]: InputGroup };
  setInputGroups: (categories: InputGroup[]) => void;
  setInput: (input: InputValue) => void;
  getInput: (groupId: string, inputId: number) => InputValue;
  setNextStep: (nextStep: number) => void; 
  validateSimulation: () => FieldError[];
  // inputValues: { [key: string]: InputValue };
}

export interface RequestForm {
  ID: string;
  Groups: RequestGroup[];
}

export interface RequestGroup {
  Name: string;
  Desc: string;
  Fields: RequestField[];
}

export interface RequestField {
  ID: number;
  Name: string;
  Desc: string;
  Units: RequestUnit[];
  Required: boolean;
  MultiField: boolean;
  Values: string[];
  CustomValue: boolean;
  Regex: string;
}

export interface RequestUnit {
  Unit: string;
  FC: string;
} 