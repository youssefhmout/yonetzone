import React from "react";
import yonetzone from "../../assets/yonetzone1.png";
import { AiFillHome } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FaTable } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import "../../Styles/agent/Navbaragent.css";

import { useState  , useEffect} from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [role , setrole]=useState('')

    const location = useLocation();
    const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("Token")

    if (!token) {
      navigate('/login')
      return
    }

    fetch("http://127.0.0.1:8000/api/role", {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.role !== 'admin') {
          navigate('/', { replace: true })
        }
      })
      .catch(error => {
        console.error("Erreur role:", error)
        navigate('/login')
      })
  }, [location.pathname, navigate])


  
  return (
    <nav className="nav">
      <div className="image">
        <img src={yonetzone} alt="logo" style={{ width: "60px" }} />
      </div>

      <Link to="/admin/TableauDebord" className={location.pathname === "/admin/TableauDebord" ? "active" : ""}>
        <AiFillHome />
        Tableau de Bord
      </Link>
      <Link to="/admin/agents" className={location.pathname === "/admin/agents" ? "active" : ""}><FaUserGroup /> Agents</Link>
      <Link to="/admin/agent/Ajouter" className={location.pathname === "/admin/agent/Ajouter" ? "active" : ""}><BsFillPersonPlusFill />Ajouter un agent</Link>
      <Link to="/admin/clients" className={location.pathname === "/admin/clients" ? "active" : ""}>
        <FaUsers /> Clients
      </Link>
      <Link to="/admin/abonnements" className={location.pathname === "/admin/abonnements" ? "active" : ""}><FaTable />Tous les abonnements</Link>
      <Link to="/logout" id="Deconnexion">
        <LuLogOut />Déconnexion
      </Link>
    </nav>
  );
}
