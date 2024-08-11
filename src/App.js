import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import ViewBlogs from './pages/viewMyBlogs';
import EditBlog from './pages/editblog';
import CreateBlog from './pages/createblog';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCategory from './pages/addCategory';
import ShowCategories from './pages/showCategories';
import ViewBlogDetails from './pages/viewBlogDetails';
import SearchBlog from './pages/searchBlog';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/viewMyBlogs' element={<ViewBlogs />} />
        <Route path='/editblog/:blogId' element={<EditBlog />} />
        <Route path='/createblog' element={<CreateBlog />} />
        <Route path='/addCategory' element={<AddCategory />} />
        <Route path='/showCategories' element={<ShowCategories />} />
        <Route path='/viewBlogDetails/:blogId' element={<ViewBlogDetails />} />
        <Route path='/searchBlog' element={<SearchBlog/>}/>
      </Routes>
      
      <ToastContainer />
    </div>
  );
}

export default App;
