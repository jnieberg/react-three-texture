import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import { Router } from "wouter";

const root = createRoot(document.getElementById("root")! as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
