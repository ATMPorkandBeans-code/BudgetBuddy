import { useState } from "react";

function UserInfo({ user, updateIncome }) {
  const [income, setIncome] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    updateIncome(income);
  }

  return (
    <div>
      <div>Income: ${user.income}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <button type="submit">Submit new income for {user.username}</button>
      </form>
    </div>
  );
}

export default UserInfo;
