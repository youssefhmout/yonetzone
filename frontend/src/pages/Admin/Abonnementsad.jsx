import React from 'react' ;
import Navbar from './Navbar';
import "../../Styles/agent/Abonnements.css"  ;
import { useState , useEffect } from 'react' ;
import { GrUpdate } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Abonnementsad() {

    const [renouvelerModal, setRenouvelerModal] = useState(false);
    const [abonnements , setAbonnements] = useState([]);
    const [search , setSearch] = useState('');
    const [clean , setclean]=useState('') ;
    const [abonnementRe , setAbonnementRe]=useState({}) ;
    const [refresh , setRefresh]=useState(1) ;
    const navigate = useNavigate();


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
    }, [refresh]);
    const getStatus = (date_fin) => {
  const today = new Date();
  const endDate = new Date(date_fin);
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  if (diffDays < 0) return "expiré"; // expired
  if (diffDays <= 7) return "expire bientôt"; // expiring soon
  return "actif"; // active
};

  const filteredAbonnements = abonnements.filter((abonnement) => 
    getStatus(abonnement.date_fin).toLowerCase().includes(search.toLowerCase())||
    abonnement.client.nom_complet.toLowerCase().includes(search.toLowerCase())||
    abonnement.client.nom_societe.toLowerCase().includes(search.toLowerCase())

  );



  return (
    <article className='abonnements'>
      <Navbar/>
      <div className='container'>
        <h1>Liste des abonnements</h1>
        <div  className='filter'>
            <div className='search'>
                <div className='icon'>
                <FaSearch  />
                </div>
                <input type="text" value={clean} placeholder='Rechercher...' onChange={(e)=>(setSearch(e.target.value), setclean(e.target.value))} />
            </div>
          <div className='buttons'>
              <button className='tous' onClick={() =>( setSearch('') , setclean(''))}>Tous les Abonnements</button>
              <button className='actifs' onClick={() => (setSearch("actif") , setclean(''))}>Abonnements Actifs</button>
              <button className='bientotq' onClick={() => (setSearch("expire bientôt") , setclean(''))}>Abonnements Expire Bientôt</button>
              <button className='expires' onClick={() => (setSearch("expiré") , setclean(''))}>Abonnements Expirés</button>
          </div>
      </div>

        <table className='tab'>
            <thead>
                <tr> 
                    <th>ID </th>
                    <th>Client</th>
                    <th>Société</th>
                    <th>Type</th>
                    <th>Prix unitaire</th>
                    <th>Date de fin</th>
                    <th>Statut</th>
                </tr>
            </thead>
            <tbody>
                {filteredAbonnements.map((abonnement) => (
              
                    <tr key={abonnement.id}>
                        <td><i>#{abonnement.service.id}</i></td>
                        <td>{abonnement.client.nom_complet}</td>
                        <td>{abonnement.client.nom_societe}</td>
                        <td>{abonnement.service.type}</td>
                        <td>{abonnement.prix_unitaire}<i>dh</i></td>
                        <td>{abonnement.date_fin}</td>
                        <td ><span className={getStatus(abonnement.date_fin)}> {getStatus(abonnement.date_fin)}</span> </td>
                        </tr>
              
            ))}
            </tbody>
        </table>
        {renouvelerModal && <Renouveler abonnement={abonnementRe} setRenouvelerModal={setRenouvelerModal} setRefresh={setRefresh} />}

      </div>
    </article>
  )
}
