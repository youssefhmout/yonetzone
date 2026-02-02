


export default function Modalsupprimer({setmodalesupprimer , agent}){
    const Confirmer=()=>{
        const token = localStorage.getItem("Token");
        fetch(`http://localhost:8000/api/agent/supprimer/${agent.id}`, {
            
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("agent supprimé avec succès");
            setmodalesupprimer(false);
        })
        .catch(error => {
            console.error("Erreur lors de la suppression du agent:", error);
        });
    }
    return(
        <div className='modalsupprimerdetails'>
        <h2>Supprimer agent</h2>
        <p>Êtes-vous sûr de vouloir supprimer ce agent ? Cette action est irréversible.</p>
        <div className='buttons'>
            <button className='confirmbtn' onClick={() => Confirmer()}>Confirmer</button>
            <button className='cancelbtn' onClick={() => setmodalesupprimer(false)}>Annuler</button>
        </div>
        </div>
    )
}