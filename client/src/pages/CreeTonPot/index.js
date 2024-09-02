// Necessary Import
import styled from "styled-components";
import React, { useState, useContext } from 'react';
import { AllFiltreContext } from "../../contexts/AllFiltreContext";
import { AllProduitsContext } from "../../contexts/AllProduitsContext";

// Component and Other Import
import WarningMessage from "../Components/WarningMessage";
import Filtre from "../Components/Filtre";
import SelectionSac from "./SubComponent/selectionSac";
import VracShowcase from "./SubComponent/vracShowcase";
import Confirmation from "./SubComponent/confirmation";

const CreerTonPot = () => {
  const { allVrac } = useContext(AllProduitsContext);
  const { filtreVracInfo } = useContext(AllFiltreContext);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [reset, setReset] = useState(false);

  // Selection Variable.
  const [sac, setSac] = useState({
    nom: '',
    prix: '',
    img: '',
    quantitePrise: 0,
    quantiteMax: 0,
    bonbonsSelectionne: []
  });

  const handleFilterChange = (option) => {
    setSelectedFilters((prevFilters) => 
      prevFilters.includes(option)
      ? prevFilters.filter(filter => filter !== option)
      :[...prevFilters, option]
    );
  };

  const filterVrac = () => {
    if (selectedFilters.length === 0) {
      return allVrac; // No filter selected, send back the entire catalog.
    }

    return allVrac.filter(vrac => {
      // Filter vrac by ensurin all selected filters match the product's tags.
      return selectedFilters.some(filter => vrac.tag.includes(filter)); // Some is partly and every is EVERYSINGLEONE
    });
  };

  const filteredVrac = filterVrac();

  return (
    <Wrapper>
      <WarningMessage children={"Plus de produits en Boutique!"}/>
      <div className="content">
        <Filtre children={filtreVracInfo} selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />
        <section>
          <h2 className="etape">Étape 1</h2>
          <p className="explication">Sélectionné le contenant que vous voulez.</p>
          <p className="explication">Pour six items ou plus, commander via le bar à bonbons!</p>
          <SelectionSac setSac={setSac} />
          <h2 className="etape">Étape 2</h2>
          <p className="explication">Sélectionné les bonbons qui vous intéressent!</p>
          <VracShowcase vrac={filteredVrac} setSac={setSac} sac={sac} setReset={setReset} reset={reset} />
          <h2 className="etape">Étape 3</h2>
          <p className="explication">Confirmé que vous avez les bons bonbons.</p>
          <Confirmation sac={sac} setSac={setSac} setReset={setReset}/>
        </section>
      </div>
    </Wrapper>
  );
}

export default CreerTonPot;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  // Making the layout.
  .content {
    display: flex;
    > section {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: flex-start;
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
  
  .etape {
    border-radius: 35px;
    background-color: var(--background-color);
  }
  .etape:not(:first-child) {
    margin-top: 2em;
  }

  @media screen and (max-width: 900px) {
    .explication {
      font-size: 1em;
    }
  }
`