import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams, useNavigate } from 'react-router-dom'

export default function Infoabonnement() {
  const navigate = useNavigate()
  const { client_id, service_id } = useParams() ;
  const [data , setdata]=useState([])

  useEffect(() => {
    if (!client_id || !service_id) {
      navigate('/agent/abonnements')
    }
  }, [client_id, service_id, navigate])
  useEffect(()=>{
    const token = localStorage.getItem("Token");
    fetch(`http://127.0.0.1:8000/api/agent/abonnements/client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        client_id , 
        service_id
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data) ;
      setdata(data.abonnements) ;

    })
    .catch(error => {
      console.error("Erreur lors de la modification du client:", error);
    });

  }, [])

  return (
    <article className="infoabonnement">
      <Navbar />
      <div className="container">
        <h1>L'histoire de cet abonnement</h1>
        <div className='elements'>
          {data.length > 0 && (
                <h2>client : {data[0].client.nom_complet}</h2>
          )}

          {data.map((abonnement)=>(
            <div className='card' id={abonnement.statut=='active' ? 'active' : 'expire'} >
              <p><strong>date de début : </strong>{abonnement.date_debut}</p>
              <p><strong>date de fin : </strong> {abonnement.date_fin}</p>
              <p><strong>prix unitaire : </strong>{abonnement.prix_unitaire}</p>
            </div>
          ))}

        </div>
      </div>
    </article>
  )
}
