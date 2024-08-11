import { Link } from "react-router-dom";
import Action from "./action";

function AllBlogItems({ allBlogs }) {
    return (
        <>
            {
            allBlogs.map((blog) => (
                <tr key={blog.blog_id}>
                    <td>{blog.blog_id}</td>
                    <td><Link to={`/viewBlogDetails/${blog.blog_id}`}>{blog.blog_title}</Link></td>
                    <td>{blog.category_title}</td>
                </tr>
            ))
        }
        </>
    )
}

export default AllBlogItems;