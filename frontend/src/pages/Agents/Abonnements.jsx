import React, { use } from 'react' ;
import Navbar from './Navbar';
import "../../Styles/agent/Abonnements.css"  ;
import { useState , useEffect } from 'react'

export default function Abonnements() {
    const [abonnements , setAbonnements] = useState([]);
    const [search , setSearch] = useState(null);


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/agent/abonnements", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("Token")}`
          }
        }).then(response => response.json())
        .then(data => {
          setAbonnements(data.abonnements);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des abonnements:", error);
        });
        //fetch abonnements from api
    }, []);

    const filterabonnements=abonnements.filter((abonnement)=>{ 
        const dateFin = new Date(abonnement.date_fin);
        if (search=='son_expire'){
            const now = new Date();
            const diffTime = dateFin - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7 && diffDays >=0 ;
        }
        return true;
    });

  return (
    <article className='abonnements'>
      <Navbar/>
      <div className='container'>
        <h1>Liste des abonnements</h1>

        <table border={1}>
            <thead>
                <tr>
                    <th>ID Abonnement</th>
                    <th>Client</th>
                    <th>Type</th>
                    <th>Prix unitaire</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {abonnements.map((abonnement) => (
                    <tr key={abonnement.id}>
                        <td>{abonnement.id}</td>
                        <td>{abonnement.client.nom_complet}</td>
                        <td>{abonnement.service.type}</td>
                        <td>{abonnement.service.prix_initial}</td>
                        <td>{abonnement.date_debut}</td>
                        <td>{abonnement.date_fin}</td>
                        <td>{abonnement.statut}</td>
                        <td><button onClick={() => {}}>Détails</button></td>
                    </tr>
                ))}
            </tbody>
        </table>

      </div>
    </article>
  )
}
