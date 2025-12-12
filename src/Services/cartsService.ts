import axios from "./axiosConfig";
import Product from "../Interfaces/Product";

const api: string = process.env.REACT_APP_API_CARTS || "";

export function createCard(userId: string) {
  return axios.post(api, {
    userId: userId,
    products: [],
    active: true,
  });
}

export function addToCard(product: Product) {
  const userId = sessionStorage.getItem("userId");
  return getUserCard()
    .then((res: any) => {
      if (res.data.length) {
        const card = res.data[0];
        const products = card.products || [];
        products.push(product);
        return axios.put(`${api}/${card.id}`, {
          ...card,
          products: products,
        });
      } else {
        return axios.post(api, {
          userId: userId,
          products: [product],
          active: true,
        });
      }
    })
    .catch((err: any) => {
      // Error adding to card
    });
}

export function getUserCard() {
  const userId = sessionStorage.getItem("userId");
  return axios.get(`${api}?userId=${userId}`);
}

export function removeFromCard(productId: string) {
  return getUserCard()
    .then((res: any) => {
      if (res.data.length) {
        const card = res.data[0];
        const products = card.products.filter(
          (p: Product) => p.id !== productId
        );
        return axios.put(`${api}/${card.id}`, {
          ...card,
          products: products,
        });
      }
    })
    .catch((err: any) => {
      // Error removing from card
    });
}

export function clearCard() {
  return getUserCard()
    .then((res: any) => {
      if (res.data.length) {
        const card = res.data[0];
        return axios.put(`${api}/${card.id}`, {
          ...card,
          products: [],
        });
      }
    })
    .catch((err: any) => {
      // Error clearing card
    });
}
