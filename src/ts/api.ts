import axios from "axios";
import { Product } from "./@types/Product";

export const api = axios.create({ baseURL: "http://localhost:5000/products" });
export const getProducts = async (params = "") => {
  const { data } = await api.get<Product[]>(params);
  return data;
};
