import { useState, useEffect } from "react";
import { useUser } from "./context/UserContext";
import LoginSignup from "./components/LoginSignup";
import UserInfo from "./components/UserInfo";
import PercentDisplay from "./components/PercentDisplay";
import BudgetTable from "./components/BudgetTable";
import BudgetItemForm from "./components/BudgetItemForm";

function App() {
  const { user, updateIncome } = useUser();
  const [budgetItems, setBudgetItems] = useState([]);
  const [income, setIncome] = useState(null)
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState(null);



  useEffect(() => {
    if (!user) {
      setBudgetItems([]);
      return;
    }
    fetch("/api/expenses")
      .then((r) => r.json())
      .then((data) => {
        setBudgetItems(data);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (!user) {
      setBudgetItems([]);
      return;
    }
    fetch("/api/budget/totals")
      .then((r) => r.json())
      .then((data) => {
        setTotals(data);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }
  setIncome(user.income)
  }, [user])


  function addBudgetItem(newItem) {
      setBudgetItems(prevItems => [...prevItems, newItem])
  }
  

  return (
    <div>
      <LoginSignup />
      {user && <p>Hello {user.username}</p>}
      {user && (
        <UserInfo
          user={user}
          updateIncome={updateIncome}
        />
      )}
      {user && totals && (
        <PercentDisplay totals={totals} user={user} />
      )}
      {user && budgetItems && (
        <BudgetTable budgetItems={budgetItems} addBudgetItem={addBudgetItem}/>
      )}
      {user && (
        <BudgetItemForm addBudgetItem={addBudgetItem}/>
      )}
    </div>
  );
}

export default App;
