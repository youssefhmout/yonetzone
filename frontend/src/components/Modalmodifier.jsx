import { useState , useEffect } from "react"
import { MdOutlineClose } from "react-icons/md";
const  Modalmodifier = ({agent ,setModalagentOpen })=>{
    const [nom , setNom]=useState(agent.name)
    const [email , setEmail]=useState(agent.email) ;
    const [password , setPassword]=useState('') ;
    const [conpassword , setConpassword]=useState('')
    const [errorcon   , seterrorcon]=useState(false)


    const Handlesubmit = (e)=>{
        e.preventDefault();
        if (conpassword !== password) {
            seterrorcon(true)
            return; 
        }

        fetch(("http://localhost:8000/api/agent/modifier") , {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Token")}`,
            },
            body: JSON.stringify({
                id : Number(agent.id) , 
                name : nom ,
                email : email , 
                password : password
            }) 
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            setModalagentOpen(false)
            seterrorcon(false)

        })
        .catch(error => {
            console.error("Erreur :", error);
        });

    }


    return(
      <>
        <form  className='formagent' onSubmit={Handlesubmit}>
        <button type="button" className='close-btn nn' onClick={() => setModalagentOpen(false)}>
            <MdOutlineClose />
        </button>
        <h1>modifier un agent</h1>
          <label htmlFor="">Nom complet :  <span style={{'color' : 'red'}}>*</span></label> <br />
          <input type="text" value={nom}  placeholder="Nom de l'agent" required  onChange={(e)=>setNom(e.target.value)}/> <br />
          <label htmlFor="">Email :<span style={{'color' : 'red'}}>*</span> </label> <br />
          <input type="email" value={email} placeholder='exemple@gmail.com' required onChange={(e)=>setEmail(e.target.value)}/> <br />
          <label htmlFor="">Mot de passe : <span style={{'color' : 'red'}}>*</span></label> <br />
          <input type="password"  value={password} required onChange={(e)=>setPassword(e.target.value)}/> <br />
          <label htmlFor="">Confirmez le mot de passe : <span style={{'color' : 'red'}}>*</span></label> <br />
          <input type="password" value={conpassword} required onChange={(e)=>setConpassword(e.target.value)}/>  <br />
          {errorcon && <p style={{'color': 'red'}}>Le mot de passe e la confirmation ne correspondent pas.</p>}
          {errorcon && <br/>}
          <button type='submit'>modifier</button>
        </form>
      </>
    )
}
export default Modalmodifier ;