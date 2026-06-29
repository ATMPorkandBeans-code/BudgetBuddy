import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from './context/UserContext'
import React from "react"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
    <UserProvider>
    <App />   
    </UserProvider>
    </React.StrictMode>
    );

