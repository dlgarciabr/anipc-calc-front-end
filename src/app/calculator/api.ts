import axios from "axios";
import { RequestForm } from "../../types";

const mockData = [
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
] as InputCategory[];


const newMockdData = {
  "ID": "ANIPC",
  "Groups": [
    {
      "Name": "Dados da Empresa",
      "Desc": "",
      "Fields": [
        {
          "ID": 1001,
          "Name": "Ano de Cálculo",
          "Desc": "",
          "Units": [],
          "Required": true,
          "MultiField": false,
          "Values": [
            "2021",
            "2022",
            "2023"
          ],
          "CustomValue": false,
          "Regex": ""
        },
        {
          "ID": 1002,
          "Name": "Nome da Empresa",
          "Desc": "",
          "Units": [],
          "Required": true,
          "MultiField": false,
          "Values": [],
          "CustomValue": false,
          "Regex": ""
        },
        {
          "ID": 1003,
          "Name": "CAE Principal",
          "Desc": "",
          "Units": [],
          "Required": true,
          "MultiField": false,
          "Values": [
            "17110 - Fabricação de pasta",
            "17120 - Fabricação de papel e de cartão (excepto canelado)",
            "17211 - Fabricação de papel e de cartão canelados (inclui embalagens)",
            "17212 - Fabricação de outras embalagens de papel e de cartão",
            "17220 - Fabricação de artigos de papel para uso doméstico e sanitário",
            "17230 - Fabricação de artigos de papel para papelaria",
            "17240 - Fabricação de papel de parede",
            "17290 - Fabricação de outros artigos de pasta de papel, de papel e de cartão"
          ],
          "CustomValue": true,
          "Regex": "^[0-9]{5}$"
        },
        {
          "ID": 1004,
          "Name": "Fileira",
          "Desc": "",
          "Units": [],
          "Required": true,
          "MultiField": false,
          "Values": [
            "Fabricantes",
            "Transformadores",
            "Retomadores",
            "Outro"
          ],
          "CustomValue": false,
          "Regex": ""
        },
        {
          "ID": 1005,
          "Name": "Unidade de Produção",
          "Desc": "Indicar a unidade de produção aplicável (e.g., ton., m2)",
          "Units": [],
          "Required": false,
          "MultiField": false,
          "Values": [],
          "CustomValue": false,
          "Regex": ""
        },
        {
          "ID": 1006,
          "Name": "Produção Anual",
          "Desc": "",
          "Units": [],
          "Required": true,
          "MultiField": false,
          "Values": [],
          "CustomValue": true,
          "Regex": ""
        },
        {
          "ID": 1007,
          "Name": "Nome do Responsável",
          "Desc": "",
          "Units": [],
          "Required": false,
          "MultiField": false,
          "Values": [],
          "CustomValue": false,
          "Regex": ""
        },
        {
          "ID": 1008,
          "Name": "E-mail do Responsável",
          "Desc": "",
          "Units": [],
          "Required": false,
          "MultiField": false,
          "Values": [],
          "CustomValue": false,
          "Regex": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
        }
      ]
    },
    {
      "Name": "Consumos de Energia Elétrica",
      "Desc": "",
      "Fields": [
        {
          "ID": 2001,
          "Name": "Faturada",
          "Desc": "",
          "Units": [
            {
              "Unit": "KWh",
              "FC": ""
            },
            {
              "Unit": "Joules",
              "FC": ""
            }
          ],
          "Required": true,
          "MultiField": false,
          "Values": [],
          "CustomValue": false,
          "Regex": "^[1-9][0-9]*(,[0-9]+)?$"
        }
      ]
    },
    {
      "Name": "Consumo de fluídos refrigerantes (kg)",
      "Desc": "",
      "Fields": [
        {
          "ID": 3001,
          "Name": "HFC-125",
          "Desc": "",
          "Units": [],
          "Required": false,
          "MultiField": true,
          "Values": [],
          "CustomValue": false,
          "Regex": "^[1-9][0-9]*(,[0-9]+)?$"
        },
        {
          "ID": 3002,
          "Name": "HFC-134",
          "Desc": "",
          "Units": [],
          "Required": false,
          "MultiField": true,
          "Values": [],
          "CustomValue": false,
          "Regex": "^[1-9][0-9]*(,[0-9]+)?$"
        },
        {
          "ID": 3003,
          "Name": "HFC-143",
          "Desc": "",
          "Units": [],
          "Required": false,
          "MultiField": true,
          "Values": [],
          "CustomValue": false,
          "Regex": "^[1-9][0-9]*(,[0-9]+)?$"
        }
      ]
    }
  ]
};

// export const getCategories = async (year : string): Promise<InputCategory[]> => {
//   const mock = true;

//   const url = "https://calc.ghg-impact.eu/form.php";

//   //TODO call api

//   if(mock){
//     return Promise.resolve(mockData);
//   }

//   const response = await axios<RequestForm>({
//     method: 'get',
//     url,
//   });

//   console.log(response.data);

//   return [] as InputCategory[];
// }

export const getForm = async (year : string): Promise<RequestForm> => {
  const mock = true;

  const url = "https://calc.ghg-impact.eu/form.php";

  //TODO call api

  if(mock){
    return Promise.resolve(newMockdData);
  }

  const response = await axios<RequestForm>({
    method: 'get',
    url,
  });

  return response.data;
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