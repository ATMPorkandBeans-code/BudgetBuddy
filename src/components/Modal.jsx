import "../styles/Modal.css";
import { useState } from "react";

function Modal({ closeModal, addEditedItem, defaultValue, addBudgetItem }) {
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
    setIsFixed((prevValue) => !prevValue);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const item = {
      name: name,
      category: category,
      amount: amount,
      is_fixed: isFixed,
    };
    addEditedItem(item);
  }

  return (
    <div className="modal-container" onClick={(e) => {
      if (e.target.className === "modal-container") closeModal()
    }}>
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="page"
              type="text"
              placeholder={defaultValue["name"]}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category-select"
              value={category}
              onChange={handleChange}
            >
              <option value="" disabled>
                --Please choose a category--
              </option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              placeholder={defaultValue["amount"]}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="isFixed">Is Fixed</label>
            <input
              type="checkbox"
              checked={isFixed}
              onChange={handleCheckBoxChange}
            />
          <button type="submit" className="btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
