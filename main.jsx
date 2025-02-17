import { App } from './App';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import "./style/main.css";
ReactDOM.createRoot(document.getElementById("root")).render(
    <HashRouter>  
      <App />
    </HashRouter>
  );