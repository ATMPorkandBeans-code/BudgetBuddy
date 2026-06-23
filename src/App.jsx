import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Month from "./pages/Month";
import Budget from "./pages/Budget";
import { BudgetProvider } from "./context/BudgetContext";

function App() {
  return (
    <BudgetProvider>
      <BrowserRouter basename="/moneymind">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/month/:id" element={<Month />} />
          <Route path="/budget" element={<Budget />} />
        </Routes>
      </BrowserRouter>
    </BudgetProvider>
  );
}

export default App;
