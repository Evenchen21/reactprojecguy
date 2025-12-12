import axios from "axios";

// Always point cards to the local JSON server
const api: string = "http://localhost:8000/cards";

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
  return axios.put(`${api}/${cardId}`, updatedCard);
}

export function deleteCard(cardId: string) {
  return axios.delete(`${api}/${cardId}`);
}
export function getCardsByCategory(category: string) {
  return axios.get(`${api}?category=${category}`);
}

export function getCardsByTitle(title: string) {
  return axios.get(`${api}?title=${title}`);
}

export function getCardsByBusinessName(businessName: string) {
  return axios.get(`${api}?businessName=${businessName}`);
}

export function getCardsByCity(city: string) {
  return axios.get(`${api}?city=${city}`);
}

export function getCardsByCountry(country: string) {
  return axios.get(`${api}?country=${country}`);
}

export function getCardsByState(state: string) {
  return axios.get(`${api}?state=${state}`);
}

export function getCardsByZipCode(zipCode: string) {
  return axios.get(`${api}?zipCode=${zipCode}`);
}

export function getCardsByStreet(street: string) {
  return axios.get(`${api}?street=${street}`);
}

export function getCardsByHouseNumber(houseNumber: string) {
  return axios.get(`${api}?houseNumber=${houseNumber}`);
}

export function getCardsByUserFavorites(userId: string) {
  return axios.get(`${api}?userId=${userId}&favorites=true`);
}

export function addCardToUserFavorites(userId: string, cardId: string) {
  return axios.post(`${api}/${cardId}/like`, { userId });
}

export function removeCardFromUserFavorites(userId: string, cardId: string) {
  return axios.delete(`${api}/${cardId}/like/${userId}`);
}
export function getRandomCards(count: number) {
  return axios.get(`${api}?_limit=${count}&_sort=random`);
}
export function getTopCards(count: number) {
  return axios.get(`${api}?_limit=${count}&_sort=likes`);
}
export function getLatestCards(count: number) {
  return axios.get(`${api}?_limit=${count}&_sort=createdAt&_order=desc`);
}
export function getMostViewedCards(count: number) {
  return axios.get(`${api}?_limit=${count}&_sort=views&_order=desc`);
}
export function incrementCardViewCount(cardId: string) {
  return axios.post(`${api}/${cardId}/increment-view`);
}
export function getCardsBySearchTerm(searchTerm: string) {
  return axios.get(`${api}?q=${searchTerm}`);
}
export function getCardsByAdvancedFilter(filters: any) {
  return axios.get(api, { params: filters });
}
export function getCardsWithPagination(page: number, limit: number) {
  return axios.get(`${api}?_page=${page}&_limit=${limit}`);
}
export function getCardsCount() {
  return axios.get(`${api}`).then((res) => res.data.length);
}
export function getCardsByUserIdWithPagination(
  userId: string,
  page: number,
  limit: number
) {
  return axios.get(`${api}?userId=${userId}&_page=${page}&_limit=${limit}`);
}
export function getCardsCountByUserId(userId: string) {
  return axios.get(`${api}?userId=${userId}`).then((res) => res.data.length);
}
