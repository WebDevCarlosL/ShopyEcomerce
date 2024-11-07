// layout.jsx
"use client";

import React from "react";
import AuthContextProvider from "../context/AuthContext"; // Asegúrate de que la ruta sea correcta

const Layout = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>; // Usa el proveedor aquí
};

export default Layout;
