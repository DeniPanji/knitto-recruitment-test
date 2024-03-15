import { fetchData } from './getData';

async function main() {
  try {
    const data = await fetchData();
    console.log('Data:', data);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Gagal mengambil data:', error.message);
    } else {
      console.error(error);
    }
  }
}

main();