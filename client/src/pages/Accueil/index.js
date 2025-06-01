// Necessary Import
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";

// Component and Other Import
import Carrousel from "../Components/Carrousel";

const Accueil = () => {
  const [carrouselEvenements, setCarrouselEvenements] = useState([]);

  useEffect (() => {
    const fetchEvenementInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}getEvenement`);
        if (!response.ok) {
          throw new Error("Failed to fetch the Evenement Info");
        }
        const allEvenementData = await response.json();
        setCarrouselEvenements(allEvenementData.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvenementInfo();
  }, []);

  return (
    <Wrapper>
      {/* Helmet for SEO */}
      <Helmet>
        <title>Confiserie Sucre Rose | Boutique de Bonbons et Délices Faits Maison</title>
        <meta name="description" content="Découvrez Confiserie Sucre Rose, votre boutique de bonbons avec une sélection de friandises exotiques, des délices faits maison comme le fudge et le sucre à la crème. Créez votre pot personnalisé ou commandez un bar à bonbons pour vos événements." />
        <meta name="keywords" content="confiserie, bonbons exotiques, fudge, sucre à la crème, tire-éponge, bonbons, candy bar, événements, boutique Vieux-Mascouche, bar à bonbons, bonbons vrac, sucrerie, Vrac & Cie" />
        <meta property="og:title" content="Confiserie Sucre Rose | Votre Boutique de Bonbons à Mascouche" />
        <meta property="og:description" content="Venez visiter la Confiserie Sucre Rose à Mascouche pour des bonbons exotiques, des délices faits maison et des bar à bonbons personnalisés pour tous vos événements." />
        <meta property="og:image" content="images/SUCRE_ROSE_Logo.svg" />
        <meta property="og:url" content="https://www.confiseriesucrerose.ca/" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <img src="images/SUCRE_ROSE_Logo.svg" alt="Logo Confiserie Sucre Rose" width="15%" className="logo" loading="lazy"/>
      <section className="redirection">
        <Link to={"/jujube-et-emballage"}>
          <h2>Nos Jujubes et Emballages!</h2>
        </Link>
        <img src="images/Seperator.svg" height="400px" loading="lazy" alt="Seperator"/>
        <Link to={"/bar-a-bonbons"}>
          <h2>Bar à bonbons & Corpo</h2>
        </Link>
      </section>
      <section className="boutique">
        <h2>Venez nous visiter en Boutique</h2>
        <p>Confiserie chaleureuse et conviviale située au cœur du Vieux-Mascouche.</p>
        <p>Une visite à la Sucre Rose c'est un délice pour les yeux et les papilles!</p>
        <img src="images/maison_sucre_rose.jpeg" loading="lazy" alt="Boutique Sucre Rose"/>
        <p className="information">*Accès au stationnement municipal par la rue Dupras</p>
      </section>
      <section className="promotion">
        <h2>Événements et nouveautés</h2>
        <Carrousel children={carrouselEvenements}/>
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
      width: 22.5%;
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
    align-items: center;
    width: 100%;
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