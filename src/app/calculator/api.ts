import axios from "axios";
import { InputGroup, RequestForm } from "../../types";

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
          "Units": [
            
          ],
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
          "Units": [
            
          ],
          "Required": true,
          "MultiField": false,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^.{1,100}$"
        },
        {
          "ID": 1003,
          "Name": "CAE Principal",
          "Desc": "",
          "Units": [
            
          ],
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
          "Units": [
            
          ],
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
          "Units": [
            
          ],
          "Required": true,
          "MultiField": false,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^.{1,10}$"
        },
        {
          "ID": 1006,
          "Name": "Produção Anual",
          "Desc": "",
          "Units": [
            
          ],
          "Required": true,
          "MultiField": false,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 1007,
          "Name": "Nome do Responsável",
          "Desc": "",
          "Units": [
            
          ],
          "Required": true,
          "MultiField": false,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^.{1,50}$"
        },
        {
          "ID": 1008,
          "Name": "E-mail do Responsável",
          "Desc": "",
          "Units": [
            
          ],
          "Required": true,
          "MultiField": false,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^(?=.{1,64}@)[\\w-!#$%&'*+/=?^_`{|}~]+(\\.[\\w-!#$%&'*+/=?^_`{|}~]+)*@(\\w+(-+\\w+)*\\.)*(?=.{2,4}$)[a-zA-Z]+(-+[a-zA-Z]+)*$"
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
              "Unit": "KWh"
            }
          ],
          "Required": true,
          "MultiField": false,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 2002,
          "Name": "Renovável (Garantias de Origem)",
          "Desc": "Se aplicável, deverá ser indicada a quantidade de \"eletricidade verde\" deverá basear-se em evidências da respetiva contratação junto do(s) comercializador(es) de energia (incluindo mobilidade elétrica) e/ou de Certificados de Garantia de Origem.",
          "Units": [
            {
              "Unit": "KWh"
            }
          ],
          "Required": false,
          "MultiField": false,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 2003,
          "Name": "Renovável (autoconsumo)",
          "Desc": "Se aplicável, deverá ser indicada a quantidade de eletricidade renovável autoconsumida, excluindo a energia excedente.",
          "Units": [
            {
              "Unit": "KWh"
            }
          ],
          "Required": false,
          "MultiField": false,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 2004,
          "Name": "Mobilidade Elétrica",
          "Desc": "Se aplicável, deverá ser indicada a quantidade de eletricidade faturada decorrente dos carregamentos efetuados em postos de carregamento fora da empresa.",
          "Units": [
            {
              "Unit": "KWh"
            }
          ],
          "Required": false,
          "MultiField": false,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 2005,
          "Name": "Outra",
          "Desc": "",
          "Units": [
            {
              "Unit": "KWh"
            }
          ],
          "Required": false,
          "MultiField": false,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        }
      ]
    },
    {
      "Name": "Combustão Estacionária",
      "Desc": "",
      "Fields": [
        {
          "ID": 3001,
          "Name": "Biomassa (certificada)",
          "Desc": "",
          "Units": [
            {
              "Unit": "Ton"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 3002,
          "Name": "Biomassa (não certificada)",
          "Desc": "",
          "Units": [
            {
              "Unit": "Ton"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 3003,
          "Name": "Gás natural",
          "Desc": "",
          "Units": [
            {
              "Unit": "KWh"
            },
            {
              "Unit": "m3"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 3004,
          "Name": "Gás propano",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 3005,
          "Name": "Fuelóleo",
          "Desc": "",
          "Units": [
            {
              "Unit": "Ton"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 3006,
          "Name": "Gasóleo (aquecimento)",
          "Desc": "",
          "Units": [
            {
              "Unit": "litros"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 3007,
          "Name": "Outro (Renovável)",
          "Desc": "",
          "Units": [
            {
              "Unit": "KWh"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        }
      ]
    },
    {
      "Name": "Combustão Móvel (Frota)",
      "Desc": "",
      "Fields": [
        {
          "ID": 4001,
          "Name": "Gasóleo",
          "Desc": "",
          "Units": [
            {
              "Unit": "litros"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 4002,
          "Name": "Gasolina",
          "Desc": "",
          "Units": [
            {
              "Unit": "litros"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 4003,
          "Name": "Gás Propano",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 4004,
          "Name": "Outro (Renovável)",
          "Desc": "",
          "Units": [
            {
              "Unit": "KWh"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        }
      ]
    },
    {
      "Name": "Consumo de Solventes",
      "Desc": "",
      "Fields": [
        {
          "ID": 5001,
          "Name": "Solventes",
          "Desc": "Deverá ser indicado o consumo de solventes calculado de acordo com a metodologia disposta na legislação e regulamentação aplicáveis. Caso não existam consumos de solventes para o ano em análise, deverá ser selecionada a opção N/A.",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": true,
          "MultiField": false,
          "Values": [
            "N/A"
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        }
      ]
    },
    {
      "Name": "Consumo de Fluídos Refrigerantes - HFC (Hydrofluorocarbons)",
      "Desc": "",
      "Fields": [
        {
          "ID": 6001,
          "Name": "HFC-125",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6002,
          "Name": "HFC-134",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6003,
          "Name": "HFC-143",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6004,
          "Name": "HFC-143a",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6005,
          "Name": "HFC-152a",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6006,
          "Name": "HFC-227ea",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6007,
          "Name": "HFC-23",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6008,
          "Name": "HFC-236fa",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6009,
          "Name": "HFC-245fa",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6010,
          "Name": "HFC-41",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6011,
          "Name": "HFC-43-I0mee",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6012,
          "Name": "R134a",
          "Desc": "Designado como HFC-134a",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6013,
          "Name": "R32",
          "Desc": "Designado como HFC-32",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6014,
          "Name": "R404A",
          "Desc": "Blend 52:44:4 [HFC-143a, HFC-125, HFC-134a]",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6015,
          "Name": "R407C",
          "Desc": "Blend 23:25:52 [HFC-32, HFC-125, HFC-134a]",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6016,
          "Name": "R410A",
          "Desc": "Blend 50:50 [HFC-32, HFC-125]",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 6017,
          "Name": "R427A",
          "Desc": "Blend 15:25:10:50 [HFC-32, HFC-125, HFC-134a, HFC-143]",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        }
      ]
    },
    {
      "Name": "Consumo de Fluídos Refrigerantes - PFC (Fully Fluorinated Species)",
      "Desc": "",
      "Fields": [
        {
          "ID": 7001,
          "Name": "PFC-116 (Perfluoroethane)",
          "Desc": "C2F6",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 7002,
          "Name": "PFC-14 (Perfluoromethane)",
          "Desc": "CF4",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 7003,
          "Name": "PFC-218 (Perfluoropropane)",
          "Desc": "C3F8",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 7004,
          "Name": "PFC-31-10 (Perfluorobutane)",
          "Desc": "C4F10",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 7005,
          "Name": "PFC-318 (Perfluorocyclobutane)",
          "Desc": "c-C4F8",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 7006,
          "Name": "PFC-41-12 (Perfluoropentane)",
          "Desc": "C5F12",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        },
        {
          "ID": 7007,
          "Name": "PFC-51-14 (Perfluorohexane)",
          "Desc": "C6F14",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        }
      ]
    },
    {
      "Name": "Consumo de Fluídos Refrigerantes - SF6 (Sulphur Hexafluoride)",
      "Desc": "",
      "Fields": [
        {
          "ID": 8001,
          "Name": "SF6 (Sulphur hexafluoride)",
          "Desc": "",
          "Units": [
            {
              "Unit": "Kg"
            }
          ],
          "Required": false,
          "MultiField": true,
          "Values": [
            
          ],
          "CustomValue": true,
          "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
        }
      ]
    }
  ]
} as RequestForm;

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

export const getForm = async (id : string): Promise<RequestForm> => {
  const mock = true;

  const url = `https://calc.ghg-impact.eu/form.php?id=${id}`;

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

export const sendData = (data: InputGroup[]): void => {
  console.log(data)
}