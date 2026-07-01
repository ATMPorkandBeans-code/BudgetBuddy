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
  const [editedItems, setEditedItems] = useState([]);

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
    }
    setTotals(category_map);
  }, [budgetItems]);

  useEffect(() => {
    console.log(editedItems);
  }, [editedItems]);

  function addBudgetItem(newItem) {
    setBudgetItems((prevItems) => [...prevItems, newItem]);
    totals[newItem.category.subcategory] =
      Number(totals[newItem.category.subcategory]) + Number(newItem.amount);
  }

  function addEditedItem(editedItem) {
    setBudgetItems((prevItems) =>
      prevItems.map((item) => (item.id === editedItem.id ? editedItem : item)),
    );
    setEditedItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === editedItem.id);
      if (exists) {
        return prevItems.map((item) =>
          item.id === editedItem.id ? editedItem : item,
        );
      } else {
        return [...prevItems, editedItem];
      }
    });
  }

  function handleEditItem(idx) {
    setItemToEdit(idx);
    setModalOpen(true);
  }

  function handleDeleteItem(itemToDelete) {
    fetch("/api/expenses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(itemToDelete),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Expense deletion failed");
      })
      .then(() => {
        setBudgetItems((prevItems) =>
          prevItems.filter((item) => item.id != itemToDelete.id)
        );
        setEditedItems((prevItems) =>
            prevItems.filter((item) => item.id != itemToDelete.id)
        );
      })
      .catch((err) => {
      console.error("Error deleting item:", err);
    });
  }

  async function saveEditedItems() {
    try {
      const responses = await Promise.all(
        editedItems.map(async (item) => {
          const response = await fetch("/api/expenses", {
            method: "PUT",
            headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
          });

          if (!response.ok) {
            throw new Error(`Failed to updated item ${item.id}`);
          }

          return response.json()
        })
      )
      setEditedItems([])
    } catch (error) {
      console.error('An update failed:', error);
    }
  }

  return (
    <div className="App">
      <LoginSignup />
      {user && <p>Hello {user.username}</p>}
      {user && <UserInfo user={user} updateIncome={updateIncome} />}
      {user && totals && <PercentDisplay totals={totals} user={user} />}
      {user && editedItems && <button className="btn" onClick={saveEditedItems}>Save Edited Budget</button>}
      {user && budgetItems && (
        <BudgetTable
          budgetItems={budgetItems}
          addBudgetItem={addBudgetItem}
          editItem={handleEditItem}
          deleteItem={handleDeleteItem}
        />
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
          closeModal={() => {
            setModalOpen(false);
          }}
          itemToEdit={itemToEdit !== null && budgetItems[itemToEdit]}
        />
      )}
    </div>
  );
}

export default App;
