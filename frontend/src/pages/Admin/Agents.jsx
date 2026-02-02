
import { useState } from 'react'; 
import Navbar from './Navbar'
import "../../Styles/agent/Clients.css";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modalmodifier from '../../components/Modalmodifier';
import Modalsupprimer from './Modalsupprimer';
export default function Agents() {
  const [search , setSearch] = useState("");
  const [Modalagentopen , setModalagentOpen] = useState(false);
  const [data , setData] = useState([]);
  const [loading , setLoading] = useState(true);
  const [modalesupprimer , setmodalesupprimer] = useState(false);
  const [agent , setAgent]=useState('') ; 

  useEffect(() => {
    const token = localStorage.getItem("Token");
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/agents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setData(data.agents);
      console.log(data)
      setLoading(false);
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des clients:", error);
    });
  }, [Modalagentopen , modalesupprimer]);

  const filteredagents = data.filter((agent) =>
     agent.name.toLowerCase().includes(search.toLowerCase()) ||
    agent.email.toLowerCase().includes(search.toLowerCase()) 
  );
  return (
    <article className='clients'>
        <Navbar/>
        <section className='container'>
            <h1>Liste des Agents </h1>
            <div className='search'>
                <div className='icon'>
                <FaSearch  />
                </div>
                <input type="text" placeholder='Rechercher un agent...' onChange={(e)=>setSearch(e.target.value)} />

            </div>
            {loading ? <p>Loading agents...</p> : (
            
            <table className='table'>
                <thead> 
                    <tr>
                        <th>Nom Complet</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredagents.map((agent) => (
                        <tr key={agent.id}>
                            <td>{agent.name}</td>
                            <td>{agent.email}</td>
                            <td className='actions'>
                              <div className='edit'>
                                  <a href="#" onClick={(e) =>{
                                      e.preventDefault();
                                      setModalagentOpen(true);
                                      setAgent(agent);
                                    }}
                                  ><FaEdit /></a>
                              </div>
                              <div className='deleteclient'>
                                  <a href="#" onClick={(e) => {
                                      e.preventDefault();
                                      setAgent(agent);
                                      setmodalesupprimer(true);
                                    } }>
                                    <MdDelete />
                                </a>
                              </div>
                              </td>
                        </tr>
                    ))}
                </tbody>
            </table> )}

            {/* Modal Client Details */}
            {Modalagentopen && (
              <div className='modalagent'>
                <div className='modalcontent'>
                  <Modalmodifier agent={agent} setModalagentOpen={setModalagentOpen} />
                </div>
              </div>
            )}
          {/* End Modal Client Details */}
          {/* Modal Supprimer Client */}
          {modalesupprimer && (
            <div className='modalesupprimer'>
              <Modalsupprimer agent={agent} setmodalesupprimer={setmodalesupprimer} />
            </div>
          )}
          {/* End Modal Supprimer Client */}
        </section>
    </article>
  )
}
