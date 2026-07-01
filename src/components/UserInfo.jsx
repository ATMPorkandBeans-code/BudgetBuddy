import { useState } from "react";
import "../styles/UserInfo.css";

function UserInfo({ user, updateIncome }) {
  const [income, setIncome] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    updateIncome(income);
  }

  return (
    <div className="card user-info">
      <div className="income">Income: ${user.income}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <button className="btn" type="submit">
          Submit new income for {user.username}
        </button>
      </form>
    </div>
  );
}

export default UserInfo;
