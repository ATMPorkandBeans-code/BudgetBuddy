// import { useState } from "react";
// import { useBudget } from "../context/BudgetContext";

// function IncomeForm() {
//   const [category, setCategory] = useState("");
//   const [amount, setAmount] = useState("");
//   const [error, setError] = useState(null);
//   const { addIncome, incomeCategories } = useBudget();

//   function handleSubmit(e) {
//     e.preventDefault();
//     setError(null);
//     const newIncome = {
//       category,
//       amount,
//     };
//     addIncome(newIncome);
//   }

//   return (
//     <div>
//       <h2>Income Form</h2>
//       <form onSubmit={handleSubmit}>
//         <label> Income Category </label>
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="" disabled>
//             Select Category
//           </option>
//           {incomeCategories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//           ;
//         </select>
//         <label> Income Amount </label>
//         <input
//           type="text"
//           name="amount"
//           placeholder="Income Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//         <button type="submit">Add Income</button>
//       </form>
//     </div>
//   );
// }

// export default IncomeForm;
