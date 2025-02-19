import axios from "axios";

/**
 * Fire Emblem API utility for fetching unit data.
 */
const fireEmblemApi = {
  get: get
};

/**
 * Fetches Fire Emblem unit data from the API.
 *
 * @template T - The expected response data type.
 * @returns {Promise<T | undefined>} A promise resolving to the API response or undefined if an error occurs.
 */
async function get<T>(): Promise<any> {
  try {
    const response: T = await axios.get('https://www.fe-api.com/fe8/units.json');
    return response;
  } catch (error) {
    console.error(error);
  }
}


export default fireEmblemApi;
