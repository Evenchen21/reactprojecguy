import axios from "axios";
import Product from "../Interfaces/Product";

const api: string = process.env.REACT_APP_API + "/carts";

export function createCart(userId: string) {
  return axios.post(api, {
    userId: userId,
    products: [],
    active: true,
  });
}

export function addToCart(product: Product) {
  const userId = sessionStorage.getItem("userId");
  return getUserCart()
    .then((res: any) => {
      if (res.data.length) {
        const cart = res.data[0];
        const products = cart.products || [];
        products.push(product);
        return axios.put(`${api}/${cart.id}`, {
          ...cart,
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
    .catch((err: any) => console.log(err));
}

export function getUserCart() {
  const userId = sessionStorage.getItem("userId");
  return axios.get(`${api}?userId=${userId}`);
}

export function removeFromCart(productId: string) {
  return getUserCart()
    .then((res: any) => {
      if (res.data.length) {
        const cart = res.data[0];
        const products = cart.products.filter(
          (p: Product) => p.id !== productId
        );
        return axios.put(`${api}/${cart.id}`, {
          ...cart,
          products: products,
        });
      }
    })
    .catch((err: any) => console.log(err));
}

export function clearCart() {
  return getUserCart()
    .then((res: any) => {
      if (res.data.length) {
        const cart = res.data[0];
        return axios.put(`${api}/${cart.id}`, {
          ...cart,
          products: [],
        });
      }
    })
    .catch((err: any) => console.log(err));
}
