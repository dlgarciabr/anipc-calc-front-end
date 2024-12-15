import { create } from 'zustand';
import { InputValue, InputGroup, Simulation } from '../../types';
import { validateSimulation } from './validations';

const initialState: Simulation = {
  nextStep: 0,
  year: '',
  inputGroups: {},
  setInputGroups: (groups: InputGroup[]) => {},
  setInput: (input: InputValue) => {},
  getInput: (groupId: string, inputId: number) => ({id: 0, value: '', groupId: ''}),
  setNextStep: (nextStep: number) => { },
  validateSimulation: () => [],
  // inputValues: { }
}

export const useSimulationStore = create<Simulation>((set, get) => ({
  ...initialState,
  setNextStep: (nextStep: number) => set((state) => ({
    ...state,
    nextStep
  })),
  setInputGroups: (groups: InputGroup[]) => set((state) => ({
    ...state,
    inputGroups: Object.fromEntries(groups.map(group => [group.id, group]))
  })),
  validateSimulation: () => validateSimulation(get(), get().nextStep),
  getInput: (groupId: string, inputId: number) => { 
    const group = get().inputGroups[groupId];
    if(!group || !group.inputs[inputId]){
      return {groupId, id: inputId, value: '', unit: ''};
    }
    return group.inputs[inputId];
  },
  // setInput: ({id, value, unit}: InputValue) => set((state) => {
  //   const newInputValue =  { id, value, unit };
  //   return {
  //     ...state,
  //     inputValues: {
  //       ...state.inputValues, 
  //       [newInputValue.id] : newInputValue
  //     }
  //   }
  // }),
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