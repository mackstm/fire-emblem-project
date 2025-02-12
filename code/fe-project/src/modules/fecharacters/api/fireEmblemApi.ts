import axios from "axios";

const fireEmblemApi = {
  get: get
}
async function get<T>(): Promise<any> {
  try {
    const response: T = await axios.get('https://www.fe-api.com/fe8/units.json');
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default fireEmblemApi;
