
import { useState } from 'react'; 
import Navbar from './Navbar'
import "../../Styles/agent/Clients.css";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import Modalclient from './Modalclient';
export default function Clients() {
  const [clients, setClients] = useState([]);
  const [search , setSearch] = useState("");
  const [ModalclientOpen , setModalclientOpen] = useState(false);
  const [client , setClient] = useState(null);
  const [loading , setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("Token");
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/agent/clients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setClients(data.clients);
      setLoading(false);
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des clients:", error);
    });
  }, []);

  const filteredClients = clients.filter((client) =>
    client.nom_complet.toLowerCase().includes(search.toLowerCase()) ||
    client.nom_societe.toLowerCase().includes(search.toLowerCase()) ||
    client.telephone.toLowerCase().includes(search.toLowerCase()) ||
    client.type_abonnement.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <article className='clients'>
        <Navbar/>
        <section className='container'>
            <h1>Liste des Clients</h1>
            <div className='search'>
                <div className='icon'>
                <FaSearch  />
                </div>
                <input type="text" placeholder='Rechercher un client...' onChange={(e)=>setSearch(e.target.value)} />

            </div>
            {loading ? <p>Loading clients...</p> : (
            
            <table className='table'>
                <thead> 
                    <tr>
                        <th>Nom Complet</th>
                        <th>Société</th>
                        <th>Téléphone</th>
                        <th>Type d'abonnement</th>
                        <th>Date de fin</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.nom_complet}</td>
                            <td>{client.nom_societe}</td>
                            <td>{client.telephone}</td>
                            <td>{client.type_abonnement}</td>
                            <td>{client.date_fin}</td>
                            <td ><div className={new Date(client.date_fin) > new Date() ? "Actif" : "Inactif"}>{new Date(client.date_fin) > new Date() ? "Active" : "Inactive"}</div></td>
                            <td className='actions'>
                              <div className='edit'>
                                  <Link to={`/agent/ModifierClient/${client.id}`}><FaEdit /></Link>
                              </div>
                              <div className='visibility'>
                                  <a href="#" onClick={(e) =>{
                                      e.preventDefault();
                                      setModalclientOpen(true);
                                      setClient(client);
                                    }}
                                  ><MdVisibility /></a>
                              </div>
                              </td>
                        </tr>
                    ))}
                </tbody>
            </table> )}

            {/* Modal Client Details */}
            {ModalclientOpen && (
              <div className='modalclient'>
                <div className='modalcontent'>
                  <Modalclient client={client} setModalclientOpen={setModalclientOpen} />
                </div>
              </div>
            )}
        </section>
    </article>
  )
}
