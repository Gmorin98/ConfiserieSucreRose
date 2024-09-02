// Necessary Import
import styled from "styled-components";
import React, { useContext, useState } from 'react';
import { AllFiltreContext } from "../../contexts/AllFiltreContext";
import { AllProduitsContext } from "../../contexts/AllProduitsContext";

// Component and Other Import
import WarningMessage from "../Components/WarningMessage";
import Filtre from "../Components/Filtre";
import ProduitCase from "../Components/ProduitCase";

const Produits = () => {
  const { allProduits } = useContext(AllProduitsContext);
  const { filtreProduitInfo } = useContext(AllFiltreContext);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (option) => {
    setSelectedFilters((prevFilters) => 
      prevFilters.includes(option)
      ? prevFilters.filter(filter => filter !== option)
      :[...prevFilters, option]
    );
  };

  const filterProduits = () => {
    if (selectedFilters.length === 0) {
      return allProduits; // No filter selected, send back the entire catalog.
    }

    return allProduits.filter(product => {
      // Filter products by ensurin all selected filters match the product's tags.
      const tagsMatch = selectedFilters.some(filter => product.tag.includes(filter));
      
      // Handle the price range
      const priceMatch = selectedFilters.some(filter => {
        const [min, max] = filter.split("-").map(price => parseFloat(price.replace("$", "").trim()));
        return product.prix >= min && product.prix <= max;
      });
      return tagsMatch || priceMatch;
    });
  };

  const filteredProducts = filterProduits();

  return (
    <Wrapper>
      <WarningMessage children={"Plus de produits en Boutique!"}/>
      <div className="Content">
        <aside>
          <Filtre children={filtreProduitInfo} selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />
        </aside>
        <div className="ProduitsShowcase">
          <ProduitCase children={filteredProducts}/>
        </div>
      </div>
    </Wrapper>
  );
}

export default Produits;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .Content {
    display: flex;
    .ProduitsShowcase {
      display: flex;
      height: fit-content;
      flex-wrap: wrap;
      justify-content: space-evenly;
      margin-left: 5em;
      width: 100%;
    }
  }

  @media screen and (max-width: 900px) {
    .Content {
      .ProduitsShowcase {
        margin-left: 0;
      }
    }
  }
`