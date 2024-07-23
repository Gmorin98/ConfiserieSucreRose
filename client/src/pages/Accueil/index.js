// Necessary Import
import styled from "styled-components";
import React from 'react';
import { Link } from "react-router-dom";

// Component and Other Import


const Accueil = () => {
  return (
    <Wrapper>
      <img src="images/SUCRE_ROSE_Logo.png" alt="Logo Confiserie Sucre Rose" width="15%"/>
      <section className="temp">
        <Link to={"/creertonpot"}>
          <h2>Créer ton pot à Bonbons!</h2>
        </Link>
        <img src="images/Seperator.svg" height="350px" />
        <Link to={"/barbonbon"}>
          <h2>Bar à Bonbons& Corpo</h2>
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
    font-size: 2em;
    font-family: var(--font-primary);
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