import { useBudget } from "../context/BudgetContext"
import { useState } from "react"


function RecurringForm() {
    const { addRecurringExpense, categories } = useBudget();
    const [category, setCategory] = useState("");
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState("")
    const [error, setError] = useState(null)

    function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const newExpense = {
      category,
      expenseName,
      amount
    };
    addRecurringExpense(newExpense);
  }

    return (
        <div>
            <h2>Recurring Expense Form</h2>
            <form onSubmit={handleSubmit}>
        <label> Recurring Expense Category </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))};
        </select>
        <label> Recurring Expense Name </label>
        <input
          type="text"
          name="expenseName"
          placeholder="Recurring Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <label> Recurring Expense Amount </label>
        <input
          type="text"
          name="amount"
          placeholder="Recurring Expense Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Income</button>
      </form>
        </div>
    )
}