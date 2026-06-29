function BudgetTable({budgetItems}) {


    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Subcategory</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Is Fixed</th>
                    </tr>
                </thead>
                <tbody>
                    {budgetItems.map((item) => (
                    <tr key={item.id}>
                        <th scope="row">{item.name}</th>
                        <td>{item.category.category}</td>
                        <td>{item.category.subcategory}</td>
                        <td>{item.amount}</td>
                        <td>{item.is_fixed}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default BudgetTable