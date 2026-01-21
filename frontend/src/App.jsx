import React from 'react' ;
import Login from './pages/Login';
import Navbar from './pages/Agents/Navbar';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import TableauDebord from './pages/Agents/TableauDebord';
import Ajouterclient from './pages/Agents/Ajouterclient';
import Clients from './pages/Agents/Clients';
import Bientot from './pages/Agents/Bientot';
import Expires from './pages/Agents/Expires';
import Ajouterabonnements from './pages/Agents/Ajouterabonnements';
import Abonnements from './pages/Agents/Abonnements';
import Logout from './components/logout'
import Infoabonnement from './pages/Agents/Infoabonnement';
export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/agent/tableaudebord' element={<TableauDebord/>} />
        <Route path='/agent/Ajouterclient' element={<Ajouterclient/>} />
        <Route path='/agent/clients' element={<Clients/>} />
        <Route path='/agent/bientot_expires' element={<Bientot />} />
        <Route path='/agent/expires' element={<Expires/>} />
        <Route path='/agent/abonnements/ajouter' element={<Ajouterabonnements/>} />
        <Route path='/agent/abonnements' element={<Abonnements/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/agent/abonnement/:client_id/:service_id' element={<Infoabonnement />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
