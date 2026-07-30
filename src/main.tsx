import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "@/context/SidebarContext";

import "./index.css";

import AppRouter from "./router/AppRouter";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>

    <BrowserRouter>

     <SidebarProvider>

        <AppRouter />

     </SidebarProvider>

    </BrowserRouter>

  </React.StrictMode>
);