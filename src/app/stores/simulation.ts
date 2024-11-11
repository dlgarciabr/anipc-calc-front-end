import { create } from 'zustand';
import { Company, FieldError } from '../types';
import { validateCompany } from './validations';

interface Simulation {
  company: Company,
  setCompanyField: (name: string, valeu: string) => void;
  validateStepCompany: () => FieldError[];
}

const initialState: Simulation = {
  company: {
    name: '',
    cae: ''
  },
  setCompanyField: () => {},
  validateStepCompany: () => []
}

export const useSimulationStore = create<Simulation>((set, get) => ({
  ...initialState,
  setCompanyField: (name: string, valeu: string) => set((state) => ({
    ...state,
    company: {
      ...state.company,
      [name]:valeu
    }
  })), 
  validateStepCompany: () => validateCompany(get().company)
}));
