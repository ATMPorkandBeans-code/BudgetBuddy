import { useState } from "react";
import { useBudget } from "../context/BudgetContext";

function ExpenseForm({id}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const { addMonthlyExpense, categories } = useBudget();


  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const newExpense = {
      id,
      name,
      category,
      amount,
    };
    addMonthlyExpense(newExpense);
  }

  return (
    <div>
      <h2>New Expense Form</h2>
      <form onSubmit={handleSubmit}>
        <label> Expense Name </label>
        <input
          type="text"
          name="name"
          placeholder="New Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label> Expense Category </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          </select>
        <label> Expense Amount </label>
        <input
          type="text"
          name="amount"
          placeholder="Expense Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm
