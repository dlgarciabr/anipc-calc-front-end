import { create } from 'zustand';
import { InputValue, InputGroup, Simulation, RequestForm, FieldError, SimulationData } from '../../types';
import { hasErrors } from '../validation';

const initialState: Simulation = {
  nextStep: 0,
  form: { ID: '', Groups: []},
  setForm: (form: RequestForm) => {console.log(form)},
  inputGroups: {},
  setInputGroups: (groups: InputGroup[]) => {console.log(groups)},
  getData: () => ({} as SimulationData),
  setInput: (groupId: number, input: InputValue) => {console.log(groupId + input.value)},
  getInput: (inputId: number) => { console.log(inputId); return undefined},
  setNextStep: (nextStep: number) => { console.log(nextStep) },
  hasErrors: () => Promise.resolve(false),
  errors: [],
}

export const useSimulationStore = create<Simulation>((set, get) => ({
  ...initialState,
  setForm: (form: RequestForm) => set((state) => ({
    ...state,
     form
  })),
  setNextStep: (nextStep: number) => set((state) => ({
    ...state,
    nextStep
  })),
  setInputGroups: (groups: InputGroup[]) => set((state) => ({
    ...state,
    inputGroups: Object.fromEntries(groups.map(group => [group.id, group]))
  })),
  getData: () => ({
    ID: get().form.ID,
    Groups: Object.values(get().inputGroups).map(group => ({
      ID: group.id,
      Values: Object.values(group.inputs).map(inputValue => ({ID: inputValue.id, Value: inputValue.value, Unit: inputValue.unit}))
    }))
  }),
  errors: [],
  hasErrors: () => hasErrors(
    get(), 
    (errors: FieldError[]) => set((state) => ({
      ...state,
      errors
    }))
  ),
  getInput: (inputId: number) => {
    const inputs:InputValue[] = [];
    Object.values(get().inputGroups).forEach(group => inputs.push(...Object.values(group.inputs)));
    const input = inputs.find(input => input.id === inputId);
    if(!input){
      return {id: inputId, value: '', unit: ''};
    }
    return input;
  },
  setInput: (groupId: number, {id, value, unit}: InputValue) => set((state) => {
    const currentValue = get().getInput(id);
    if(!currentValue){
      return state;
    }
    const newInputValue =  { id, value, unit: !!unit ? unit: currentValue.unit };
    const group = state.inputGroups[groupId] || { id: groupId, inputs: {}};
    
    const newInputs = Object.values(group.inputs).length > 0 ? 
      {
        ...group.inputs,
        [id]: newInputValue
      } : 
      { [id]: newInputValue };

    return {
      ...state,
      inputGroups: {
        ...state.inputGroups, 
        [groupId] : {
          ...group,
          inputs: newInputs
        }
      }
    }
  }),
}));
