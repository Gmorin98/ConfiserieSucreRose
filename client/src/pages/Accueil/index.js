// Necessary Import
import styled from "styled-components";
import React from 'react';
import { Link } from "react-router-dom";

// Component and Other Import
import Carrousel from "../Components/Carrousel";
import { CarrouselEvenements } from "../Components/DataTemp";

const Accueil = () => {
  return (
    <Wrapper>
      <img src="images/SUCRE_ROSE_Logo.svg" alt="Logo Confiserie Sucre Rose" width="15%" className="logo"/>
      <section className="redirection">
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
        <Carrousel children={CarrouselEvenements}/>
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
    color: var(--primary-color);
    font-size: 2.25em;
    font-family: var(--font-primary);
    margin-bottom: 3em;
  }

  .redirection {
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
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  a,
  a:visited {
    text-decoration: none;
    color: var(--primary-color);
  }

  @media screen and (max-width: 900px) {
    .logo {
      display: none;
    }

    .redirection {
      display: flex;
      flex-direction: column;
      margin-top: 150px;
      margin-bottom: 150px;
      a {
        width: 80%;
      }

      img {
        margin: 0;
        transform: rotate(90deg);
        margin-top: -150px;
        margin-bottom: -150px;
      }
    }

    .promotion {
      h2 {
        text-align: center;
      }
    }
  }
`