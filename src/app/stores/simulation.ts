import { create } from 'zustand';
import { InputCategory, Simulation } from '../../types';
import { validateSimulation } from './validations';

const initialState: Simulation = {
  nextStep: 0,
  company: {
    name: '',
    cae: ''
  },
  year: '',
  inputCategories: {},
  setInputCategories: (categories: InputCategory[]) => {},
  setNextStep: (nextStep: number) => { },
  setYear: () => { },
  setCompanyField: () => { },
  validateSimulation: () => [],
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
  validateSimulation: () => validateSimulation(get(), get().nextStep)
}));
