import { Link } from "react-router-dom";
import Action from "./action";

function MyBlogItems({ myblogs,onDelete }) {
    return (
        <>
        {
            myblogs.map((blog) => (
                <tr key={blog.blog_id}>
                    <td style={{width:"10%"}}>{blog.blog_id}</td>
                    <td style={{width:"30%"}}><Link to={`/viewBlogDetails/${blog.blog_id}`}>{blog.blog_title}</Link></td>
                    <td style={{width:"20%"}}>{blog.category_title}</td>
                    <td style={{width:"10%"}}><Action blogId={blog.blog_id} onDelete={onDelete} /></td>
                </tr>
            ))
            }
        </>
    )
}

export default MyBlogItems;