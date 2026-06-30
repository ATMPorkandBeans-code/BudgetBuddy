import { useState, useEffect } from "react";
import { useUser } from "./context/UserContext";
import LoginSignup from "./components/LoginSignup";
import UserInfo from "./components/UserInfo";
import PercentDisplay from "./components/PercentDisplay";
import BudgetTable from "./components/BudgetTable";
import BudgetItemForm from "./components/BudgetItemForm";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const { user, updateIncome } = useUser();
  const [formOpen, setFormOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [budgetItems, setBudgetItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editedItems, setEditedItems] = [];

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
    if (!budgetItems) {
      setTotals(null);
      return;
    }
    const category_map = { needs: 0, wants: 0, savings: 0 };
    for (const item of budgetItems) {
      category_map[item.category.subcategory] =
        category_map[item.category.subcategory] + Number(item.amount);
      console.log(item.category.subcategory);
      console.log(item.amount);
    }
    setTotals(category_map);
  }, [budgetItems]);

  function addBudgetItem(newItem) {
    setBudgetItems((prevItems) => [...prevItems, newItem]);
    totals[newItem.category.subcategory] =
      Number(totals[newItem.category.subcategory]) + Number(newItem.amount);
  }

  function addEditedItem(newItem) {
    setEditedItems((prevItems) => [...prevItems, newItem]);
    totals[newItem.category.subcategory] =
      Number(totals[newItem.category.subcategory]) + Number(newItem.amount);
  }

  function handleEditItem(idx) {
    setItemToEdit(idx);
    setModalOpen(true);
  }

  return (
    <div className="App">
      <LoginSignup />
      {user && <p>Hello {user.username}</p>}
      {user && <UserInfo user={user} updateIncome={updateIncome} />}
      {user && totals && <PercentDisplay totals={totals} user={user} />}
      {user && budgetItems && (
        <BudgetTable budgetItems={budgetItems} addBudgetItem={addBudgetItem}  editItem={handleEditItem}/>
      )}
      {user && (
        <button className="btn" onClick={() => setFormOpen(true)}>
          Add
        </button>
      )}
      {user && formOpen && (
        <BudgetItemForm
          addBudgetItem={addBudgetItem}
          closeForm={() => {
          setFormOpen(false);
          }}
        />
      )}
      {user && modalOpen && (
        <Modal
          addEditedItem={addEditedItem}
          addBudgetItem={addBudgetItem}
          closeModal={() => {
            setModalOpen(false);
          }}
          defaultValue={itemToEdit !== null && budgetItems[itemToEdit]}
        />
      )}
    </div>
  );
}

export default App;
