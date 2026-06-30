import "../styles/BudgetTable.css"
import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs"


function BudgetTable({budgetItems, editItem}) {

    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" className="expand">Name</th>
                        <th scope="col" className="expand">Category</th>
                        <th scope="col">Subcategory</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Is Fixed</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {budgetItems.map((item, idx) => (
                    <tr key={idx}>
                        <th scope="row">{item.name}</th>
                        <td>{item.category.category}</td>
                        <td>{item.category.subcategory}</td>
                        <td>{item.amount}</td>
                        <td>{item.is_fixed}</td>
                        <span className="actions">
                            <BsFillTrashFill className="delete-btn"/>
                            <BsFillPencilFill onClick={() => editItem(idx)} />
                        </span>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default BudgetTable