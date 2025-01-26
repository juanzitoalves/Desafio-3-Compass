import axios from 'axios';

const API_URL = 'https://run.mocky.io/v3/7bdcc711-3d1a-443f-b53d-731bd9d0b038';

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};