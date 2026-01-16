import React from 'react'
import { IoClose } from "react-icons/io5";
import { useState } from 'react';

export default function Modalclient({client , setModalclientOpen}) {
  const [id , setId] = useState(client.id);
  const [nom_complet, setNom_complet] = useState(client.nom_complet);
  const [nom_societe, setNom_societe] = useState(client.nom_societe);
  const [telephone, setTelephone] = useState(client.telephone);
  const [email, setEmail] = useState(client.email);

  const handleSubmit=(e)=>{
    e.preventDefault();
    const token = localStorage.getItem("Token");
    fetch(`http://127.0.0.1:8000/api/agent/client/modifier/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        nom_complet,
        nom_societe,
        telephone,
        email
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Client modifié avec succès:", data);
      setModalclientOpen(false);
    })
    .catch(error => {
      console.error("Erreur lors de la modification du client:", error);
    });
  };

  return (
    <div className='modalclientdetails'>
      <button onClick={() => setModalclientOpen(false)} className='closebtn'><IoClose /></button>
      <h2>Modifier le Client</h2>
      <form className='content' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom_complet">Nom Complet:</label> <br />
          <input type="text" id="nom_complet" defaultValue={client.nom_complet}  onChange={(e)=>setNom_complet(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="nom_societe">Société:</label> <br />
          <input type="text" id="nom_societe" defaultValue={client.nom_societe} onChange={(e)=>setNom_societe(e.target.value)} />
        </div>
        <div>
          <label htmlFor="telephone">Téléphone:</label> <br />
          <input type="text" id="telephone" defaultValue={client.telephone} onChange={(e)=>setTelephone(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label> <br />
          <input type="text" id="email" defaultValue={client.email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <button type='submit' className='modifierbtn'>Modifier</button>
      </form>
    </div>
  )
}
