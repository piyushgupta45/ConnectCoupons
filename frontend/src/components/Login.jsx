// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();


  async function loginUser(event) {
    event.preventDefault();
    try {
      const res = await fetch("connect-coupons-8k8e-server.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
       
      const data = await res.json();
      console.log(data.user)
       if(data.user)
       {
        localStorage.setItem('token',data.user)
        console.log('Login successfull')
        navigateTo("/");
       }
       else{
        alert('Please check your username and password')
       }
    
     

    } catch (error) {
      console.error("An error occurred during login:", error);
      // Handle other errors, display error message, etc.
    }
  }

  return (
    <div className="login-full">
    <div className="login-logo">
    <img src="/assets/logo.png" alt="" />
        <div className="text">
          <div>Connect</div>
          <div>Coupons</div>
        </div>
       </div>
   <div className="login-cover">
     <div className="login">
      
      <h1>Login</h1>
      <form onSubmit={loginUser}>
      <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input className="button" type="submit" value="Login" />
      </form>
      Do not have an account?  <a href="/register" target="_blank" rel="noopener noreferrer">Register</a>
    </div>
    </div>
    </div>
  );
};

export default Login;
