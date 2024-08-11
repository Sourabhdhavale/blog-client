import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MenuBoard from '../compnents/menuboard';
import { getBlogDetails } from '../services/blog';
import { toast } from 'react-toastify';

function ViewBlogDetails() {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await getBlogDetails(blogId);
                const blogData = response.data[0];
                setBlog(blogData);
            } catch (error) {
                toast.error('Failed to fetch blog details.');
            }
        };

        fetchBlogDetails();
    }, [blogId]);

    const onBack = () => {
        navigate('/home');
    };

    return (
        <div className='d-flex flex-column vh-100'>
            <h3 className='heading text-center'>View Blog</h3>

            <div className="d-flex flex-grow-1">
                <div className="menu-board col-2">
                    <MenuBoard />
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
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-2">
                            <label htmlFor="blogContent">Blog Content:</label>
                        </div>
                        <div className="col">
                            <textarea
                                id="blogContent"
                                className="form-control"
                                rows="10"
                                value={blog.content || ''}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <button
                                className="btn btn-success"
                                onClick={onBack}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewBlogDetails;
