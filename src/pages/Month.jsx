// import NavBar from "../components/NavBar";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react"
// import ExpenseForm from "../forms/ExpenseForm";
// import ExpenseList from "../components/ExpenseList";
// import { useBudget } from "../context/BudgetContext";



// function Month() {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const [expenses, setExpenses] = useState([]);
//     const { monthlyExpenses } = useBudget();

//     const monthExpenses = monthlyExpenses.filter((expense) => 
//     expense.id === state.id)

//     return (
//         <div>
//             <NavBar />
//             <h1>{state.name}</h1>
//             <button onClick={() => navigate("/")}>
//                 Back to Home
//             </button>
//             <ExpenseForm id={state.id}/>
//             <ExpenseList expenses={monthExpenses} />

            

//         </div>
//     )
// }

// export default Month;

