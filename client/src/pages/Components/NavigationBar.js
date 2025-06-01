import { useState } from 'react';
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {menuOpen && <Overlay onClick={closeMenu} />}
      <NavWrapper>
        <HamburgerMenu onClick={toggleMenu}>
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="#B63643" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 6H21" stroke="#B63643" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 18H21" stroke="#B63643" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </HamburgerMenu>
        <NavLink to="/" className="logo-link">
          <img src="images/Logo_Nom.svg" width="250px" alt="Logo Nom" />
        </NavLink>
        <MenuLinks menuOpen={menuOpen}>
          <NavLink to="/produits" className="options" onClick={closeMenu}>Produits</NavLink>
          <NavLink to="/bar-a-bonbons" className="options" onClick={closeMenu}>Bar à Bonbons</NavLink>
          <NavLink to="/jujube-et-emballage" className="options" onClick={closeMenu}>Jujubes et Emballages</NavLink>
        </MenuLinks>
      </NavWrapper>
    </>
  );
}

export default NavigationBar;

const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100px;
  background-color: var(--background-color);
  border-radius: 0 0 35px 35px;
  box-shadow: 0px 8px 20px #696969;
  margin-bottom: 3em;
  position: relative;
  z-index: 1;

  .logo-link {
    width: fit-content;
    padding-left: 5em;
  }

  @media screen and (max-width: 1200px) {
    display: flex;
    position: sticky;
    top: 0;
    z-index: 50;
    border-radius: 0;
    .logo-link {
      position: relative;
      left: unset;
      transform: unset;
      margin: 0 auto;
      padding-left: 0;
    }
  }
`;

const HamburgerMenu = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 20px;
  z-index: 3;
  fill: red;

  @media screen and (min-width: 1201px) {
    display: none;
  }
`;

const MenuLinks = styled.div`
  display: flex;
  width: 60%;
  a, a:visited {
    margin: auto;
    text-decoration: none;
    font-family: var(--font-secondary);
    font-size: 50px;
    color: var(--primary-color);
  }

  
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    position: absolute;
    gap: 20px;
    top: 0;
    left: 0;
    background-color: var(--background-color);
    width: 250px;
    height: fit-content;
    margin-top: 100px;
    padding-top: 25px;
    transition: transform 0.3s ease-in-out;
    transform: ${({ menuOpen }) => (menuOpen ? 'translateX(0)' : 'translateX(-100%)')};
    z-index: 1;
    border-radius: 0px 0px 10px 0px;

    a, a:visited {
      font-size: 2em;
      margin: 0;
      padding-left: 10px;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;
