// Necessary Import
import styled from "styled-components";
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
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
    if (selectedFilters.length === 0) return allProduits; // No filter selected, send back the entire catalog.

    return allProduits.filter(product => {
      // Filter products by ensurin all selected filters match the product's tags.
      const tagsMatch = selectedFilters.some(filter => product.tag.includes(filter));
      
      // Handle the price range
      const priceMatch = selectedFilters.some(filter => {
        const [min, max] = filter.split("-").map(price => parseFloat(price.replace("$", "").trim()));
        return product.prix >= min && product.prix <= max;
      });
      return tagsMatch || priceMatch;
    })
  };

  const filteredProducts = filterProduits();

  return (
    <>    
      {/* Helmet for SEO */}
      <Helmet>
        <title>Confiserie Sucre Rose | Produits Exotiques</title>
        <meta name="description" content="Explorez une vaste sélection de produits exotiques, des produits faits maison, de bonbons sucrés et fruités, ainsi que de friandises piquantes et funky. Découvrez plus de 50 produits uniques chez Confiserie Sucre Rose." />
        <meta name="keywords" content="bonbons exotique, bonbons importé, bonbons funky, produits fait maison, sucrerie épicée, bonbons fruité, bonbons bizarre, bonbons gourmet, snack unique, bonbons, gélatine, produits exotiques" />
        <meta property="og:title" content="Confiserie Sucre Rose | Produits Exotiques" />
        <meta property="og:description" content="Découvrez des bonbons exotiques, des produits faits maison et des friandises uniques dans la boutique Confiserie Sucre Rose. Nos produits sont parfaits pour les amateurs de bonbons sucrés, piquants et fruités." />
        <meta property="og:image" content="images/SUCRE_ROSE_Logo.svg" />
        <meta property="og:url" content="https://www.confiseriesucrerose.ca/produits" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Wrapper>
        <WarningMessage children={"Plus de produits en Boutique!"}/>
        <div className="Content">
          <Filtre children={filtreProduitInfo} selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />
          <div className="ProduitsShowcase">
            <ProduitCase children={filteredProducts}/>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default Produits;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .Content {
    display: flex;
    position: relative;
    .ProduitsShowcase {
      display: flex;
      height: fit-content;
      flex-wrap: wrap;
      justify-content: space-evenly;
      margin-left: 5em;
      width: 100%;
    }
  }
  
  @media screen and (max-width: 1200px) {
    margin-bottom: 5em;
    .Content {
      > div {
      }
      .ProduitsShowcase {
        margin-left: 0;
      }
    }
  }
`