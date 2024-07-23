// Necessary Import
import React from 'react';
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Components and Other Import


//YOU HAVE TO PUT IN THE FOOTER A LINK TO ICON8.COM FOR THE RIGHT TO USE THEM! LIKE : Icons by Icon8 <-- Link to the website
const NavigationBar = () => {
  return (
    <NavWrapper>
      <NavLink to="/"><img src="images/Logo_Nom.svg" width="250px" id="ShoppingIcon"/></NavLink>
      <NavLink to="/produits">Produits</NavLink>
      <NavLink to="/barbonbon">Bar à Bonbons</NavLink>
      <NavLink to="/creertonpot">Créer ton Pot</NavLink>
      <NavLink to="/checkout"><img src="images/Shopping_Bag.svg" width="50px" /></NavLink>
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
  margin-bottom: 4em;
  a {
    text-decoration: none;
    font-family: var(--font-secondary);
    font-size: 50px;
  }
  
  a:visited, 
  a {
    color: var(--primary-color);
  }
`