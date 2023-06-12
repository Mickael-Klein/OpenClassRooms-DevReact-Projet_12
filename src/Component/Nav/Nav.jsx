import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";

export default function Nav() {
  return (
    <nav className="mainNav">
      <NavLink to="/" className="navLink">
        Accueil
      </NavLink>
      <NavLink to="/profil" className="navLink">
        Profil
      </NavLink>
      <NavLink to="/reglages" className="navLink">
        Réglages
      </NavLink>
      <NavLink to="/communaute" className="navLink">
        Communauté
      </NavLink>
    </nav>
  );
}
