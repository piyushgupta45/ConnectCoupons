import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import './Register.scss'

function Register() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigateTo = useNavigate(); 
 async function registerUser(event)
 {

  event.preventDefault()
   const res=await fetch('http://localhost:5000/register',{
   method:'POST',  
   headers:{
        'Content-Type':'application/json',
       },
   body:JSON.stringify({
        name,
        email,
        password
       }),
   })
   const data=await res.json()
   console.log(data.status)
 if(data.status==='ok')
 {
  navigateTo('/login')
 }
 }
  return (
    <div className="register-full">
    <div className="register-logo">
    <img src="/assets/logo.png" alt="" />
        <div className="text">
          <div>Connect</div>
          <div>Coupons</div>
        </div>
       </div>
      <div className='register-cover'>
        
       <div className='register'>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
           <input 
           value={name}
           onChange={(e)=>setName(e.target.value)}
           type='text' 
           placeholder='Name' />
           <br/>
           <input 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type='email' 
            placeholder='Email' />
            <br/>
           <input 
           type='password' 
           placeholder='password' 
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
           />
           <br/>
            <input className='button' type='submit' value='Register'/>
      </form>
      Already have an account?  <a href="/login" target="_blank" rel="noopener noreferrer">Login</a>
     </div>
     </div>
    </div>
  );
}

export default Register;
