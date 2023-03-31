import React from "react";
//import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import { Router } from "./Router";
import "./estilos/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
