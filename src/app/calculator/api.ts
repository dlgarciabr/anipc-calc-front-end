import axios from "axios";
import { SimulationResult, RequestForm, SimulationData, FileDownloadble } from "../../types";

const mocks = {
	getForm: false,
	calculate: false,
}

const url = 'https://calc.ghg-impact.eu';

const newMockdData = {
  "ID": "ANIPC",
  "Title": "Calculadora de Pegada de Carbono",
  "Desc": "Esta ferramenta de cálculo de emissões de Gases com Efeito de Estufa (GEE) enquadra-se no âmbito do projeto Paper4Neutral - Roteiro para a descarbonização do setor do papel e cartão desenvolvido pela ANIPC - Associação Nacional dos Industriais do Papel e Cartão.",
  "Groups": [
      {
          "ID": 1000,
          "Name": "Dados da Empresa",
          "Desc": "Dados relativos à empresa",
          "Fields": [
              {
                  "ID": 1001,
                  "Name": "Ano de Cálculo",
                  "Desc": "",
                  "Units": [],
                  "Required": true,
                  "MultiField": false,
                  "MultiFieldGroup": "",
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
                  "MultiFieldGroup": "",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^.{1,100}$"
              },
              {
                  "ID": 1003,
                  "Name": "CAE Principal",
                  "Desc": "",
                  "Units": [],
                  "Required": true,
                  "MultiField": false,
                  "MultiFieldGroup": "",
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
                  "MultiFieldGroup": "",
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
                  "Required": true,
                  "MultiField": false,
                  "MultiFieldGroup": "",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^.{1,10}$"
              },
              {
                  "ID": 1006,
                  "Name": "Produção Anual",
                  "Desc": "",
                  "Units": [],
                  "Required": true,
                  "MultiField": false,
                  "MultiFieldGroup": "",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              },
              {
                  "ID": 1007,
                  "Name": "Nome do Responsável",
                  "Desc": "",
                  "Units": [],
                  "Required": true,
                  "MultiField": false,
                  "MultiFieldGroup": "",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^.{1,50}$"
              },
              {
                  "ID": 1008,
                  "Name": "E-mail do Responsável",
                  "Desc": "",
                  "Units": [],
                  "Required": true,
                  "MultiField": false,
                  "MultiFieldGroup": "",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^(?=.{1,64}@)[\\w\\-!#$%&'*+\\/=?^_`{|}~]+(\\.[\\w\\-!#$%&'*+\\/=?^_`{|}~]+)*@(\\w+(-+\\w+)*\\.)*(?=.{2,4}$)[a-zA-Z]+(-+[a-zA-Z]+)*$"
              }
          ]
      },
      {
          "ID": 2000,
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
                  "MultiFieldGroup": "",
                  "Values": [],
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
                  "MultiFieldGroup": "",
                  "Values": [],
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
                  "MultiFieldGroup": "",
                  "Values": [],
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
                  "MultiFieldGroup": "",
                  "Values": [],
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
                  "MultiFieldGroup": "",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              }
          ]
      },
      {
          "ID": 3000,
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
                  "MultiFieldGroup": "",
                  "Values": [],
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
                  "MultiFieldGroup": "",
                  "Values": [],
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
                  "MultiFieldGroup": "",
                  "Values": [],
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
                  "MultiFieldGroup": "",
                  "Values": [],
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
                  "MultiFieldGroup": "",
                  "Values": [],
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
                  "MultiFieldGroup": "",
                  "Values": [],
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
                  "MultiFieldGroup": "",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              }
          ]
      },
      {
          "ID": 4000,
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
                  "MultiFieldGroup": "",
                  "Values": [],
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
                  "MultiFieldGroup": "",
                  "Values": [],
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
                  "MultiFieldGroup": "",
                  "Values": [],
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
                  "MultiFieldGroup": "",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              }
          ]
      },
      {
          "ID": 5000,
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
                  "MultiFieldGroup": "",
                  "Values": [
                      "N/A"
                  ],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              }
          ]
      },
      {
          "ID": 6000,
          "Name": "Consumo de Fluídos Refrigerantes",
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
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
                  "MultiFieldGroup": "HFC (Hydrofluorocarbons)",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              },
              {
                  "ID": 6018,
                  "Name": "PFC-116 (Perfluoroethane)",
                  "Desc": "C2F6",
                  "Units": [
                      {
                          "Unit": "Kg"
                      }
                  ],
                  "Required": false,
                  "MultiField": true,
                  "MultiFieldGroup": "PFC (Fully Fluorinated Species)",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              },
              {
                  "ID": 6019,
                  "Name": "PFC-14 (Perfluoromethane)",
                  "Desc": "CF4",
                  "Units": [
                      {
                          "Unit": "Kg"
                      }
                  ],
                  "Required": false,
                  "MultiField": true,
                  "MultiFieldGroup": "PFC (Fully Fluorinated Species)",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              },
              {
                  "ID": 6020,
                  "Name": "PFC-218 (Perfluoropropane)",
                  "Desc": "C3F8",
                  "Units": [
                      {
                          "Unit": "Kg"
                      }
                  ],
                  "Required": false,
                  "MultiField": true,
                  "MultiFieldGroup": "PFC (Fully Fluorinated Species)",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              },
              {
                  "ID": 6021,
                  "Name": "PFC-31-10 (Perfluorobutane)",
                  "Desc": "C4F10",
                  "Units": [
                      {
                          "Unit": "Kg"
                      }
                  ],
                  "Required": false,
                  "MultiField": true,
                  "MultiFieldGroup": "PFC (Fully Fluorinated Species)",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              },
              {
                  "ID": 6022,
                  "Name": "PFC-318 (Perfluorocyclobutane)",
                  "Desc": "c-C4F8",
                  "Units": [
                      {
                          "Unit": "Kg"
                      }
                  ],
                  "Required": false,
                  "MultiField": true,
                  "MultiFieldGroup": "PFC (Fully Fluorinated Species)",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              },
              {
                  "ID": 6023,
                  "Name": "PFC-41-12 (Perfluoropentane)",
                  "Desc": "C5F12",
                  "Units": [
                      {
                          "Unit": "Kg"
                      }
                  ],
                  "Required": false,
                  "MultiField": true,
                  "MultiFieldGroup": "PFC (Fully Fluorinated Species)",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              },
              {
                  "ID": 6024,
                  "Name": "PFC-51-14 (Perfluorohexane)",
                  "Desc": "C6F14",
                  "Units": [
                      {
                          "Unit": "Kg"
                      }
                  ],
                  "Required": false,
                  "MultiField": true,
                  "MultiFieldGroup": "PFC (Fully Fluorinated Species)",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              },
              {
                  "ID": 6025,
                  "Name": "SF6 (Sulphur hexafluoride)",
                  "Desc": "SF6",
                  "Units": [
                      {
                          "Unit": "Kg"
                      }
                  ],
                  "Required": false,
                  "MultiField": true,
                  "MultiFieldGroup": "SF6 (Sulphur Hexafluoride)",
                  "Values": [],
                  "CustomValue": true,
                  "Regex": "^[1-9][0-9]{0,11}(,[0-9]{1,9})?$"
              }
          ]
      }
  ]
} as RequestForm;

