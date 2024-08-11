import axios from 'axios'
import config from '../config'

export async function getCategories() {
  const token = sessionStorage.getItem('token');
  const response = await axios.get(`${config.url}/category/showCategories`,{headers:{token}});
  console.log("from service"+response);
  return response.data;
}

export async function addCategory(title) {
  const token = sessionStorage.getItem('token');
console.log("oken: "+token);
  const body = {
    title
  }
  const response = await axios.post(`${config.url}/category/addCategory`, body,{headers:{token}});
  console.log("add category service respnse: " + JSON.stringify(response));
  return response.data;
}

export async function deleteCategory(categoryId) {
  const token = sessionStorage.getItem('token');

  console.log("CategoryId: "+categoryId);
  const response = await axios.delete(`${config.url}/category/deleteCategory`,{params:{categoryId},headers:{token}});
  console.log("axios respnse: " + JSON.stringify(response.data));
  return response.data;
}