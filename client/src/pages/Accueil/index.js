// Necessary Import
import styled from "styled-components";
import React from 'react';
import { Link } from "react-router-dom";

// Component and Other Import
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";

const Accueil = () => {
  return (
    <Wrapper>
      <img src="images/SUCRE_ROSE_Logo.svg" alt="Logo Confiserie Sucre Rose" width="15%"/>
      <section className="temp">
        <Link to={"/creertonpot"}>
          <h2>Créer ton pot à Bonbons!</h2>
        </Link>
        <img src="images/Seperator.svg" height="400px" />
        <Link to={"/barbonbon"}>
          <h2>Bar à Bonbons & Corpo</h2>
        </Link>
      </section>
      <section className="promotion">
        <h2>Évènements et Nouveautés</h2>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </section>
    </Wrapper>
  );
}

export default Accueil;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  section {
    display: flex;
    color: var(--primary-color);
    font-size: 2.25em;
    font-family: var(--font-primary);
  }

  .temp {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    img {
      margin: 50px;
    }
    a {
      width: 20%;
    }
  }

  .promotion {
    flex-direction: column;
    align-items: center;
    div {
      width: 40%;
      font-size: 25px;
      border-radius: 35px;
      background-color: var(--background-color);
      padding: 10px;
      p {
        text-align: center;
      }
    }
  }

  a,
  a:visited {
    text-decoration: none;
    color: var(--primary-color);
  }
`