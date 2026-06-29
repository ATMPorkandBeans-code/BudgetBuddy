import { useState } from "react";

function BudgetItemForm({ addBudgetItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [isFixed, setIsFixed] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    "Housing",
    "Utilities",
    "Groceries",
    "Transportation",
    "Insurance",
    "Minimum Debt Payments",
    "Dining Out",
    "Shopping",
    "Streaming Services",
    "Travel",
    "Hobbies",
    "Upgraded Tech",
    "Emergency Fund",
    "Retirement Savings",
    "Investments",
    "Extra Debt Principal",
  ];

  const handleChange = (e) => {
    setCategory(e.target.value);

  };

  const handleCheckBoxChange = () => {
    setIsFixed(prevValue => !prevValue);
        console.log(isFixed)
  };

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    
    const item = {
      "name": name,
      "category": category,
      "amount": amount,
      "is_fixed": isFixed,
    };

    fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(item),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("New budget expense post failed.");
      })
      .then((data) => addBudgetItem(data));
  }

  return (
    <div>
      Add Budget Item
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Choose Category</label>
        <select id="category-select" value={category} onChange={handleChange}>
          <option value="" disabled>
            --Please choose a category--
          </option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="checkbox"
          checked={isFixed}
          onChange={handleCheckBoxChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default BudgetItemForm;
