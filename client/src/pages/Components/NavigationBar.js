// Necessary Import
import React from 'react';
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Components and Other Import

const NavigationBar = () => {
  return (
    <NavWrapper>
      <NavLink to="/">Logo</NavLink>
      <NavLink to="/produits">Produits</NavLink>
      <NavLink to="/barbonbon">Bar à Bonbons</NavLink>
      <NavLink to="/creertonpot">Créer ton Pot</NavLink>
    </NavWrapper>
  )
}

export default NavigationBar;

const NavWrapper = styled.nav`
  text-decoration: none;
  a {
    text-decoration: none;
    color: red;
  }
  a:visited {
    color: purple;
  }
`