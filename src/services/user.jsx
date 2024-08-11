import axios from 'axios'
import config from '../config'

export async function register(name, email, password, phone) {
  const body = {
    name,
    email,
    password,
    phone,
  }

  const response = await axios.post(`${config.url}/user/register`, body)
  return response.data;
} 

export async function login(email, password) {
  const body = {
    email,
    password,
  }
  const response = await axios.post(`${config.url}/user/login`, body)

  return response.data
}


