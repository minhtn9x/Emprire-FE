import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
const token = accessToken

//apply base url for axios
//const API_URL = ""
const API_URL = "https://empire-api.azurewebsites.net/api/v1"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function post2(url, data, config = {}) {
  return axiosApi
    .post(url, [...data], { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}

export async function del2(url, data = [], config = {}) {
  const axiosConfig = { ...config, data: data }
  return await axiosApi.delete(url, axiosConfig).then(response => response.data)
}

export async function postFile(url, file, config = {}) {
  // Create a FormData object to send the file
  const formData = new FormData()
  formData.append("file", file) // Assuming 'file' is the key for the file in the request

  // Make the POST request with the FormData containing the file
  return axiosApi
    .post(url, formData, { ...config })
    .then(response => response.data)
}
