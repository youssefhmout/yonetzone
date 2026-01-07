import '../Styles/Login.css'
import yonetzone from '../assets/yonetzone1.png'
import React from 'react'

export default function Login() {
  return (
    <div className='Login' >
      <div>
        <img src={yonetzone} alt="logo" style={{'width' : '100px'}}/>
      </div>
        <form className='Loginform'>
            <input type="email" placeholder='Email'  className='email'/>
            <input type="password"  placeholder='Mot de passe'  className='password'/>
            <button>Connexion</button>
        </form> 
    </div>
  )
}
