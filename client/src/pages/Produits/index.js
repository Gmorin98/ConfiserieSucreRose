// Necessary Import
import styled from "styled-components";
import React, { useState, useEffect } from 'react';

// Component and Other Import
import WarningMessage from "../Components/WarningMessage";
import Filtre from "../Components/Filtre";
import ProduitCase from "../Components/ProduitCase";

const Produits = () => {
  const [filtreInfo, setFiltreInfo] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Starter
  useEffect(() => {
    fetchFiltreInfo();
    fetchProductsInfo();
  }, []);

  // ↓ Products Functions ↓
  // Fetch all the products.
  const fetchProductsInfo = async () => {
    try {
      const response = await fetch(`/getAllProduits/Produits/Produits`);
      if (!response.ok) {
        throw new Error("Failed to fetch Products");
      }
      const allProduitsData = await response.json();
      setAllProducts(allProduitsData.produitsInfo);
    } catch (error) {
      console.error(error);
    }
  }
  
  // ↓ Filter Functions ↓
  // Getting the Section for the Filter.
  const fetchFiltreInfo = async () => {
    try {
      const response = await fetch(`/getFiltre/${"Produits"}`);
      if (!response.ok) {
        throw new Error("Failed to fetch Vrac Filtre");
      }
      const vracFiltreData = await response.json();
      setFiltreInfo(vracFiltreData.filtreInfo);
    } catch (error) {
      console.error(error);
    }
  }

  const handleFilterChange = (option) => {
    setSelectedFilters((prevFilters) => 
      prevFilters.includes(option)
      ? prevFilters.filter(filter => filter !== option)
      :[...prevFilters, option]
    );
  };

  const filterProducts = () => {
    if (selectedFilters.length === 0) {
      return allProducts; // No filter selected, send back the entire catalog.
    }

    return allProducts.filter(product => {
      // Filter products by ensurin all selected filters match the product's tags.
      const tagsMatch = selectedFilters.every(filter => product.tag.includes(filter));
      
      // Handle the price range
      const priceMatch = selectedFilters.some(filter => {
        const [min, max] = filter.split("-").map(price => parseFloat(price.replace("$", "").trim()));
        return product.prix >= min && product.prix <= max;
      });
      return tagsMatch || priceMatch;
    });
  };

  const filteredProducts = filterProducts();

  return (
    <Wrapper>
      <WarningMessage children={"Plus de produits en Boutique!"}/>
      <div className="Content">
        <aside>
          <Filtre children={filtreInfo} selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />
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
    justify-content: space-between;
    .ProduitsShowcase {
      display: flex;
      height: fit-content;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }
  }
`