import { create } from 'zustand';
import { InputValue, InputGroup, Simulation, RequestForm, FieldError } from '../../types';
import { hasErrors } from './validations';

const initialState: Simulation = {
  nextStep: 0,
  form: { ID: '', Groups: []},
  setForm: (form: RequestForm) => {},
  inputGroups: {},
  setInputGroups: (groups: InputGroup[]) => {},
  setInput: (input: InputValue) => {},
  getInput: (groupId: string, inputId: number) => ({id: 0, value: '', groupId: ''}),
  setNextStep: (nextStep: number) => { },
  hasErrors: () => boolean,
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
  errors: [],
  hasErrors: () => hasErrors(
    get(), 
    (errors: FieldError[]) => set((state) => ({
      ...state,
      errors
    }))
  ),
  getInput: (groupId: string, inputId: number) => { 
    const group = get().inputGroups[groupId];
    if(!group || !group.inputs[inputId]){
      return {groupId, id: inputId, value: '', unit: ''};
    }
    return group.inputs[inputId];
  },
  setInput: ({id, groupId, value, unit}: InputValue) => set((state) => {
    const newInputValue =  { id, value, unit, groupId };
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
