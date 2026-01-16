import React from 'react'

export default function Modalsupprimer({client , setmodalesupprimer}) {
    const Confirmer=()=>{
        const token = localStorage.getItem("Token");
        fetch('http://127.0.0.1:8000/api/agent/client/supprimer/'+client.id, {
            
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Client supprimé avec succès");
            setmodalesupprimer(false);
        })
        .catch(error => {
            console.error("Erreur lors de la suppression du client:", error);
        });
    }
  return (
    <div className='modalsupprimerdetails'>
      <h2>Supprimer le Client</h2>
      <p>Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible.</p>
      <div className='buttons'>
        <button className='confirmbtn' onClick={() => Confirmer()}>Confirmer</button>
        <button className='cancelbtn' onClick={() => setmodalesupprimer(false)}>Annuler</button>
      </div>
    </div>
    
  )
}
