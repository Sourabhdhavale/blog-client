import { useEffect, useState } from 'react';
import { createBlog } from "../services/blog";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategories } from '../services/category';
import MenuBoard from '../compnents/menuboard';

function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Failed to fetch categories.');
            }
        };

        fetchCategories();

        const storedUserId = sessionStorage.getItem('id');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error('User not found in session ID!');
        }
    }, []);

    const onCreate = async () => {
        if (title.trim() === '' || content.trim() === '' || isNaN(categoryId) || categoryId === '') {
            toast.warning('Please fill out all fields.');
            return;
        }

        setLoading(true);

        try {
            const result = await createBlog(title, content, userId, categoryId);
            if (result.status === 'success') {
                toast.success('Blog created.');
                navigate('/home');
            } else {
                toast.error('Failed to create blog.');
            }
        } catch (error) {
            console.error("Error creating blog:", error);
            toast.error("An error occurred while creating the blog.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/viewMyBlogs');
    };

    return (
        <div className="d-flex flex-column vh-100">
            <h3 className="heading p-3">Create Blog</h3>
            <div className="d-flex flex-grow-1">
                <div className="menu-board col-2">
                    <MenuBoard />
                </div>
                <div className="col p-3">
                    <div className="row mb-3 align-items-center">
                        <div className="col-2">
                            <label htmlFor="title">Title:</label>
                        </div>
                        <div className="col">
                            <input
                                id="title"
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={5000}
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-2">
                            <label htmlFor="content">Content:</label>
                        </div>
                        <div className="col">
                            <textarea
                                id="content"
                                className="form-control"
                                rows="10"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                maxLength={1000000}
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
                                    {categories.map(category => (
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
                    <div className="row">
                        <div className="col-2">
                            <button
                                className="btn btn-success"
                                onClick={onCreate}
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                        <div className="col-2">
                            <button
                                className="btn btn-danger"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default CreateBlog;
