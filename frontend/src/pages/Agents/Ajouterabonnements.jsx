import React from 'react'
import "../../Styles/agent/Ajouterabonnements.css"  ;
import { useState , useEffect } from 'react'
import Navbar from "./Navbar";


export default function Ajouterabonnements() {
    //step 1
    const [step , setStep] = useState(1);
    const [clients , setClients] = useState([]);
    const [loading , setLoading] = useState(true);
    const [client , setClient] = useState(null);
    //step 2
    const [type , setType] = useState("mensuel");
    const [prix_initial , setPrix_initial] = useState(0);
    const [prix_renouvellement , setPrix_renouvellement] = useState(0);
    const [service , setService] = useState({});
    //step 3
    const [duree , setDuree] = useState(0);
    const [date_debut , setDate_debut] = useState("");

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

        const Handleclick=()=>{
            const token = localStorage.getItem("Token");
            fetch("http://127.0.0.1:8000/api/agent/ajouterservice", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                client_id: parseInt(client),
                type: type,
                prix_initial: prix_initial,
                prix_renouvellement: prix_renouvellement
              })
            })
            .then(response => response.json())
            .then(data => {
              console.log("Abonnement ajouté avec succès:", data);
              setService(data.service);
              console.log(service);
              setStep(3);


            })
            .catch(error => {
              console.error("Erreur lors de l'ajout de l'abonnement:", error);
            });
          };

            const Handleconfirm=()=>{
                const token = localStorage.getItem("Token");
                fetch("http://127.0.0.1:8000/api/agent/ajouterabonnement", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify({
                    service_id: parseInt(service.id),
                    client_id: parseInt(client),
                    date_debut: date_debut,
                    duree: Number(duree),
                    ancien_abonnement_id: null 
                  })
                })
                .then(response => response.json())
                .then(data => {
                  console.log("Abonnement ajouté avec succès:", data);
                    alert("Abonnement ajouté avec succès !");
                })
                .catch(error => {
                  console.error("Erreur lors de l'ajout de l'abonnement:", error);
                });
              };

  return (
    <article className='Ajouterabonnements'>
         <Navbar /> 
        <div className="container">
            <h1>Ajouter un abonnement</h1>
            {step === 1 && (
                <div className="card">
                    <h2>Étape 1 : Sélectionner le client</h2>
                    <label htmlFor="">Sélectionner un client :</label>
                    <select onChange={(e)=>setClient(e.target.value)}>
                        {loading ? <option>Loading clients...</option> : clients.map((c)=>(
                            <option key={c.id} value={c.id}>{c.nom_complet} - {c.email}</option>
                        ))}
                    </select>
                    <button disabled={!client} onClick={() => setStep(2)}>Suivant</button>
                </div>  )}

            {step === 2 && (
                <div className="card">
                    <h2>Configuration de l'abonnement</h2>
                    <label htmlFor="">
                        Type d'abonnement :
                    </label>
                    <select onChange={(e)=>setType(e.target.value)}>
                        <option value="mensuel">Mensuel</option>
                        <option value="annuel">Annuel</option>
                    </select>
                    <label htmlFor="">
                        prix initial :
                    </label>
                    <input type="number" placeholder="Prix initial" value={prix_initial} onChange={(e) => setPrix_initial(e.target.value)} />
                    <label htmlFor="">
                        prix renouvellement :
                    </label>
                    <input type="number" placeholder="Prix renouvellement" value={prix_renouvellement} onChange={(e) => setPrix_renouvellement(e.target.value)} />
                    <button onClick={() => setStep(1)}>Retour</button>
                    <button onClick={()=>Handleclick()}>Suivant</button>
                </div>  )}

            {step === 3 && (
                <div className="card">
                    <h2> Création abonnement :</h2>
                    <div>
                    <p>Type : {service.type}</p>
                    <p>Prix initial : {service.prix_initial}</p>
                    <p>Prix renouvellement : {service.prix_renouvellement}</p>
                    <hr />
                    </div>
                    <label htmlFor="">Date debut :</label>
                    <input type="date" value={date_debut} onChange={(e) => setDate_debut(e.target.value)} />
                    <br />
                    <label htmlFor="">
                        Durée {service.type === "mensuel" ? "en mois" : "en années"} : 
                    </label>
                    <input type="number" placeholder={service.type === "mensuel" ? "Durée en mois" : "Durée en années"} value={duree} onChange={(e) => setDuree(e.target.value)} /> <br />
                    <button onClick={() => Handleconfirm()}>Confirmation</button>
                </div>
            )}
        </div>

    </article>
  )
}
