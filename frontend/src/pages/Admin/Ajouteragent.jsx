import React from 'react'
import Navbar from './Navbar' ;
import { useState , useEffect } from 'react';
import "../../Styles/admin/ajouteragent.css"  ;

export default function Ajouteragent() {
  const [nom , setNom ]=useState('') ;
  const [email , setEmail ]=useState('') ;
  const [password , setPassword ]=useState('') ;
  const [conpassword , setConpassword ]=useState('') ;
  const [errorcon , seterrorcon]=useState(false)


  const Handlesubmit =(e)=>{
    e.preventDefault() ;
    if (password !=conpassword){
      seterrorcon(true) ;
      setConpassword('') ;
    }
    else {
    const token = localStorage.getItem("Token");  
    fetch("http://127.0.0.1:8000/api/agent/ajouter", {
      method: "POST",
      headers: {  
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name:nom,
        email:email,
        password :password,
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Agent ajouté avec succès:", data);
      alert("Agent ajouté avec succès !");
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout du Agent:", error);
      alert("Erreur lors de l'ajout du Agent.");
    });
    }
  }
  


  return (
    <article className='ajouteragent'>
      <Navbar/>
      <div className='container'>
        <h1>Ajouter un agent</h1>
        <form  className='formagent' onSubmit={Handlesubmit}>
          <label htmlFor="">Nom complet :  <span style={{'color' : 'red'}}>*</span></label> <br />
          <input type="text" value={nom}  placeholder="Nom de l'agent" required  onChange={(e)=>setNom(e.target.value)}/> <br />
          <label htmlFor="">Email :<span style={{'color' : 'red'}}>*</span> </label> <br />
          <input type="email" value={email} placeholder='exemple@gmail.com' required onChange={(e)=>setEmail(e.target.value)}/> <br />
          <label htmlFor="">Mot de passe : <span style={{'color' : 'red'}}>*</span></label> <br />
          <input type="password"  value={password} required onChange={(e)=>setPassword(e.target.value)}/> <br />
          <label htmlFor="">Confirmez le mot de passe : <span style={{'color' : 'red'}}>*</span></label> <br />
          <input type="password" value={conpassword} required onChange={(e)=>setConpassword(e.target.value)}/>  <br />
          {errorcon && <p style={{'color': 'red'}}>Le mot de passe e la confirmation ne correspondent pas.</p>}
          {errorcon && <br/>}
          <button type='submit'>Ajouter</button>


        </form>
      </div>
    </article>
  )
}