export const getForm = async (id : string, token?: string): Promise<RequestForm> => {
  let endpoint = `${url}/form.php?id=${id}`;

  if(token){
    axios.defaults.headers.common = {
        "token_login": token,
    };
    //endpoint = endpoint.concat(`&token_login=${token}`);//TODO remove after changing the backend to support headers
  }

  if(mocks.getForm){
    return Promise.resolve(newMockdData);
  }

  const response = await axios<RequestForm>({
    method: 'get',
    url: endpoint,
  });

  return response.data;
}

export const sendData = async (data: SimulationData, token?: string): Promise<SimulationResult> => {
  const endpoint = `${url}/calc.php`;

  if(mocks.calculate){
    return Promise.reject();
  }

  const response = await axios<SimulationResult>({
    method: 'post',
    url: endpoint,
    data: {
        ...data,
       "token_login": token
    }
  });

  return response.data;
}

export const downloadExcel = async (data: SimulationData): Promise<FileDownloadble> => {
	const endpoint = `${url}/export.php`;

	const response = await axios<Blob>({
		method: 'post',
    url: endpoint,
		data,
		responseType: 'blob'
	});

  const name = response.headers['content-disposition'].match(/filename="([^"]+)"/)[1];

  return {
    name,
    content: response.data
  };
}

export const downloadPDF = async (data: SimulationData): Promise<FileDownloadble> => {
	const endpoint = `${url}/report.php`;

	const response = await axios<Blob>({
		method: 'post',
    url: endpoint,
		data,
		responseType: 'blob'
	});
  
  const name = response.headers['content-disposition'].match(/filename="([^"]+)"/)[1];

  return {
    name,
    content: response.data
  };
}