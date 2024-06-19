import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import User from "./components/user";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router';
import Footer from "./components/footer";
import { Navigate } from 'react-router-dom';

const App = () => {
 
  const location = useLocation();
  const navigateTo = useNavigate();
    const showNavbar = !["/login", "/register"].includes(location.pathname);
  return (
    // <Router>
      <div>
        {localStorage.getItem('token') && showNavbar && <Navbar />}
        <Routes>
        <Route path="/" element={localStorage.getItem('token')? <Home /> :<Navigate to="/login" />}/>
          <Route path="/user/:userId" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/profile" element={<Register />} />
        </Routes>
        {localStorage.getItem('token') && showNavbar && <Footer />}
      </div>

    // </Router>
    
    );
};

export default App;
