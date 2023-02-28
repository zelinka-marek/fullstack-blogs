import axios from "axios";
import { getUserToken } from "../utils/auth";

const baseUrl = "/api/blogs";

export async function getBlogs() {
  const response = await axios.get(baseUrl);

  return response.data;
}

export async function createBlog(data) {
  const token = getUserToken();
  const response = await axios.post(baseUrl, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}
