// Necessary Import
import styled from "styled-components";
import React from 'react';
import { Link } from "react-router-dom";

// Component and Other Import
import Carrousel from "../Components/Carrousel";

const CarrouselEvenements = [
  {
    id: 1,
    img: "images/Evenements/Chapo.png",
    info: "Du 13 au 15 septembre 2024! Venez fêtez avec nous!"
  },
  {
    id: 2,
    img: "images/Evenements/Marmaille.png",
    info: "5-6 Octobre, au Centre Expo Terrebonne 2475 boulevard des Entreprises Terrebonne, QC J6X 5S5"
  },
  {
    id: 3,
    img: "images/Evenements/Recolte.png",
    info: "Fête des Recoltes à Mascouche le 28 Septembre de 10h à 16h! 33 Hectares (1440, chemin de la Côte-Georges, Mascouche)"
  }
]

const Accueil = () => {
  return (
    <Wrapper>
      <img src="images/SUCRE_ROSE_Logo.svg" alt="Logo Confiserie Sucre Rose" width="15%" className="logo"/>
      <section className="redirection">
        <Link to={"/creer-ton-pot"}>
          <h2>Crée ton pot à bonbons!</h2>
        </Link>
        <img src="images/Seperator.svg" height="400px" />
        <Link to={"/bar-a-bonbons"}>
          <h2>Bar à bonbons & Corpo</h2>
        </Link>
      </section>
      <section className="boutique">
        <h2>Venez nous visiter en Boutique</h2>
        <p>Confiserie chaleureuse et conviviale située au cœur du Vieux-Mascouche.</p>
        <p>Une visite à la Sucre Rose c'est un délice pour les yeux et les papilles!</p>
        <img src="images/maison_sucre_rose.jpeg"/>
        <p className="information">*Accès au stationnement municipal par la rue Dupras</p>
      </section>
      <section className="promotion">
        <h2>Événements et nouveautés</h2>
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

  .boutique {
    display: flex;
    flex-direction: column;
    align-items: center;
    > img {
      max-height: 400px;
      width: fit-content;
      border-radius: 25px;
      border: solid 5px var(--primary-color);
      margin: 30px 0;
    }
  }

  .promotion {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  .information {
    font-size: 0.75em;
  }

  a,
  a:visited {
    text-decoration: none;
    color: var(--primary-color);
  }

  @media screen and (max-width: 1200px) {
    .logo {
      display: none;
    }

    .redirection {
      display: flex;
      flex-direction: column;
      font-size: 2em;
      margin-top: 4em;
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

    .boutique {
      width: 100%;
      text-align: center;
      > p {
        min-width: 300px;
        max-width: 50%;
        font-size: 0.5em;
      } 
    }

    .promotion {
      h2 {
        text-align: center;
      }
    }
  }
`