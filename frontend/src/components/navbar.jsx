// Navbar.jsx
import jwt from "jsonwebtoken";
import React, { useEffect, useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const [users, setUsers] = useState();
  const navigateTo = useNavigate();
  const [cur, setCur] = useState();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedUser = jwt.decode(token);
        if (decodedUser) {
          setCur(decodedUser.email);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [cur]);

  const handleClick = () => {
    navigateTo(`/user/${cur}`);
    console.log('dd')
  }

   
  const handleSearchClick=(email)=>{
     console.log('dff')
     console.log(email)
     setQuery("")
    navigateTo(`/user/${email}`);
    
  }
  
  const handleImageClick=()=>{
    navigateTo('/');
  }
  
  useEffect(() => {
    const handleSearch = async () => {
      console.log("down");
      try {
        const response = await fetch("connect-coupons-8k8e-server.vercel.app/users/allusers");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setUsers(data);
        console.log(users);
        const filteredResults = await users.filter((user) =>
          user.email.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filteredResults);
        
      } catch (error) {
        console.log("Error fetching data");
      }
    };
    handleSearch();
  }, [query]);

  return (
    <div className="navbar">
      <div className="logo">
        <img onClick={handleImageClick} src="/assets/logo.png" alt="" />
        <div>
          <div>Connect</div>
          <div>Coupons</div>
        </div>
      </div>
      <div className="nav-main">
        <div className="nav-input">
          <input
            placeholder="Search the user"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            // onKeyDown={handleKeyPress}
          />
        </div>

        

        <div className="search-results">
          {results &&
            results.map(
              (user) =>
                query && (
                  <li onClick={()=>handleSearchClick(user.email)} >
                    <strong>{user.name}</strong> - {user.email}
                  </li>
                )
            )
          }
            {
              !results && <li>USER NOT FOUND</li>
            }
        </div>
      </div>
      <div className="nav-profile">
        {cur ? (
          <>
            <img onClick={handleClick} src="/assets/user.png" alt="" />
            {cur} {/* Assuming 'name' is a property of your user object */}
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
