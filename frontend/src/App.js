import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Sidebar from "./components/Sidebar";

import EmployeePage from "./pages/EmployeePage";
import AddEmployee from './pages/AddEmployee';
import ViewEmployee from "./pages/ViewEmployee";

const App = () => {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Sidebar />
        <div className="content-area">
          <Navbar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<EmployeePage />} />
              <Route path="/addemp" element={<AddEmployee />} />
              <Route path="/view/:id" element={<ViewEmployee />} />
              <Route path="/edit/:id" element={<AddEmployee />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;