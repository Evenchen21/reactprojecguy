import axios from "axios";
import User from "../Interfaces/User";

const api: string = process.env.REACT_APP_API_USERS || "";

// login
export function checkUser(credentials: { email: string; password: string }) {
  return axios.get(
    `${api}?email=${credentials.email}&&password=${credentials.password}`
  );
}

// register
export function addUser(newUser: User) {
  return axios.post(api, newUser);
}

// profile
export function getUserById() {
  // get userId from sessionStorage
  const userId = sessionStorage.getItem("userId");

  // get request for user full details
  return axios.get(`${api}/${userId}`);
}
export function updateUser(userId: string, updatedUser: User) {
  return axios.put(`${api}/${userId}`, updatedUser);
}

export function deleteUser(userId: string) {
  return axios.delete(`${api}/${userId}`);
}

// get all users
export function getAllUsers() {
  return axios.get(api);
}
