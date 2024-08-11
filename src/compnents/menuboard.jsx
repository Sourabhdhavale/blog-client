import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function MenuBoard() {
    const navigate = useNavigate();
    const onLogout = () => {
        sessionStorage.removeItem('token');
        toast.success('Successfully logged out.')
        navigate('/login');
    }

    return (
        <div className="p-4 bg-light rounded shadow-sm">
            <h4 className="mb-4 text-dark">Menu</h4>
            <nav className="nav flex-column">
                <Link className="nav-link active" to="/viewMyBlogs">My Blogs</Link>
                <Link className="nav-link" to="/home">All Blogs</Link>
                <Link className="nav-link" to="/addCategory">Add Category</Link>
                <Link className="nav-link" to="/showCategories">Show Categories</Link>
                <Link className="nav-link" to="/createblog">Add Blog</Link>
                <Link className="nav-link" to="/searchBlog">Search Blogs</Link>
            </nav>
            <button className="btn btn-danger mt-4 w-100" onClick={onLogout}>Logout</button>
        </div>
    )
}

export default MenuBoard;
