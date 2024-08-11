import { useState } from "react";
import { addCategory } from "../services/category";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MenuBoard from "../compnents/menuboard";

function AddCategory() {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onAddCategory = async () => {
        if (title.trim() === '') {
            toast.warning('Please enter a category title.');
            return;
        }
        setLoading(true);
        try {
            const response = await addCategory(title);
            console.log("add category:" + JSON.stringify(response, 2));
            if (response.status === 'success') {
                toast.success("Category added.");
                navigate('/showCategories');
            } else {
                toast.error("Category not added!");
            }
        } catch (error) {
            toast.error("An error occurred while adding the category.");
        } finally {
            setLoading(false);
        }
    };

    const onCancelCategory = () => {
        navigate('/showCategories');
    };

    return (
        <div className="d-flex flex-column vh-100">
            <h2 className="heading p-3">Add Category</h2>
            <div className="d-flex flex-grow-1">
                <div className="menu-board col-2">
                    <MenuBoard />
                </div>
                <div className="col p-3 overflow-auto">
                    <div className="row mb-4 align-items-center">
                        <div className="col-1">
                            <label htmlFor="title" className="form-label">Title:</label>
                        </div>
                        <div className="col-8">
                        <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <button
                                className="btn btn-primary mt-3  me-2"
                                onClick={onAddCategory}
                            >
                                {loading ? 'Adding...' : 'Add'}
                            </button>
                        </div>
                        <div className="col-2">
                        <button
                                className="btn btn-danger mt-3"
                                onClick={onCancelCategory}
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

export default AddCategory;
