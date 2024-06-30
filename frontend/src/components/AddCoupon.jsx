// AddCoupon.js
import React, { useState,useEffect } from 'react';
import jwt from "jsonwebtoken";
import './AddCoupon.scss'


function AddCoupon() {
 
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [couponTitle,setCouponTitle]=useState();
  const [couponDescription,setCouponDescription]=useState();
  const [endDate,setEndDate]=useState();
  const [couponCode,setCouponCode]=useState();
  const [category,setCategory]=useState();
  const [website,setWebsite]=useState();
  const [cur,setCur]=useState();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedUser = jwt.decode(token);
        
        
        if (decodedUser) {
          setCur(decodedUser.email); 
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        
      }
    }
  }, []); 

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const addCouponFunc = async() =>{
    
    console.log(cur)
    const date=endDate.toString()
    const res=await fetch('https://connect-coupons-8k8e-server.vercel.app/users/post',{
      method:'POST',  
      headers:{
           'Content-Type':'application/json',
          },
      body:JSON.stringify({
           code:couponCode,
          description:couponDescription,
          title:couponTitle,
          end_date:date,
          email:cur,
          website:website,
          category:category
          }),
      })
      const data=await res.json()
   console.log(data.status)
    closePopup()
  }

  return (
    <div className='add-coupon'>
      <button onClick={openPopup}>Add Coupon</button>

      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>Add Coupon</h2>
            <form>
              <label htmlFor="couponTitle">Coupon Title:</label>
              <input type="text" 
                     id="couponTitle" 
                     onChange={(e)=>setCouponTitle(e.target.value)} 
                     name="couponTitle" required />
              <br />
              <label htmlFor="couponCode">Category:</label>
              <input type="text" 
                     id="couponCode" 
                     onChange={(e)=>setCategory(e.target.value)}
                     name="couponCode" required />
              <br />
              <label htmlFor="couponCode">Website:</label>
              <input type="text" 
                     id="couponCode" 
                     onChange={(e)=>setWebsite(e.target.value)}
                     name="couponCode" required />
              <br />
              <label htmlFor="couponDescription">Coupon Description:</label>
              <textarea
                id="couponDescription"
                name="couponDescription"
                onChange={(e)=>setCouponDescription(e.target.value)}
                rows="4"
                required
              ></textarea>
              <br />

              <label htmlFor="endDate">End Date:</label>
              <input type="date"
                     id="endDate"
                     onChange={(e)=>setEndDate(e.target.value)} 
                     name="endDate" required />
              <br />

              <label htmlFor="couponCode">Coupon Code:</label>
              <input type="text" 
                     id="couponCode" 
                     onChange={(e)=>setCouponCode(e.target.value)}
                     name="couponCode" required />
              <br />

              <button type="button" className="add-btn" onClick={addCouponFunc}>
                Add
              </button>
              <button type="button" className="close-btn" onClick={closePopup}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCoupon;
