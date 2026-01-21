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

      <Link to="/admin/TableauDebord" className={location.pathname === "/admin/TableauDebord" ? "active" : ""}>
        <AiFillHome />
        Tableau de Bord
      </Link>
      <Link to="/admin/agents" className={location.pathname === "/admin/agents" ? "active" : ""}><FaUserGroup /> Agents</Link>
      <Link to="/admin/Ajouter/agent" className={location.pathname === "/admin/Ajouter/agent" ? "active" : ""}><BsFillPersonPlusFill />Ajouter un agent</Link>
      <Link to="/admin/clients" className={location.pathname === "/admin/clients" ? "active" : ""}>
        <FaUserGroup /> Clients
      </Link>
      <Link to="/admin/abonnements" className={location.pathname === "/admin/abonnements" ? "active" : ""}><FaTable />Tous les abonnements</Link>
      <Link to="/logout" id="Deconnexion">
        <LuLogOut />Déconnexion
      </Link>
    </nav>
  );
}
