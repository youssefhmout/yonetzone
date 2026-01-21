import React from 'react'
import { MdOutlineClose } from "react-icons/md";
import { useState } from 'react' ;

import './../Styles/agent/Renouveler.css'  ;

export default function Renouveler({abonnement , setRenouvelerModal , setRefresh}) {
    const [duree , setDuree] = useState(1) ;


    const Handlesubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api/agent/abonnement/renouveler', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            },
            body: JSON.stringify({
                abonnement_id: abonnement.id,
                duree: Number(duree)
            })
        }).then(response => response.json())
        .then(data => {
            console.log("Renouvellement réussi:", data);
            setRefresh(prev => prev + 1);
            setRenouvelerModal(false);
        })
        .catch(error => {
            console.error("Erreur lors du renouvellement:", error);
        });
    }
  return (
    <div className='modalrenouveler'>
        <div className='container'>
            <button className='close-btn' onClick={() => setRenouvelerModal(false)}>
                <MdOutlineClose />
            </button>

            <h2>Renouveler l'abonnement</h2>
            <div className='details'>
                <p><strong>Client:</strong> {abonnement.client.nom_complet}</p>
                <p><strong>Date de fin actuelle:</strong> {abonnement.date_fin}</p>
                <p><strong>Type d'abonnement:</strong> {abonnement.service.type}</p>
                <p><strong>Prix initial :</strong> {abonnement.service.prix_initial} dh</p>
                <p><strong>Prix renouvellement :</strong> {abonnement.service.prix_renouvellement} dh</p>
            </div>
           <form onSubmit={Handlesubmit}>
            <label >Durée de renouvellement  {abonnement.service.type == "mensuel" ? "en mois" : " en années"}:</label><br />
            <input type="number" min="1" value={duree} onChange={(e) => setDuree(e.target.value)} />
            <button type='submit' className='renouvelerbtn'>Renouveler</button>
           </form>

        </div>
    </div>
  )
}
