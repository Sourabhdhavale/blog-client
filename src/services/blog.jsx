import axios from 'axios'
import config from '../config'

export async function createBlog(title, content, userId, categoryId) {
  const token = sessionStorage.getItem('token')

  const body = {
      title,
      content,
      userId,
      categoryId, 
  }

  const response = await axios.post(`${config.url}/blog/createBlog`, body,{ headers:{token,}})
  console.log("Under axios blog service:"+response)
  return response.data;
} 

export async function editBlog(blogId, title , content) {
  const token = sessionStorage.getItem('token')
  const body = {
    blogId, title , content,
  }
  const response = await axios.post(`${config.url}/blog/login`, body,{headers:{token}})

  return response.data
}

export async function getMyblogs(userId)
{
  const token = sessionStorage.getItem('token')
  const response = await axios.get(`${config.url}/blog/getMyBlogs`,{ params: { userId } ,headers:{token}});
  // console.log("Under get mybblog service");
  return response.data;
}

export async function getBlogDetails(blogId) {
  const token = sessionStorage.getItem('token')
  const response = await axios.get(`${config.url}/blog/getBlogDetails`, { params: { blogId } ,headers:{token}});
  console.log("Get blog details response: "+JSON.stringify(response));

  return response.data;
}

export async function updateBlogDetails(blogId, { title, content }, categoryId) {
  const token = sessionStorage.getItem('token')
  const body = {
    blogId,
    title,
    content,
    categoryId, 
  };
  const response = await axios.put(`${config.url}/blog/editBlog`, body, { headers:{token,}});
  console.log("In update blog response: "+JSON.stringify(response,2))
  return response.data;
}
export async function getAllBlogs() {
  const token = sessionStorage.getItem('token')
  // const id = sessionStorage.getItem('id');
  const response = await axios.get(`${config.url}/blog/getAllBlogs`, {
    headers: {
      token
    }
  });
  return response.data;
}

export async function deleteBlog(blogId) {
  const token = sessionStorage.getItem('token')
  const response = await axios.delete(`${config.url}/blog/deleteBlog`, { params: { blogId } , headers: { token, }});
  console.log("Get delete blogs in service:"+ response);
  return response.data;
}
export async function getSearchedBlog(blogTitle) {
  console.log("BLog title: "+blogTitle);
  const token = sessionStorage.getItem('token')
  const response = await axios.get(`${config.url}/blog/searchBlog`, { params: { blogTitle } , headers:{token,}});
  console.log("Get searched blogs in service:"+JSON.stringify(response.data.data,2));
    return response.data;
}