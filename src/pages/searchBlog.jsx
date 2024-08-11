import { useEffect, useState } from "react";
import MenuBoard from "../compnents/menuboard";
import SearchBlogItems from "../compnents/searchBlogItem";
import { getSearchedBlog } from "../services/blog";
import { toast } from "react-toastify";

function SearchBlog() {
    const [blogTitle, setBlogTitle] = useState('');
    const [searchedBlogs, setSearchedBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBlogByTitle = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getSearchedBlog(blogTitle);
            setSearchedBlogs(response.data);
        } catch (err) {
            toast.error('Failed to fetch blogs.');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const onSearch = () => {
        if (blogTitle.trim() === '') {
            toast.error('Please enter a search term!');
            return;
        }
        fetchBlogByTitle();
    };

    return (
        <div className="d-flex flex-column vh-100">
            <h3 className="heading p-3 text-center">Search Blogs</h3>
            <div className="d-flex flex-grow-1">
                <div className="menu-board col-2">
                    <MenuBoard />
                </div>
                <div className="col p-3">
                    <div className="row mb-3 align-items-center">
                        <div className="col-2">
                            <label htmlFor="searchBlog">Search blog:</label>
                        </div>
                        <div className="col-3">
                            <input
                                id="searchBlog"
                                type="text"
                                className="form-control"
                                value={blogTitle}
                                onChange={(e) => setBlogTitle(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div className="col">
                            <button
                                className="btn btn-primary"
                                onClick={onSearch}
                                disabled={loading}
                            >
                                {loading ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="table-responsive">
                            {error ? (
                                <div className="alert alert-danger">Error fetching search results.</div>
                            ) : searchedBlogs.length === 0 ? (
                                <div className="alert alert-primary">No blog found.</div>
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
                                        <SearchBlogItems searchedBlogs={searchedBlogs} />
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default SearchBlog;
