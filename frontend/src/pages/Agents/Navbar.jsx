import React from 'react';
import { IoMdMenu } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { LuLogOut } from "react-icons/lu";
import "../../Styles/Navbaragent.css";

import { useState } from 'react';


export default function Navbar() {
    const [closeclients , setcloseclients]=useState(true)
  return (
    <nav className='navagent'>
        <h3>yonetzone</h3>

        <a href="#" className='tableau'><IoMdMenu />TableauDebord</a> 
        <div>
        <a href="#" className='clients'  onClick={()=>setcloseclients(!closeclients)}><FaUserGroup/> Clients {closeclients ? <SlArrowDown/> : <SlArrowUp/> }</a> <br />
            {!closeclients && (
                <div>
                    <a href="#">Tous les clients</a> <br />
                    <a href="#">Ajouter un client</a> <br />
                    <a href="#">Abonnements bientot expirés</a> <br />
                    <a href="#">Abonnements expirés</a>
                </div>
            )}              
        </div>


        <a href="#" id='Deconnexion'><LuLogOut/> Déconnexion</a>

    </nav>
  )
}