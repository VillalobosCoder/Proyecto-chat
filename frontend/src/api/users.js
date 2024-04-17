import axios from "./axios";

export function getAllUsers (id) {
    return axios.get(`/allUsers/${id}`);
} 

export function setPicture (id, data) {
    return axios.post(`/setPicture/${id}`, data);
}