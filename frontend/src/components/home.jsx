import React, { useState,useEffect } from 'react'
import data from '../data'
import Coupon from './coupon'
import './home.scss'
import Sidebar from './Sidebar'
import jwt from 'jsonwebtoken'

const Home =() => {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [info,setInfo]=useState([]);
  const [cur,setCur]=useState();
  const [category,setCategory]=useState('all');
  const closePopup = () => {
    setPopupOpen(false);
  };

  const updateCategory=(categ)=>{
      
      setCategory(categ);
  }

  const openPopup = (item) => {
    setInfo(item);
    console.log('yes')
    setPopupOpen(true);
  };

  useEffect(() => {
        const token = localStorage.getItem('token');
  
        if(token) {
          try {
            const decodedUser = jwt.decode(token);
            console.log(decodedUser);
            
            if(decodedUser) {
              setCur(decodedUser.email);
            }
          } catch (error) {
            console.error('Error decoding token:', error);
      }
    
  }
},[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch(`connect-coupons-8k8e-server.vercel.app/users/get/${category}`);
      
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const mappedCoupons = data.map(item => (
          <Coupon key={item.lmd_id} {...item} open={()=>openPopup(item)} close={closePopup}/>
        ));

        setCoupons(mappedCoupons);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, [category]);
     
  return (
    <div className='home-full'>
       <Sidebar  updateCategory={updateCategory}/>
    <div className='home'>
      <div className='heading'>
        Coupons
      </div>
      {coupons}
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
    cur==info.email?<button >Delete</button>:<></>
  }
  
</div>
</div>
)} 

    </div>
   
  )
}

export default Home
