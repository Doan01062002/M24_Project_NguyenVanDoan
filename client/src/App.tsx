import React from "react";
import Dashboard from "./pages/admin/Dashboard";
import MainPage from "./pages/MainPage";
import Login_Register from "./pages/auth/Login_Register";
import { Route, Routes } from "react-router-dom";
import MyIndividual from "./pages/MyIndividual";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/profile" element={<MyIndividual></MyIndividual>}></Route>
        <Route
          path="/login"
          element={<Login_Register></Login_Register>}
        ></Route>
        <Route path="/admin" element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </>
  );
}
