import axios from "axios";

const baseUrl = "/api/blogs";

export async function getBlogs() {
  const response = await axios.get(baseUrl);

  return response.data;
}
