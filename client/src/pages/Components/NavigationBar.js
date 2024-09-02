// Necessary Import
import React from 'react';
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Components and Other Import
import PanierCheckout from './PanierCheckout';

const NavigationBar = () => {

  return (
    <NavWrapper>
      <NavLink to="/"><img src="images/Logo_Nom.svg" width="250px" alt="Logo Nom" /></NavLink>
      <NavLink to="/produits" className={"options"}>Produits</NavLink>
      <NavLink to="/bar-a-bonbons" className={"options"}>Bar à Bonbons</NavLink>
      <NavLink to="/creer-ton-pot" className={"options"}>Créer ton Pot</NavLink>
      <NavLink to="/checkout" className={"options"}><PanierCheckout /></NavLink>
    </NavWrapper>
  )
}

export default NavigationBar;

const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100px;
  background-color: var(--background-color);
  border-radius: 0 0 35px 35px;
  box-shadow: 0px 8px 20px #696969;
  margin-bottom: 3em;
  a {
    text-decoration: none;
    font-family: var(--font-secondary);
    font-size: 50px;
  }
  
  a:visited, 
  a {
    color: var(--primary-color);
  }

  // RESPONSIVE DESIGN
  // PHONE
  @media screen and (max-width: 900px) {
    margin-bottom: 0;
    .options {
      display: none;
    }
  }
`