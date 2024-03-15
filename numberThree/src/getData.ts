import axios, { AxiosError } from 'axios';

export async function fetchData() {
  const apiUrl = 'https://api.example.com/data'; //untuk contoh link url dapat diganti ke path API lainnya, disini saya hanya membuat contohnya saja 
    try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Kode status:', axiosError.response.status);
        console.error('Data:', axiosError.response.data);
      } else if (axiosError.request) {
        console.error('Tidak ada respons:', axiosError.request);
      } else {
        console.error('Kesalahan lainnya:', axiosError.message);
      }
    } else {
      console.error('Kesalahan lainnya:', error);
    }
    throw error;
  }
}