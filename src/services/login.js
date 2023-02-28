import axios from "axios";

const baseUrl = "/api/login";

export async function login(credentials) {
  const response = await axios.post(baseUrl, credentials);

  return response.data;
}
