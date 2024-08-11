

function CategoryList({category,onDelete}) {
    return (
        <tr>
            <td>{category.category_id}</td>
            <td>{category.title}</td>
            <td><button className="btn btn-danger" onClick={()=>onDelete(category.category_id)}>delete</button></td>
    </tr>
    )
}
export default CategoryList;