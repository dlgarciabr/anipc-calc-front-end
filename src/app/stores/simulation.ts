import { create } from 'zustand';
import { InputValue, InputGroup, Simulation, RequestForm, FieldError, SimulationData } from '../../types';
import { hasErrors } from './validations';

const initialState: Simulation = {
  nextStep: 0,
  form: { ID: '', Groups: []},
  setForm: (form: RequestForm) => {},
  inputGroups: {},
  setInputGroups: (groups: InputGroup[]) => {},
  getData: () => ({} as SimulationData),
  setInput: (input: InputValue) => {},
  getInput: (groupId: number, inputId: number) => ({id: 0, value: '', groupId: 0}),
  setNextStep: (nextStep: number) => { },
  hasErrors: () => false,
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
    groups: Object.values(get().inputGroups).map(group => ({
      Name: group.id,
      values: Object.values(group.inputs)
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
  getInput: (groupId: number, inputId: number) => { 
    const group = get().inputGroups[groupId];
    if(!group || !group.inputs[inputId]){
      return {groupId, id: inputId, value: '', unit: ''};
    }
    return group.inputs[inputId];
  },
  setInput: ({id, groupId, value, unit}: InputValue) => set((state) => {
    const currentValue = get().getInput(groupId, id);
    const newInputValue =  { id, value, unit: !!unit ? unit: currentValue.unit, groupId };
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
