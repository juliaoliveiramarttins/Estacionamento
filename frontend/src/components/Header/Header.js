import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Importando o arquivo CSS

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          {/* Links para Proprietários */}
          <li className="nav-item">
            <NavLink 
              to="/proprietario" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Listar Proprietários
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/addProprietario" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Adicionar Proprietário
            </NavLink>
          </li>

          {/* Links para Veículos */}
          <li className="nav-item">
            <NavLink 
              to="/veiculos" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Listar Veículos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/addVeiculo" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              Adicionar Veículo
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
