// Necessary Import
import styled from "styled-components";
import { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AllFiltreContext } from "../../contexts/AllFiltreContext";
import { AllProduitsContext } from "../../contexts/AllProduitsContext";

// Component and Other Import
import Filtre from "../Components/Filtre";
import WarningMessage from "../Components/WarningMessage";
import SelectionSac from "./SubComponent/selectionSac";
import VracShowcase from "./SubComponent/vracShowcase";

const CreerTonPot = () => {
  const { allVrac } = useContext(AllProduitsContext);
  const { filtreVracInfo } = useContext(AllFiltreContext);
  const [selectedFilters, setSelectedFilters] = useState([]);

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
        <title>Confiserie Sucre Rose | Nos Jujubes et Emballages</title>
        <meta name="description" content="Créez votre propre pot de bonbons personnalisé avec notre vaste sélection de bonbons en vrac, principalement sucrés et fruités. Sélectionnez la taille du contenant et remplissez-le avec vos bonbons préférés!" />
        <meta name="keywords" content="custom candy jar, create your own candy pot, vrac candy, bulk candy selection, sweet candies, fruity candies, personalized candy container, choose your own candy mix" />
        <meta property="og:title" content="Créez Votre Pot de Bonbons Personnalisé chez Confiserie Sucre Rose" />
        <meta property="og:description" content="Confiserie Sucre Rose vous propose de créer votre pot de bonbons personnalisé à partir d'une sélection de plus de 30 bonbons en vrac, parfait pour tous les amateurs de bonbons sucrés et fruités!" />
        <meta property="og:image" content="images/SUCRE_ROSE_Logo.svg" />
        <meta property="og:url" content="https://www.confiseriesucrerose.ca/jujube-et-emballage" />
        <meta name="robots" content="index, follow" />
      </Helmet>
  
      <Wrapper>
        <WarningMessage children={"Plus de produits en Boutique!"}/>
        <div className="content">
          <Filtre children={filtreVracInfo} selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />
          <section>
            <h2 className="etape">Emballages</h2>
            <p className="explication">Sélectionnez le contenant que vous voulez.</p>
            <SelectionSac />
            <h2 className="etape">Jujubes</h2>
            <p className="explication">Faites votre choix parmi cette vaste sélection de bonbons!</p>
            <VracShowcase vrac={filteredVrac()} />
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