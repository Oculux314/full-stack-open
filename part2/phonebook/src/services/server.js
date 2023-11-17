import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

function toData(response) {
  return response.data;
}

async function getAll() {
  return axios.get(baseUrl).then(toData);
}

async function create(person) {
  return axios.post(baseUrl, person).then(toData);
}

async function update(id, person) {
  return axios.put(`${baseUrl}/${id}`, person).then(toData);
}

async function remove(id) {
  return axios.delete(`${baseUrl}/${id}`).then(toData);
}

export default { getAll, create, update, remove };
