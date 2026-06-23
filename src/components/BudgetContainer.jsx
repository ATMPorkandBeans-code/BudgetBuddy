import { useBudget } from "../context/BudgetContext";


function BudgetContainer() {
    const { income, recurringExpenses, spendingTargets, goals } = useBudget();
    return(
        <div>
            <h3>User Budget</h3>
            <div>
                Income
            {income.map((i) => (
                <div>Category: {i.category}
                Income Amount: {i.amount}</div>
            ))}
            </div>

        </div>
    )
}

export default BudgetContainer;