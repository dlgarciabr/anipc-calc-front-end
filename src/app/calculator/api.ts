import axios from "axios";
import { SimulationResult, RequestForm, SimulationData, FileDownloadble } from "../../types";
import mockForm from '../../mock/form.json';

const url = 'https://calc.ghg-impact.eu';

const newMockdData = mockForm as RequestForm;

export const getForm = async (id : string, token?: string): Promise<RequestForm> => {
  const endpoint = `${url}/form.php?id=${id}`;

  if(token){
    axios.defaults.headers.common = {
        "token_login": token,
    };
  }

  if(process.env.NEXT_PUBLIC_MOCK_ENABLED === 'true'){
    return Promise.resolve(newMockdData);
  }

  const response = await axios<RequestForm>({
    method: 'get',
    url: endpoint,
  });

  return response.data;
}

export const sendData = async (data: SimulationData): Promise<SimulationResult> => {
  const endpoint = `${url}/calc.php`;

  const response = await axios<SimulationResult>({
    method: 'post',
    url: endpoint,
    data
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