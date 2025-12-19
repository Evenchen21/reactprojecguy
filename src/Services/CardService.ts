import axios from "./AxiosConfig";

//Prefer env var (hosted API) but allow localhost for development ONLY.

const api: string =
  process.env.REACT_APP_API_CARDS || "http://localhost:8000/cards"; // Base API URL for cards

// get card by ID //
export function getCardById(cardId: string) {
  return axios.get(`${api}/${cardId}`);
}
// get all cards //
export function getAllCards() {
  return axios.get(api);
}
// get cards by user ID //
export function getCardsByUserId(userId: string) {
  return axios.get(`${api}?userId=${userId}`);
}
// add new card //
export function addCard(newCard: any) {
  return axios.post(api, newCard);
}
// update existing card //
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
  // Send PUT request to update the card
  return axios.put(`${api}/${cardId}`, payload);
}

// delete card //
export function deleteCard(cardId: string) {
  return axios.delete(`${api}/${cardId}`);
}
