
import { useState } from 'react'; 
import Navbar from './Navbar'
import "../../Styles/agent/Clients.css";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Clientsad() {
  const [clients, setClients] = useState([]);
  const [search , setSearch] = useState("");
  const [ModalclientOpen , setModalclientOpen] = useState(false);
  const [client , setClient] = useState(null);
  const [loading , setLoading] = useState(true);
  const [modalesupprimer , setmodalesupprimer] = useState(false);


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
  }, [ModalclientOpen , modalesupprimer]);

  const filteredClients = clients.filter((client) =>
    client.nom_complet.toLowerCase().includes(search.toLowerCase()) ||
    client.nom_societe.toLowerCase().includes(search.toLowerCase()) ||
    client.telephone.toLowerCase().includes(search.toLowerCase())
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
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.nom_complet}</td>
                            <td>{client.nom_societe}</td>
                            <td>{client.telephone}</td>
                            <td>{client.email}</td>
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
          {/* End Modal Client Details */}
          {/* Modal Supprimer Client */}
          {modalesupprimer && (
            <div className='modalesupprimer'>
              <Modalsupprimer client={client} setmodalesupprimer={setmodalesupprimer} />
            </div>
          )}
          {/* End Modal Supprimer Client */}
        </section>
    </article>
  )
}
