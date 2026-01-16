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

import { useLocation } from "react-router-dom";
import "../../Styles/agent/Navbaragent.css";

import { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="nav">
      <div className="image">
        <img src={yonetzone} alt="logo" style={{ width: "60px" }} />
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
      <Link to="/agent/bientot_expires" className={location.pathname === "/agent/bientot_expires" ? "active" : ""}><IoCalendarSharp />Abonnements bientot expirés</Link>
      <Link to="/agent/expires" className={location.pathname === "/agent/expires" ? "active" : ""}><RiPassExpiredFill />Abonnements expirés</Link>

      <a href="#" id="Deconnexion">
        <LuLogOut />Déconnexion
      </a>
    </nav>
  );
}
