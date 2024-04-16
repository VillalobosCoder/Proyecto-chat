import axios from "./axios";

export function getAllUsers (id) {
    return axios.get(`/allUsers/${id}`);
} 