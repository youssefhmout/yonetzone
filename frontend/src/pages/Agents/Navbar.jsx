import React from "react";
import yonetzone from "../../assets/yonetzone1.png";
import { AiFillHome } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoCalendarSharp } from "react-icons/io5";
import { RiPassExpiredFill } from "react-icons/ri";
import { MdAssignmentAdd } from "react-icons/md";
import { FaTable } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import { useLocation } from "react-router-dom";
import "../../Styles/agent/Navbaragent.css";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const location = useLocation();
  const  [name , setname]= useState('') ;
  const [role , setrole]=useState('') ;
  const navigate = useNavigate() ;


useEffect(() => {
  const token = localStorage.getItem("Token");

  if (!token) {
    navigate("/login", { replace: true });
    return;
  }

  const fetchRole = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/role", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setname(data.name);
      setrole(data.role);

      // Redirect إذا مش agent
      if (data.role !== "agent") {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Erreur role:", error);
      navigate("/", { replace: true });
    }
  };

  fetchRole();
}, []); // 🔹 empty array → run once on mount

  return (
    <nav className="nav">
      <div className="image" style={{'display' : 'flex' , 'flexDirection' :'column' , 'color' : 'white' }}>
        <div>
          <FaUserCircle className="icons"/>
        </div>
        <div className="namelogo">
          {name}
        </div>
        <div className="role">
          {role}
        </div>
      </div>

      <Link to="/agent/TableauDebord" className={location.pathname === "/agent/TableauDebord" ? "active" : ""}>
        <AiFillHome />
        Tableau de Bord
      </Link>
      <Link to="/agent/clients" className={location.pathname === "/agent/clients" ? "active" : ""}>
        <FaUserGroup /> Clients
      </Link>
      <Link to="/agent/Ajouterclient" className={location.pathname === "/agent/Ajouterclient" ? "active" : ""}><BsFillPersonPlusFill />Ajouter un client</Link>
      <Link to="/agent/abonnements/ajouter" className={location.pathname === "/agent/abonnements/ajouter" ? "active" : ""}><MdAssignmentAdd />Ajouter un abonnement</Link>
      <Link to="/agent/abonnements" className={location.pathname === "/agent/abonnements" ? "active" : ""}><FaTable />Tous les abonnements</Link>

      <Link to="/logout" id="Deconnexion">
        <LuLogOut />Déconnexion
      </Link>
    </nav>
  );
}
