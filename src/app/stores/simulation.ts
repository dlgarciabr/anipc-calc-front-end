import { create } from 'zustand';
import { InputValue, InputGroup, Simulation, RequestForm, FieldError, SimulationData, SimulationResult } from '../../types';
import { hasErrors } from '../validation';
import { mapToObject } from '../calculator/utils';

export const initialFormState: RequestForm = {
  ID: '', 
  Groups: [],
  Title: '',
  Colors: [],
  Desc: '',
  Disclaimer: ''
}

const initialState: Simulation = {
  routerParam: '',
  nextStep: 0,
  totalSteps: 0,
  form: { ...initialFormState },
  setForm: (form: RequestForm) => {console.log(form)},
  inputGroups: new Map(),
  setInputGroups: (groups: Map<number, InputGroup>) => {console.log(groups)},
  getData: () => ({} as SimulationData),
  setInput: (groupId: number, input: InputValue) => {console.log(groupId + input.value)},
  getInput: (inputId: number) => { console.log(inputId); return undefined},
  deleteInput: (groupId: number, inputId: number) => { console.log(groupId + inputId) },
  setNextStep: (nextStep: number) => { console.log(nextStep) },
  hasErrors: () => Promise.resolve(false),
  errors: [],
  clearErrors: () => { console.log('clear errors') },
  result: undefined,
  setResult: (result: SimulationResult) => { console.log(result) },
  setRouterParam : (origin: string) => { console.log(origin) },
}

export const useSimulationStore = create<Simulation>((set, get) => ({
  ...initialState,
  setForm: (form: RequestForm) => set((state) => {
    const inputGroups = new Map<number, InputGroup>();

    form.Groups.forEach(group => {
      group.Fields.forEach(field => {
        const isFixedValue = field.Values.length === 1;
        let inputGroup = inputGroups.get(group.ID);
        if(!inputGroup){
          inputGroup = { id: group.ID, name: group.Name, inputs: new Map<number, InputValue>()};
        }
        
        if(isFixedValue){
          inputGroup.inputs.set(field.ID, {id: field.ID,  value: field.Values[0], name: field.Name}); 
        }
        inputGroups.set(group.ID, inputGroup);
      })
    });

    return {
      ...state,
       form,
      inputGroups,
      totalSteps: form.Groups.length + 2
    }
  }),
  setInputGroups: (inputGroups: Map<number, InputGroup>) => set((state) => ({
    ...state,
    inputGroups
  })),
  setNextStep: (nextStep: number) => set((state) => ({
    ...state,
    nextStep
  })),
  getData: () => ({
    ID: get().form.ID,
    Groups: Array.from(get().inputGroups.values()).map(group => ({
      ID: group.id,
      Values: Array.from(group.inputs.values()).map(inputValue => ({ID: inputValue.id, Value: inputValue.value, Unit: inputValue.unit})).filter(inputValue => !!inputValue.Value)
    })),
    FormData: mapToObject(get().inputGroups)
  }),
  errors: [],
  hasErrors: () => hasErrors(
    get(), 
    (errors: FieldError[]) => set((state) => ({
      ...state,
      errors
    }))
  ),
  clearErrors: () => set((state) => ({
    ...state,
    errors: []
  })),
  getInput: (inputId: number) => {
    const inputs:InputValue[] = [];
    Array.from(get().inputGroups.values()).forEach(group => inputs.push(...Array.from(group.inputs.values())));
    const input = inputs.find(input => input.id === inputId);
    if(!input){
      return {id: inputId, value: '', unit: '', name: ''};
    }
    return input;
  },
  deleteInput: (groupId: number, inputId: number) => set((state) => { 
    if(!inputId){
      return state;
    }

    const group = state.inputGroups.get(groupId);

    if(!group){
      return state;
    }

    group.inputs.delete(inputId);
    
    return {
      ...state,
      inputGroups: state.inputGroups.set(groupId, group)
    }
  }),
  setInput: (groupId: number, {id, value, unit, customValue, name}: InputValue) => set((state) => {
    const currentValue = get().getInput(id);
    if(!currentValue){
      return state;
    }
    const newInputValue =  { 
      id, value, 
      unit: !!unit ? unit : currentValue.unit, 
      customValue: customValue != undefined ? customValue : currentValue.customValue,
      name
    };

    const group = state.inputGroups.get(groupId) || {id: groupId, name: '', inputs: new Map()};
    group.inputs.set(id, newInputValue);

    return {
      ...state,
      inputGroups: state.inputGroups.set(groupId, group)
    }
  }),
  setResult: (result: SimulationResult) => set((state) => ({
    ...state,
    result
  })),
  setRouterParam: (param: string) => set((state) => ({
    ...state,
    routerParam: param
  }))
}));
