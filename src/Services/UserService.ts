import axios from "./axiosConfig";
import User from "../Interfaces/User";

const api: string =
  process.env.REACT_APP_API_USERS || "http://localhost:8000/users";

// login - using POST method as per API documentation
export function checkUser(credentials: { email: string; password: string }) {
  return axios.post(`${api}/login`, credentials);
}

// register
export function addUser(newUser: User) {
  return axios.post(`${api}/register`, newUser);
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
