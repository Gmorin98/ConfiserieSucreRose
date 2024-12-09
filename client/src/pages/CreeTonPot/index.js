// Necessary Import
import styled from "styled-components";
import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { AllFiltreContext } from "../../contexts/AllFiltreContext";
import { AllProduitsContext } from "../../contexts/AllProduitsContext";

// Component and Other Import
import Filtre from "../Components/Filtre";
import WarningMessage from "../Components/WarningMessage";
import SelectionSac from "./SubComponent/selectionSac";
import VracShowcase from "./SubComponent/vracShowcase";
import Confirmation from "./SubComponent/confirmation";

const CreerTonPot = () => {
  const { allVrac } = useContext(AllProduitsContext);
  const { filtreVracInfo } = useContext(AllFiltreContext);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [reset, setReset] = useState(false);
  const [quantiteContenant, setQuantiteContenant] = useState(0);
  // Selection Variable.
  const [sac, setSac] = useState({
    nom: '',
    prix: '',
    img: '',
    quantitePrise: 0,
    quantiteMax: 0,
    bonbonsSelectionne: [],
    quantity: 1
  });

  const handleFilterChange = (option) => {
    setSelectedFilters((prevFilters) => 
      prevFilters.includes(option)
      ? prevFilters.filter(filter => filter !== option)
      :[...prevFilters, option]
    );
  };

  const filteredVrac = () => {
    if (selectedFilters.length === 0) return allVrac;

    return allVrac.filter(vrac => 
      selectedFilters.some(filter => vrac.tag.includes(filter))
    );
  };

  return (
    <>
      {/* Helmet for SEO */}
      <Helmet>
        <title>Confiserie Sucre Rose | Créez Votre Pot de Bonbons Personnalisé</title>
        <meta name="description" content="Créez votre propre pot de bonbons personnalisé avec notre vaste sélection de bonbons en vrac, principalement sucrés et fruités. Sélectionnez la taille du contenant et remplissez-le avec vos bonbons préférés!" />
        <meta name="keywords" content="custom candy jar, create your own candy pot, vrac candy, bulk candy selection, sweet candies, fruity candies, personalized candy container, choose your own candy mix" />
        <meta property="og:title" content="Créez Votre Pot de Bonbons Personnalisé chez Confiserie Sucre Rose" />
        <meta property="og:description" content="Confiserie Sucre Rose vous propose de créer votre pot de bonbons personnalisé à partir d'une sélection de plus de 30 bonbons en vrac, parfait pour tous les amateurs de bonbons sucrés et fruités!" />
        <meta property="og:image" content="images/SUCRE_ROSE_Logo.svg" />
        <meta property="og:url" content="https://www.confiseriesucrerose.ca/creer-ton-pot" />
        <meta name="robots" content="index, follow" />
      </Helmet>
  
      <Wrapper>
        <WarningMessage children={"Plus de produits en Boutique!"}/>
        <div className="content">
          <Filtre children={filtreVracInfo} selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />
          <section>
            <h2 className="etape">Étape 1</h2>
            <p className="explication">Sélectionnez le contenant que vous voulez.</p>
            <p className="explication">Pour six items ou plus, commandez via le bar à bonbons!</p>
            {quantiteContenant >= 6 && 
              <p className="explication avertissement">
                Votre panier contient déjà la quantitée de 6 contenants vrac. Si vous avez besoin de plus, nous vous invitons à faire une commande via le&nbsp;
                <Link to={"/bar-a-bonbons"}>
                  Bar à bonbons
                </Link>
                .
              </p>
            }
            <SelectionSac setSac={setSac} setQuantiteContenant={setQuantiteContenant} />
            <h2 className="etape">Étape 2</h2>
            <p className="explication">Faites votre choix parmi cette vaste sélection de bonbons!</p>
            <VracShowcase vrac={filteredVrac()} setSac={setSac} sac={sac} reset={reset} setReset={setReset} />
            <h2 className="etape">Étape 3</h2>
            <p className="explication">Validez votre/vos choix.</p>
            <Confirmation sac={sac} setSac={setSac} setReset={setReset}/>
          </section>
        </div>
      </Wrapper>
    </>
  );
}

export default CreerTonPot;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  // Making the layout.
  .content {
    display: flex;
    position: relative;
    > section {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
    }
  }
  
  // General stuff for the headers.
  .etape, .explication {
    width: 90%;
    height: fit-content;
    color: var(--primary-color);
    font-size: 1.5em;
    text-align: center;
    font-family: var(--font-primary);
  }

  .explication.avertissement {
    background-color: var(--accent-color);
    color: #FFFFFF;
    border-radius: 10px;
    padding: 0.5em;
    > a {
      color: white;
    }
  }
  
  .etape {
    border-radius: 35px;
    background-color: var(--background-color);
  }
  .etape:not(:first-child) {
    margin-top: 2em;
  }
  
  @media screen and (max-width: 1200px) {
    .content {
      > div {
        position: absolute;
        left: 0;
      }
    }
    .explication {
      font-size: 1em;
    }
  }
`