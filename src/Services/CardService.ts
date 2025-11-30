import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const api: string = process.env.REACT_APP_API + "/users";
export function getCardById(cardId: string) {
  return axios.get(`${api}/cards/${cardId}`);
}

export function getAllCards() {
  return axios.get(`${api}/cards`);
}

export function getCardsByUserId(userId: string) {
  return axios.get(`${api}/${userId}/cards`);
}

export function addCard(userId: string, newCard: any) {
  return axios.post(`${api}/${userId}/cards`, newCard);
}

export function updateCard(cardId: string, updatedCard: any) {
  return axios.put(`${api}/cards/${cardId}`, updatedCard);
}

export function deleteCard(cardId: string) {
  return axios.delete(`${api}/cards/${cardId}`);
}
export function getCardsByCategory(category: string) {
  return axios.get(`${api}/cards?category=${category}`);
}

export function getCardsByTitle(title: string) {
  return axios.get(`${api}/cards?title=${title}`);
}

export function getCardsByBusinessName(businessName: string) {
  return axios.get(`${api}/cards?businessName=${businessName}`);
}

export function getCardsByCity(city: string) {
  return axios.get(`${api}/cards?city=${city}`);
}

export function getCardsByCountry(country: string) {
  return axios.get(`${api}/cards?country=${country}`);
}

export function getCardsByState(state: string) {
  return axios.get(`${api}/cards?state=${state}`);
}

export function getCardsByZipCode(zipCode: string) {
  return axios.get(`${api}/cards?zipCode=${zipCode}`);
}

export function getCardsByStreet(street: string) {
  return axios.get(`${api}/cards?street=${street}`);
}

export function getCardsByHouseNumber(houseNumber: string) {
  return axios.get(`${api}/cards?houseNumber=${houseNumber}`);
}

export function getCardsByUserFavorites(userId: string) {
  return axios.get(`${api}/${userId}/cards/favorites`);
}

export function addCardToUserFavorites(userId: string, cardId: string) {
  return axios.post(`${api}/${userId}/cards/favorites/${cardId}`);
}

export function removeCardFromUserFavorites(userId: string, cardId: string) {
  return axios.delete(`${api}/${userId}/cards/favorites/${cardId}`);
}
export function getRandomCards(count: number) {
  return axios.get(`${api}/cards/random?count=${count}`);
}
export function getTopCards(count: number) {
  return axios.get(`${api}/cards/top?count=${count}`);
}
export function getLatestCards(count: number) {
  return axios.get(`${api}/cards/latest?count=${count}`);
}
export function getMostViewedCards(count: number) {
  return axios.get(`${api}/cards/most-viewed?count=${count}`);
}
export function incrementCardViewCount(cardId: string) {
  return axios.post(`${api}/cards/${cardId}/increment-view`);
}
export function getCardsBySearchTerm(searchTerm: string) {
  return axios.get(`${api}/cards/search?term=${searchTerm}`);
}
export function getCardsByAdvancedFilter(filters: any) {
  return axios.post(`${api}/cards/advanced-filter`, filters);
}
export function getCardsWithPagination(page: number, limit: number) {
  return axios.get(`${api}/cards?page=${page}&limit=${limit}`);
}
export function getCardsCount() {
  return axios.get(`${api}/cards/count`);
}
export function getCardsByUserIdWithPagination(
  userId: string,
  page: number,
  limit: number
) {
  return axios.get(`${api}/${userId}/cards?page=${page}&limit=${limit}`);
}
export function getCardsCountByUserId(userId: string) {
  return axios.get(`${api}/${userId}/cards/count`);
}
