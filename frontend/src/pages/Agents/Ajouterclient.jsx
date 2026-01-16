import React, { useEffect } from "react";
import Navbar from "./Navbar";
import "../../Styles/agent/Ajouterclient.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Ajouterclient() {
  const [nom, setNom] = useState("");
  const [nomSociete, setNomSociete] = useState("");   
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");



  const Handlesubmit=(e)=>{
    e.preventDefault();
    const token = localStorage.getItem("Token");
    fetch("http://127.0.0.1:8000/api/agent/ajouterclient", {
      method: "POST",
      headers: {  
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        nom_complet:nom,
        nom_societe :nomSociete,
        email :email,
        telephone:telephone
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Client ajouté avec succès:", data);
      alert("Client ajouté avec succès !");
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout du client:", error);
      alert("Erreur lors de l'ajout du client.");
    });
  };




  return (
    <article className="Ajouterclient">
      <Navbar />
      <div className="container">
        <h1 className="title">Ajouter un client</h1>
        <form className="formajouterclient" onSubmit={Handlesubmit}>
            <div className="content">
              <label>Nom complet :</label> <br />
              <input
                value={nom}
                type="text"
                placeholder="Nom complet du client"
                onChange={(e)=>setNom(e.target.value)}
              />
            </div>
            <div className="content">
              <label>Nom société :</label> <br />
              <input
                value={nomSociete}
                type="text"
                placeholder="Nom de la société"
                onChange={(e)=>setNomSociete(e.target.value)}
              />
            </div>
            <div className="content">
              <label>Email :</label> <br />
              <input type="email" placeholder="Email du client" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="content">
              <label>Téléphone :</label> <br /> 
              <input
                type="tel"
                placeholder="Téléphone du client"
                onChange={(e)=>setTelephone(e.target.value)}
                value={telephone}
              />
            </div>

                <button type="submit" className="Ajouterbtn">
                    Ajouter le client
                </button>
        </form>
      </div>
    </article>
  );
}
