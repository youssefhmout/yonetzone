import React from 'react'
import { IoClose } from "react-icons/io5";
import {Link} from "react-router-dom";

export default function Modalclient({client , setModalclientOpen}) {
  return (
    <div className='modalclientdetails'>
      <button onClick={() => setModalclientOpen(false)} className='closebtn'><IoClose /></button>
      <h2>Details du Client</h2>
      <p><strong>Nom Complet:</strong> {client?.nom_complet}</p>
      <p><strong>Société:</strong> {client?.nom_societe}</p>
      <p><strong>Téléphone:</strong> {client?.telephone}</p>
      <p><strong>Email:</strong><a href={`mailto:${client?.email}`}>{client?.email}</a></p>
      <p><strong>Type d'Abonnement:</strong> {client?.type_abonnement}</p>
      <p><strong>Date de Début:</strong> {client?.date_debut}</p>
      <p><strong>Date de Fin:</strong> {client?.date_fin}</p>
      <p><strong>Statut:</strong> {new Date(client?.date_fin) > new Date() ? "Active" : "Inactive"}</p>
      <p><strong>Prix de Début :</strong> {client?.prix}</p>
      <p><strong>Prix Suivant:</strong> {client?.prix_suivant}</p>
      <br />

      <Link to={`/agent/ModifierClient/${client?.id}`} className='editlink'>Modifier</Link>
    </div>
  )
}
