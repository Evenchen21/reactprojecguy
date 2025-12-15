import axios from "./axiosConfig";

//Prefer env var (hosted API) but allow localhost for development ONLY.

const api: string =
  process.env.REACT_APP_API_CARDS || "http://localhost:8000/cards";

export function getCardById(cardId: string) {
  return axios.get(`${api}/${cardId}`);
}

export function getAllCards() {
  return axios.get(api);
}

export function getCardsByUserId(userId: string) {
  return axios.get(`${api}?userId=${userId}`);
}

export function addCard(newCard: any) {
  return axios.post(api, newCard);
}

export function updateCard(cardId: string, updatedCard: any) {
  const payload = {
    title: updatedCard.title,
    subtitle: updatedCard.subtitle,
    description: updatedCard.description,
    phone: updatedCard.phone,
    email: updatedCard.email,
    web: updatedCard.web,
    image: {
      url: updatedCard.image?.url,
      alt: updatedCard.image?.alt,
    },
    address: {
      state: updatedCard.address?.state,
      country: updatedCard.address?.country,
      city: updatedCard.address?.city,
      street: updatedCard.address?.street,
      houseNumber: updatedCard.address?.houseNumber,
      zip: updatedCard.address?.zip,
    },
    bizNumber: updatedCard.bizNumber,
  };

  return axios.put(`${api}/${cardId}`, payload);
}

export function deleteCard(cardId: string) {
  return axios.delete(`${api}/${cardId}`);
}
