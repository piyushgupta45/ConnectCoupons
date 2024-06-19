import React, { useState ,useEffect} from "react";
import "./user.scss";
import data from "../data";
import Coupon from "./coupon";
import AddCoupon from "./AddCoupon";
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom';
import Sidebar from './Sidebar'

const User = () => {
  const { userId } = useParams();
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState(null);
  const [cur,setCur]=useState()
  const navigateTo = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [info,setInfo]=useState([]);
  const [category,setCategory]=useState('all')

  const closePopup = () => {
    setPopupOpen(false);
  };
  const updateCategory=(categ)=>{
    setCategory(categ);
}

  
  const openPopup = (item) => {
    setInfo(item);
    console.log(info)
    console.log('yes')
    setPopupOpen(true);
  };

  const handleDelete=async()=>{
      console.log('ss')
      try {
        const response = await fetch(`http://localhost:5000/users/delete/${info._id}`,{method: 'DELETE'});
        
      } catch (error) {
        console.error('Error occurred during fetch:', error);
      }
      setInfo(null)
      closePopup();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
  
        if (token) {
          try {
            const decodedUser = jwt.decode(token);
            console.log(decodedUser);
            
            if (decodedUser) {
              setCur(decodedUser.email);
            }
          } catch (error) {
            console.error('Error decoding token:', error);
      }
    }
  
        if (cur) {
          console.log(`http://localhost:5000/users/getuser/${userId}/${category}`)
          const response = await fetch(`http://localhost:5000/users/getuser/${userId}/${category}`);
          
          if(!response.ok) {
            throw new Error('Failed to fetch data');
          }

          const data = await response.json();
          console.log(data);
  
          const mappedCoupons = data.map(item => (
            <Coupon key={item.lmd_id} {...item} open={()=>openPopup(item)} close={closePopup}/>
          ));
  
          setCoupons(mappedCoupons);
        }
      } catch (error) {
        setError('Error fetching data');
      }
    };
  
    fetchData();
  }, [cur,info,userId,category]); 

  
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigateTo('/login')
 }

 

  return (
    <div className="user">
     
      <div className="user-profile">
        <div className="pic">
          <img src="/assets/user.png" alt="" />
        </div>
        <div className="details">
          <div className="div1">
          <div className="div2">
          <h1>{userId}</h1>
          <h4> User Coupons :{coupons.length}</h4>
          </div>
           <div className="div3">
           {    
              userId==cur?<button className="logout-button" onClick={handleLogout}>Logout</button>:<div></div>
           }
           </div>
           </div>
          <section>
            bio - Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Inventore dolores distinctio deserunt enim eaque aperiam quo
            cupiditate aliquam! Vero possimus deserunt adipisci earum saepe
            enim!
          </section>
        </div>
      </div>
      <div className="addcoupon">
        {
          userId==cur?<AddCoupon/>:<></>
        }
          
      </div>
      <hr />
      <div className="wrap">
        <Sidebar updateCategory={updateCategory} color='#f0ffff'/>
      <div className="user-coupons">
        {coupons}
      </div>
      </div>
   
      {isPopupOpen && (<div className="div">

      <div className="couponbig">
        <div className="close"> <img src='/assets/close.jpg'  onClick={closePopup} alt="" /></div>
         
      <div className="wrap">
      <div className="img"><img src='/assets/img2.jpg' alt="" /></div>
      <div className="details">
        <div className="email">{info.email}</div>
        <div className="title">{info.title}</div>
        <div className="category"><span>Category: </span>{info.category}</div>
        <div className="website"><span>Website: </span>{info.website}</div>
        <div className="valid">Valid Upto: {info.end_date}</div>
        <div className="code">{info.code}</div>     
      </div>
      </div>
        <div className="description">{info.description}</div>
        {
          cur==userId?<button onClick={handleDelete}>Delete</button>:<></>
        }
        
     </div>
     </div>
    )} 

    </div>
    
  );
};

export default User;
