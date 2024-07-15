// Necessary Import
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

// Components and Other Import

const NavigationBar = () => {
  return (
    <nav>
      <NavLink to="/">Logo</NavLink>
      <NavLink to="produits">Produits</NavLink>
      <NavLink to="/barbonbon">Bar à Bonbons</NavLink>
      <NavLink to="/creertonpot">Créer ton Pot</NavLink>
    </nav>
  )
}

export default NavigationBar;