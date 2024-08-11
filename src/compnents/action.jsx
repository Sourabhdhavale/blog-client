import { Link, useNavigate } from "react-router-dom";
function Action({blogId,onDelete}) {
    const navigate = useNavigate();
    
    return (
        <div>
            <Link to={`/editblog/${blogId}`} className="btn btn-primary me-2">Edit</Link>
            <button className="btn btn-danger" onClick={()=> onDelete(blogId)}>Delete</button>
        </div>
    )
}

export default Action;