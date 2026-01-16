import '../Styles/Login.css'
import yonetzone from '../assets/yonetzone1.png'
import React from 'react' ; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email , setemail]=useState('');
  const [password , setpassword]=useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

const handleSubmit = async (e) => {

      e.preventDefault();
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/connexion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        console.log(data); 

        if (data.message=="Login successful") {
          console.log("Login successful");
          localStorage.setItem('Token', data.access_token);
          if (data.data.role === 'agent') {
            localStorage.setItem('Data', JSON.stringify(data.data));
            navigate('/agent/tableaudebord');
          }
        } else {
          console.log("Login failed", data.message);
          if (data.message=='Password incorrect') {
            setErrorMessage(true);
            setpassword('');
        }
      }} catch (error) {
        console.error("Error connecting to API:", error);
      }finally {
          setLoading(false); 
        }
    }
  



  return (
    <div className='Login' > 
      <div>
        <img src={yonetzone} alt="logo" style={{'width' : '100px'}}/>
      </div>
        <form className='Loginform'  onSubmit={handleSubmit}>
            <input type="email" placeholder='Email'  className='email' onChange={(e)=>setemail(e.target.value)}/>
            <input type="password"  placeholder='Mot de passe' id={errorMessage ? "errorMessage" : ""}  className='password' onChange={(e)=>setpassword(e.target.value)}/>
            <button type="submit" className='button'>{loading ? <span className="loader"></span> : "connexion"}</button>
        </form> 
    </div>
  )
}
