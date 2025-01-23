import axios from 'axios';

const API_URL = 'https://run.mocky.io/v3/71448aa4-d73a-4213-a87e-fbd7d1758109';

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};
