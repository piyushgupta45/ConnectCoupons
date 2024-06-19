import React,{useState} from "react";
import "./coupon.scss";
import { useNavigate } from "react-router-dom";

const Coupon = (props) => {
  
  const navigateTo = useNavigate();
  const handleClick=()=>{
    console.log(props.email)
    navigateTo(`/user/${props.email}`);
    
  }
   
  
  return (
    <div className="coupon" onClick={props.open}>
        <div className="img">
           <img src='/assets/img2.jpg' alt="" />
        </div>
      <div className="wrap">
      <div className="coupon-img">
        <img onClick={handleClick} src="/assets/user.png" alt="" />
        {props.email}
        </div>
      <div className="details">
        
        <div className="title">
          {props.title}
        </div>
        
        <div>
          {props.category}
        </div>
        <div className="valid">
          Valid Upto: {props.end_date}
        </div>
      </div>
     </div>
     
    </div>
    
   
  );
};

export default Coupon;
