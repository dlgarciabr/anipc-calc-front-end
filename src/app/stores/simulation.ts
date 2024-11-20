import { create } from 'zustand';
import { Input, InputCategory, Simulation } from '../../types';
import { validateSimulation } from './validations';

const initialState: Simulation = {
  nextStep: 0,
  company: {
    name: '',
    cae: '',
    line: '',
    submitterEmail: '',
    submitterName: '',
  },
  year: '',
  inputCategories: {},
  setInputCategories: (categories: InputCategory[]) => {},
  setInput: (input: Input) => {},
  getInput: (categoryId: string, inputId: string) => ({id: '', name: '', description: '', unit: [], value: ''}),
  setNextStep: (nextStep: number) => { },
  setYear: () => { },
  setCompanyField: () => { },
  validateSimulation: () => [],
  inputValues: { }
}

export const useSimulationStore = create<Simulation>((set, get) => ({
  ...initialState,
  setNextStep: (nextStep: number) => set((state) => ({
    ...state,
    nextStep
  })),
  setYear: (year: string) => set((state) => ({
    ...state,
    year
  })),
  setInputCategories: (categories: InputCategory[]) => set((state) => ({
    ...state,
    inputCategories: Object.fromEntries(categories.map(category => [category.id, category]))
  })),
  setCompanyField: (name: string, valeu: string) => set((state) => ({
    ...state,
    company: {
      ...state.company,
      [name]:valeu
    }
  })),
  validateSimulation: () => validateSimulation(get(), get().nextStep),
  getInput: (categoryId: string, inputId: string) => get().inputCategories[categoryId].inputs[inputId],
  setInput: (input: Input) => set((state) => {
    const newInputValue =  { 
      id: input.id,
      value: input.value,
      unit: input.unit[0],
    };
    return {
      ...state,
      inputValues: {
        ...state.inputValues, 
        [newInputValue.id] : newInputValue
      }
    }
  }),
}));