export interface FieldError {
  id: string;
  message: string;
};

export interface InputGroup {
  id: number;
  name: string;
  inputs: { [key: string ]: InputValue },
}

export interface InputValue {
  id: number;
  value: string;
  unit?: string;
}

export interface Simulation {
  nextStep: number;
  form: RequestForm;
  setForm: (form: RequestForm) => void;
  inputGroups: { [key: string ]: InputGroup };
  getData: () => SimulationData;
  setInputGroups: (categories: InputGroup[]) => void;
  setInput: (groupId: number, input: InputValue) => void;
  getInput: (groupId: number, inputId: number) => InputValue;
  setNextStep: (nextStep: number) => void;
  hasErrors: () => boolean;
  errors: FieldError[];
}

export interface RequestForm {
  ID: string;
  Groups: RequestGroup[];
}

export interface RequestGroup {
  Name: string;
  ID: number;
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

export interface SimulationDataGroup {
  ID: number;
  values: InputValue[];
}

export interface SimulationData {
  ID: string;
  groups: SimulationDataGroup[];
}