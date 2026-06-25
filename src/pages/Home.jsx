// import NavBar from "../components/NavBar";
// import Month from "./Month"
// import MonthCard from "../components/MonthCard"
// import { useBudget } from "../context/BudgetContext";

// function Home() {

//     const months = [
//     { id: "01", name: "January" },
//     { id: "02", name: "February" },
//     { id: "03", name: "March" },
//     { id: "04", name: "April" },
//     { id: "05", name: "May" },
//     { id: "06", name: "June" },
//     { id: "07", name: "July" },
//     { id: "08", name: "August" },
//     { id: "09", name: "September" },
//     { id: "10", name: "October" },
//     { id: "11", name: "November" },
//     { id: "12", name: "December" },
// ];
//     return (
//         <div>
//             <NavBar />
//             <h1>Home</h1>
//             <div>
//                 {months.map((month) => (
//                     <MonthCard
//                     key={month.id} 
//                     id={month.id}
//                     name={month.name}>{month.name}</MonthCard>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Home;