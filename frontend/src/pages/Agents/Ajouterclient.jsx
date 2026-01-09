import React from "react";
import Navbar from "./Navbar";
import "../../Styles/agent/Ajouterclient.css";

export default function Ajouterclient() {
  return (
    <article className="Ajouterclient">
      <Navbar />
      <div className="container">
        <h1 className="title">Ajouter un client</h1>
        <form className="formajouterclient">
          <div className="elements">
            <div className="content">
              <label>Nom complet :</label>
              <input
                type="text"
                placeholder="Nom complet du client"
                name="nom"
              />
            </div>
            <div className="content">
              <label>Nom société :</label>
              <input
                type="text"
                placeholder="Nom de la société"
                name="nom_societe"
              />
            </div>
          </div>
          <div className="elements">
            <div className="content">
              <label>Email :</label>
              <input type="email" placeholder="Email du client" name="email" />
            </div>
            <div className="content">
              <label>Téléphone :</label>
              <input
                type="tel"
                placeholder="Téléphone du client"
                name="telephone"
              />
            </div>
          </div>
          <div className="elements">
            <div className="content">
              <label htmlFor="">date debut abonnement :</label>
              <input type="date" name="date_debut" />
            </div>
            <div className="content">
              <label htmlFor="">Type d'abonnement :</label>
              <select name="type_abonnement">
                <option value="mensuel">Mensuel</option>
                <option value="annuel">Annuel</option>
              </select>
            </div>
          </div>
          <div className="elements">
            <div className="content">
              <label htmlFor="">Prix actuel :</label>
              <input type="number" name="prix" placeholder="Prix actuel" />
            </div>
            <div className="content">
              <label htmlFor="">Prix suivant :</label>
              <input
                type="number"
                name="prix_suivant"
                placeholder="Prix suivant"
              />
            </div>
          </div>
          <div className="elements">
            <div className="content">
                <label htmlFor="">Durée : </label>
                <input type="number" name="duree" placeholder="Durée de l'abonnement" />
            </div>
            <div className="content">

                <button type="submit" className="Ajouterbtn">
                    Ajouter le client
                </button>

            </div>
          </div>
        </form>
      </div>
    </article>
  );
}
