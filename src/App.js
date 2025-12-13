import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Properties from "./components/Properties";
import PropertyDetails from "./components/PropertyDetails";
import AddProperty from "./components/AddProperty";
import Dashboard from "./components/Dashboard";
import ApplicationForm from "./components/ApplicationForm";
import MyApplications from "./components/MyApplications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/property/:id/apply" element={<ApplicationForm />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/edit-property/:id" element={<AddProperty />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-applications" element={<MyApplications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

