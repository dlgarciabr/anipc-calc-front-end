import { InputCategory } from "../../types";

export const getCategories = (year : string): InputCategory[] => {
  return [
    {
      id: 'ELETRICA',
      name: 'Consumo de Energia Eletrica',
      inputs: {
        'ELETRICA_FATURADA': {
          id: 'ELETRICA_FATURADA',
          name: 'Faturada',
          description: 'Faturada desc',
          unit: ['kWh'],
          required: true,
        },
        'ELETRICA_RENOVAVEL': {
          id: 'ELETRICA_RENOVAVEL',
          name: 'Renovável (garantia de origem)',
          description: 'Renovável (garantia de origem) desc',
          unit: ['kWh'],
          required: true,
        },
        'ELETRICA_RENOVAVEL_AUTOCONSUMO': {
          id: 'ELETRICA_RENOVAVEL_AUTOCONSUMO',
          name: 'Renovável (autoconsumo)',
          description: 'Renovável (autoconsumo) desc',
          unit: ['kWh'],
          required: true,
        },
        'ELETRICA_MOBILIDADE_ELETRICA': {
          id: 'ELETRICA_MOBILIDADE_ELETRICA',
          name: 'Mobilidade Elétrica',
          description: 'Mobilidade Elétrica desc',
          unit: ['kWh'],
          required: true,
        },
        'ELETRICA_OUTROS': {
          id: 'ELETRICA_OUTROS',
          name: 'Outra',
          description: 'Outra desc',
          unit: ['kWh'],
          required: false,
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

export const getCaeList = (): string[] => [
  '11234',
  '22222',
  '33333'
];

export const getOpenedYears = (): string[] => [
  '2022',
  '2023',
  '2024'
];