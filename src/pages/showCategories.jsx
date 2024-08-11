import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "../services/category";
import { toast } from "react-toastify";
import MenuBoard from "../compnents/menuboard";
import CategoryList from "../compnents/categoryList"
function ShowCategories() {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await getCategories();
                if (response.status === 'success') {
                    setCategory(response.data);
                } else {
                    toast.error("Failed to fetch categories.");
                }
            } catch (error) {
                toast.error('Something went wrong!');
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    const onHandleDelete = async (categoryId) => {
        const response = await deleteCategory(categoryId);
        if (response.status === 'success') {
            setCategory(category.filter(c => c.category_id !== categoryId));
            toast.success("Category deleted successfully.");
        } else {
            toast.error("Category not deleted.");
        }
    };

    return (
        <div className="d-flex flex-column vh-100">
            <h2 className="heading p-3">Categories</h2>
            <div className="d-flex flex-grow-1">
                <div className="menu-board col-2">
                    <MenuBoard />
          </div>
          <div className="col-1"></div>
                <div className="col p-3 overflow-auto">
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : error ? (
                        <div className="alert alert-danger">Error loading categories.</div>
                    ) : category.length === 0 ? (
                        <div className="alert alert-success">No category found.</div>
                    ) : (
                        <table className="table table-bordered table-striped table-hover" style={{ fontSize: "18px" }}>
                            <thead>
                                <tr>
                                <th style={{ width: '10%' }}>ID</th>
                                    <th style={{ width: '70%' }}>Title</th>
                                    <th style={{ width: '20%' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category.map((c) => (
                                    <CategoryList key={c.category_id} category={c} onDelete={onHandleDelete} />
                                ))}
                            </tbody>
                        </table>
                    )}
          </div>
          <div className="col-1"></div>

            </div>
        </div>
    );
}

export default ShowCategories;
