import { useEffect, useState } from 'react';
import { getAllBlogs } from '../services/blog';
import { toast } from 'react-toastify';
import MenuBoard from '../compnents/menuboard';
import AllBlogItems from '../compnents/allBlogItems'
function Home() {
    const [allBlogs, setAllBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchAllBlogs = async () => {
            try {
                const response = await getAllBlogs();
                setAllBlogs(response.data);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError('Failed to fetch blogs.');
                toast.error('Failed to fetch blogs.');
            } finally {
                setLoading(false);
            }
        };
        fetchAllBlogs();
    }, []);

    return (
        <div className="d-flex flex-column vh-100">
            <h3 className="heading p-3">Home</h3>
            <div className="d-flex flex-grow-1">
                <div className="menu-board col-2">
                    <MenuBoard/>
                </div>
                <div className="table-responsive col p-3 overflow-auto">
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : error ? (
                        <div className='alert alert-danger'>{error}</div>
                    ) : allBlogs.length === 0 ? (
                        <div className='alert alert-success'>No blog data found.</div>
                    ) : (
                            <table className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AllBlogItems allBlogs={allBlogs} />
                                </tbody>
                            </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
