import { InputCategory } from "../../types";

export const getCategories = (year : string): InputCategory[] => {
  return [
    {
      id: 'ELETRICA',
      name: 'Consumo de Energia Eletrica',
      inputs: {
        '1': {
          id: '1',
          name: 'Faturada',
          description: 'Faturada desc'
        },
        '2': {
          id: '2',
          name: 'Renovavel (garantia de origem)',
          description: 'Renovavel (garantia de origem) desc'
        }
      }
    },
    {
      id: 'COMBUSTAO_ESTACIONARIA',
      name: 'Combustão Estacionária',
      inputs: {
        '3': {
          id: '3',
          name: 'Gas Propano',
          description: 'Faturada desc'
        },
        '4': {
          id: '4',
          name: 'Gas natural',
          description: 'natural desc'
        }
      }
    },
    {
      id: 'COMBUSTAO_MOVEL',
      name: 'Combustão Móvel',
      inputs: {
        '5': {
          id: '5',
          name: 'Gasoleo',
          description: 'Gasoleo desc'
        },
        '6': {
          id: '6',
          name: 'Gasolina',
          description: 'Gasolina desc'
        }
      }
    }
  ]
}