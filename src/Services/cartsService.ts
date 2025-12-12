import axios from "./axiosConfig";
import Product from "../Interfaces/Product";

const api = "http://localhost:8000/carts";

export function getUserCard(userId?: string) {
  const id = userId || sessionStorage.getItem("userId") || "";
  const url = id ? `${api}?userId=${id}` : api;
  return axios.get(url);
}

export function addToCard(product: Product) {
  const userId = sessionStorage.getItem("userId") || "";
  return getUserCard(userId)
    .then((res: any) => {
      if (res.data && res.data.length) {
        const card = res.data[0];
        const products = card.products || [];
        products.push(product);
        return axios.put(`${api}/${card.id}`, { ...card, products });
      }
      return axios.post(api, { userId, products: [product], active: true });
    })
    .catch((err: any) => {
      // Error adding to card
      throw err;
    });
}
