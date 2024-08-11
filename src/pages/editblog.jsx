import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogDetails, updateBlogDetails } from '../services/blog';
import { toast } from 'react-toastify';
import { getCategories } from '../services/category';
import MenuBoard from '../compnents/menuboard';

function EditBlog() {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await getBlogDetails(blogId);
                const blogData = response.data[0];
                setBlog(blogData);
                setCategoryId(blogData.category_id);
            } catch (error) {
                console.log('Error fetching Blog details:', error);
                toast.error('Failed to fetch blog details.');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.log('Error fetching categories:', error);
                toast.error('Failed to fetch categories.');
            }
        };

        fetchCategories();
        fetchBlogDetails();
    }, [blogId]);

    const onUpdate = async () => {
        setLoading(true);
        try {
            const updateResponse = await updateBlogDetails(blogId, blog, categoryId);
            if (updateResponse.data.affectedRows > 0) {
                toast.success('Blog updated.');
                navigate('/viewMyBlogs');
            } else {
                toast.error('Blog not updated!');
            }
        } catch (error) {
            toast.error('Error updating blog.');
        } finally {
            setLoading(false);
        }
    };

    const onCancel = () => {
        navigate('/viewMyBlogs');
    };

    return (
        <div className='d-flex flex-column vh-100'>
            <h3 className='heading text-center'>Edit Blog</h3>
            <div className="d-flex flex-grow-1">
                <div className="menu-board col-2">
                    <MenuBoard/>
                </div>
                <div className="col p-3">
                    <div className="row mb-3 align-items-center">
                        <div className="col-2">
                            <label htmlFor="blogId">Blog ID:</label>
                        </div>
                        <div className="col">
                            <input
                                id="blogId"
                                type="text"
                                className="form-control"
                                value={blogId || ''}
                                readOnly
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-2">
                            <label htmlFor="blogTitle">Blog Title:</label>
                        </div>
                        <div className="col">
                            <input
                                id="blogTitle"
                                type="text"
                                className="form-control"
                                value={blog.title || ''}
                                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-2">
                            <label htmlFor="category">Category:</label>
                        </div>
                        <div className="col">
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    disabled={loading}
                                >
                                    {categoryId ? categories.find(cat => cat.category_id === categoryId)?.title : 'Select Category'}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {categories.map((category) => (
                                        <li key={category.category_id}>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => setCategoryId(category.category_id)}
                                                disabled={loading}
                                            >
                                                {category.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-2">
                            <label htmlFor="blogContent">Content:</label>
                        </div>
                        <div className="col">
                            <textarea
                                id="blogContent"
                                className="form-control"
                                rows="10"
                                value={blog.content || ''}
                                onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <button
                                className="btn btn-success"
                                onClick={onUpdate}
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                        <div className="col-2">
                            <button
                                className="btn btn-danger"
                                onClick={onCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditBlog;
