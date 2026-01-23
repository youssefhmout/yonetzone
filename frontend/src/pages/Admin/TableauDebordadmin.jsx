import Navbar from './Navbar';
import { FaCoins } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { BsClipboardXFill } from "react-icons/bs";
import { MdLockClock } from "react-icons/md";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import "../../Styles/agent/Tableauagent.css";

const TableauDebordadmin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBenefices();
  }, []);

  const fetchBenefices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('Token');
      const response = await axios.get('http://127.0.0.1:8000/api/agent/benefices', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de chargement des données');
    } finally {
      setLoading(false);
    }
  };

  // Noms des mois en français
  const moisFrancais = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Préparer les données pour le graphique combiné
  const preparerDonneesGraphique = () => {
    if (!data || !data.monthly_revenues || !data.monthly_clients) return [];

    const donneesCombinées = [];
    
    for (let i = 0; i < 12; i++) {
      const moisData = {
        mois: moisFrancais[i],
        revenues: data.monthly_revenues[i]?.total || 0,
        clients: data.monthly_clients[i]?.total || 0,
        moisNum: i + 1
      };
      donneesCombinées.push(moisData);
    }
    
    return donneesCombinées;
  };

  if (loading) return (
    <article className="tableaudebord">
      <Navbar />
      <div className='container'>
        <div className="loading">Chargement des données...</div>
      </div>
    </article>
  );

  if (error) return (
    <article className="tableaudebord">
      <Navbar />
      <div className='container'>
        <div className="error">{error}</div>
      </div>
    </article>
  );

  const donneesGraphique = preparerDonneesGraphique();
  const moisCourant = moisFrancais[data.current_month - 1];

  return (
    <article className="tableaudebord">
      <Navbar />
      <div className='container'>
        {/* Titre principal */}
        <div className="titre-section">
          <h1>Tableau de Bord </h1>
        </div>

        {/* Cartes de statistiques */}
        <div className="cartes-grid">
          {/* Carte Revenus Totaux */}
          <div className="carte-stat revenus-total">
            <div className="carte-icone"><FaCoins /></div>
            <div className="carte-contenu">
              <h3>Chaiffre d'affaires total</h3>
              <p className="carte-valeur">{data.total_all_time} DH</p>
            </div>
          </div>
          <div className="carte-stat revenus-month">
            <div className="carte-icone"><FaArrowTrendUp /></div>
            <div className="carte-contenu">
              <h3>Chaiffre d'affaires du mois</h3>
              <p className="carte-valeur">{data.total_month} DH</p>
            </div>
          </div>
          {/* Carte Clients Totaux */}
          <div className="carte-stat clients-total">
            <div className="carte-icone"><FaUsers /></div>
            <div className="carte-contenu">
              <h3>Clients Totaux</h3>
              <p className="carte-valeur">{data.clients_all_time}</p>
            </div>
          </div>

          {/* Carte Revenus Annuels */}
          <div className="carte-stat abonnements-total">
            <div className="carte-icone"><FaClipboardList /></div>
            <div className="carte-contenu">
              <h3>Tous les abonnements</h3>
              <p className="carte-valeur">{data.abonnements_active}</p>
            </div>
          </div>
          <div className="carte-stat abonnements-expire">
            <div className="carte-icone"><BsClipboardXFill/></div>
            <div className="carte-contenu">
              <h3>Abonnements expirés</h3>
              <p className="carte-valeur">{data.abonnements_expired_active}</p>
            </div>
          </div>
          <div className="carte-stat abonnements-bientot">
            <div className="carte-icone"><MdLockClock /></div>
            <div className="carte-contenu">
              <h3>Abonnements expirant bientôt</h3>
              <p className="carte-valeur">{data.abonnements_expiring_7_days}</p>
            </div>
          </div>


        </div>
        {/* Contrôles du graphique */}
        <div className="graphique-controls">
          <h2>Évolution Mensuelle</h2>
        </div>

        {/* Graphique combiné */}
        <div className="graphique-section">
          <div className="graphique-container">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={donneesGraphique}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'revenues') return [`${value} DH`, 'Revenus'];
                      if (name === 'clients') return [value, 'Clients'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="revenues" 
                    name="Revenus (DH)" 
                    stroke="#2c6743" 
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{ r: 10 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="clients" 
                    name="Clients" 
                    stroke="#ff7300" 
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    strokeDasharray="5 5"
                  />
                </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tableau des données mensuelles */}
        <div className="tableau-section">
          <h2>Détails Mensuels</h2>
          <div className="tableau-container">
            <table className="tableau-mensuel">
              <thead>
                <tr>
                  <th>Mois</th>
                  <th>Revenus (DH)</th>
                  <th>Clients</th>
                </tr>
              </thead>
              <tbody>
                {donneesGraphique.map((mois, index) => (
                  <tr key={index} className={mois.moisNum === data.current_month ? 'mois-courant-row' : ''}>
                    <td>
                      {mois.mois}
                      {mois.moisNum === data.current_month && <span className="badge-courant">Actuel</span>}
                    </td>
                    <td className={`valeur-revenus ${mois.revenues > 0 ? 'positif' : 'zero'}`}>
                      {mois.revenues} DH
                    </td>
                    <td className={`valeur-clients ${mois.clients > 0 ? 'positif' : 'zero'}`}>
                      {mois.clients}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>{data.total_year} DH</strong></td>
                  <td><strong>{data.clients_year}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Bouton rafraîchir */}
        <button className="bouton-rafraichir" onClick={fetchBenefices}>
         Rafraîchir les Données
        </button>
      </div>
    </article>
  );
};

export default TableauDebordadmin;