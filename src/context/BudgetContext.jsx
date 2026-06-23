import { createContext, useContext, useState } from "react";

const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [spendingTargets, setSpendingTargets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState([
    "Housing",
    "Utilities",
    "Transportation",
    "Healthcare",
    "Debt",
    "Dining Out",
    "Entertainment",
    "Shopping",
    "Travel",
    "Emergency Fund",
    "Retirement",
    "Brokerage",
    "Education",
    "Miscellaneous",
  ]);
  const [incomeCategories, setIncomeCategories] = useState([
    "Salary",
    "Gig-Work",
  ]);

  function addMonthlyExpense(newExpense) {
    setMonthlyExpenses([...monthlyExpenses, newExpense]);
  }

  function addIncome(newIncome) {
    setIncome([...income, newIncome]);
  }

  function addRecurringExpense(newExpense) {
    setRecurringExpenses([...recurringExpenses, newExpense]);
  }

  function addSpendingTarget(newTarget) {
    setSpendingTargets([...spendingTargets, newTarget]);
  }

  function addGoal(newGoal) {
    setGoals([...goals, newGoal]);
  }

  return (
    <BudgetContext.Provider
      value={{
        monthlyExpenses,
        addMonthlyExpense,
        income,
        addIncome,
        recurringExpenses,
        addRecurringExpense,
        spendingTargets,
        addSpendingTarget,
        goals,
        addGoal,
        categories,
        incomeCategories,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  return useContext(BudgetContext);
}
