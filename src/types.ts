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
  customValue?: boolean;
}

export interface Simulation {
  nextStep: number;
  form: RequestForm;
  setForm: (form: RequestForm) => void;
  inputGroups: { [key: string ]: InputGroup };
  getData: () => SimulationData;
  setInputGroups: (categories: InputGroup[]) => void;
  setInput: (groupId: number, input: InputValue) => void;
  getInput: (inputId: number) => InputValue | undefined;
  deleteInput: (inputId: number) => void,
  setNextStep: (nextStep: number) => void;
  hasErrors: () => Promise<boolean>;
  errors: FieldError[];
  result?: SimulationResult;
  setResult: (result: SimulationResult) => void;
}

export interface RequestForm {
  ID: string;
  Title: string;
  Desc: string;
  Colors: string[];
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
  MultiFieldGroup: string;
  Values: string[];
  CustomValue: boolean;
  Regex: string;
}

export interface RequestUnit {
  Unit: string;
  FC: string;
}

export interface SimulationInputValue {
  ID: number;
  Value: string;
  Unit?: string;
}

export interface SimulationDataGroup {
  ID: number;
  Values: SimulationInputValue[];
}

export interface SimulationData {
  ID: string;
  Groups: SimulationDataGroup[];
}

export interface SimulationResultValue {
  Title: string
  Unit: string;
  Value: string;
}

export interface SimulationResultGroup {
  Title: string
  Type: string;
  Values: SimulationResultValue[];
}

export interface SimulationResultReport {
  Title: string
  Desc: string[];
  // Groups: SimulationResultGroup[];
  Groups: SimulationResultGroup[][];
}

export interface SimulationResult {
  ID: string;
  Title: string;
  Description: string;
  Reports: SimulationResultReport[];
}