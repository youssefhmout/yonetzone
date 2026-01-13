import { IoMdWarning } from "react-icons/io";
import React, { use, useEffect } from "react";
import Navbar from "./Navbar";
import "../../Styles/agent/Ajouterclient.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Ajouterclient() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading , setLoading] = useState(true);

    const [nom, setNom] = useState("");
    const [nomSociete, setNomSociete] = useState("");   
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [dateDebut, setDateDebut] = useState("");   
    const [typeAbonnement, setTypeAbonnement] = useState("mensuel");
    const [prix, setPrix] = useState("");
    const [prixSuivant, setPrixSuivant] = useState("");
    const [duree, setDuree] = useState(null);


    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("Token");
        fetch(`http://127.0.0.1:8000/api/agent/client/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",     
                "Authorization": `Bearer ${token}`
            }
        })  .then(response => response.json())
        .then(data => {
            console.log(data);
            setNom(data.client.nom_complet);
            setNomSociete(data.client.nom_societe);
            setEmail(data.client.email);
            setTelephone(data.client.telephone);
            setDateDebut(data.client.date_debut);
            setTypeAbonnement(data.client.type_abonnement);
            setPrix(data.client.prix);
            setPrixSuivant(data.client.prix_suivant);
            setDuree(data.client.duree);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching client data:", error);
        });
    }, [id]);





  return (
    <article className="Ajouterclient">
      <Navbar />
      <div className="container">
        <h1 className="title">Modifier un client</h1>
        {loading ? <p>Loading client data...</p>: (
        <>
        <div className="warning" style={{'color':'red'}}>
          <p> <IoMdWarning className="icon" /> Attention  le prix suivant est : {prixSuivant} dh</p>
        </div>
        <form className="formajouterclient" >
          <div className="elements">
            <div className="content">
              <label>Nom complet :</label>
              <input
                value={nom}
                type="text"
                placeholder="Nom complet du client"
                onChange={(e)=>setNom(e.target.value)}
              />
            </div>
            <div className="content">
              <label>Nom société :</label>
              <input
                value={nomSociete}
                type="text"
                placeholder="Nom de la société"
                onChange={(e)=>setNomSociete(e.target.value)}
              />
            </div>
          </div>
          <div className="elements">
            <div className="content">
              <label>Email :</label>
              <input type="email" placeholder="Email du client" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="content">
              <label>Téléphone :</label>
              <input
                type="tel"
                placeholder="Téléphone du client"
                onChange={(e)=>setTelephone(e.target.value)}
                value={telephone}
              />
            </div>
          </div>
          <div className="elements">
            <div className="content">
              <label htmlFor="">date debut abonnement :</label>
              <input type="date" value={dateDebut} onChange={(e)=>setDateDebut(e.target.value)} />
            </div>
            <div className="content">
              <label htmlFor="">Type d'abonnement :</label>
              <select name="type_abonnement" value={typeAbonnement} onChange={(e)=>setTypeAbonnement(e.target.value)}>
                <option value="mensuel">Mensuel</option>
                <option value="annuel">Annuel</option>
              </select>
            </div>
          </div>
          <div className="elements">
            <div className="content">
              <label htmlFor="">Prix actuel :</label>
              <input type="number" value={prix} placeholder="Prix actuel" onChange={(e)=>setPrix(e.target.value)} />
            </div>
            <div className="content">
              <label htmlFor="">Prix suivant :</label>
              <input
                type="number"
                onChange={(e)=>setPrixSuivant(e.target.value)}
                value={prixSuivant}
                placeholder="Prix suivant"
              />
            </div>
          </div>
          <div className="elements">
            <div className="content">
                <label htmlFor="">Durée : </label>
                <input type="number" value={duree} placeholder="Durée de l'abonnement" onChange={(e)=>setDuree(e.target.value)} />
            </div>
            <div className="content">

                <button type="submit" className="Ajouterbtn">
                    Modifier le client
                </button>

            </div>
          </div>
        </form>
        </>
        )}

      </div>
    </article>
  );
}
