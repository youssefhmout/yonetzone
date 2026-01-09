import React from 'react' ;
import Login from './pages/Login';
import Navbar from './pages/Agents/Navbar';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import TableauDebord from './pages/Agents/TableauDebord';
import Ajouterclient from './pages/Agents/Ajouterclient';
import Clients from './pages/Agents/Clients';
import Bientot from './pages/Agents/Bientot';
import Expires from './pages/Agents/Expires';
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
      </Routes>
    </BrowserRouter>
    </>
  )
}
