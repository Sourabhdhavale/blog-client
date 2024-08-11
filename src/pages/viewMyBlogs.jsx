import { useEffect, useState } from 'react';
import { deleteBlog, getMyblogs } from '../services/blog';
import { toast } from 'react-toastify';
import MenuBoard from '../compnents/menuboard';
import MyBlogItems from '../compnents/myBlogItems'
function ViewMyBlogs() {
    const [myblogs, setMyblogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = sessionStorage.getItem('id');

    useEffect(() => {
        const loadMyBlogs = async () => {
            try {
                const result = await getMyblogs(userId);
                if (result.status === 'success') {
                    setMyblogs(result['data']);
                } else {
                    setError('Failed to load blogs.');
                    toast.error('Failed to load blogs!');
                }
            } catch (error) {
                setError('Failed to load blogs.');
                toast.error('Failed to load blogs.');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            loadMyBlogs();
        } else {
            setLoading(false);
            setError('User not found.');
            toast.error('User not found.');
        }
    }, [userId]);

    const onHandleDelete = async (blogId) => {
        try {
            const response = await deleteBlog(blogId);
            console.log("on delete:" + JSON.stringify(response, 2, null));
            if (response.status === 'success') {
                setMyblogs(myblogs.filter(blog => blog.blog_id !== blogId));
                toast.success("Blog deleted successfully.");
            } else {
                toast.error("Failed to delete blog.");
            }
        } catch (error) {
            toast.error('Failed to delete blog.');
        }
    };

    return (
        <div className="d-flex flex-column vh-100">
            <h3 className="heading p-3">My Blogs</h3>
            <div className="d-flex flex-grow-1">
                <div className="menu-board col-2">
                    <MenuBoard/>
                </div>
                <div className="table-responsive col p-3 overflow-auto">
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : error ? (
                        <div className='alert alert-danger'>{error}</div>
                    ) : myblogs.length === 0 ? (
                        <div className='alert alert-success'>No blog found.</div>
                    ) : (
                            <table className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <MyBlogItems myblogs={myblogs} onDelete={onHandleDelete} />
                                </tbody>
                            </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewMyBlogs;
