export interface Session {
  token: string;
  setToken: (token: string) => void;
}

export interface FieldError {
  id: string;
  message: string;
};

export interface InputGroup {
  id: number;
  name: string;
  inputs: Map<number, InputValue>;
}

export interface InputValue {
  id: number;
  value: string;
  name: string;
  unit?: string;
  customValue?: boolean;
}

export interface FileInputValue {
  id: number;
  value: string;
  name?: string;
  unit?: string;
  customValue?: boolean;
}

export interface FileInputGroup {
  id: number; 
  name: string;
  inputs: {[key: string ]: FileInputValue };
}

export interface Simulation {
  routerParam: string;
  nextStep: number;
  totalSteps: number;
  form: RequestForm;
  setForm: (form: RequestForm) => void;
  inputGroups: Map<number, InputGroup>;
  getData: () => SimulationData;
  setInputGroups: (groups: Map<number, InputGroup>) => void;
  setInput: (groupId: number, input: InputValue) => void;
  getInput: (inputId: number) => InputValue | undefined;
  deleteInput: (groupId: number, inputId: number) => void,
  setNextStep: (nextStep: number) => void;
  hasErrors: () => Promise<boolean>;
  errors: FieldError[];
  clearErrors: () => void;
  result?: SimulationResult;
  setResult: (result: SimulationResult) => void;
  setRouterParam: (origin: string) => void;
}

export interface RequestForm {
  ID: string;
  Title: string;
  Desc: string;
  Disclaimer: string;
  CalculatorVersion: string;
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
  FormData: unknown;
}

export interface SimulationResultValue {
  Title: string;
  Label: string;
  Unit: string;
  Value: string;
  Color: string;
}

export interface SimulationResultGroup {
  Title: string
  Type: string;
  Values: SimulationResultValue[];
}

export interface SimulationResultReport {
  Title: string
  Desc: string[];
  Groups: SimulationResultGroup[][];
}

export interface SimulationResult {
  ID: string;
  Title: string;
  Description: string;
  Reports: SimulationResultReport[];
}

export interface FileDownloadble {
  name: string;
  content: Blob;
}