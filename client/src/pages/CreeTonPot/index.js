// Necessary Import
import styled from "styled-components";
import React, { useState, useEffect } from 'react';

// Component and Other Import
import WarningMessage from "../Components/WarningMessage";
import Filtre from "../Components/Filtre";
import VracCase from "../Components/VracCase";

const listSac = [
  {nom: "Petit Cône 125g", prix: "4.50", img: "images/Vrac/Sacs/Cone.png"},
  {nom: "Sac Plastique 175g", prix: "5.50", img: "images/Vrac/Sacs/Sac.png"},
  {nom: "Grand Cône 225g", prix: "6.75", img: "images/Vrac/Sacs/Cone.png"},
  {nom: "Verre 325g", prix: "8.50", img: "images/Vrac/Sacs/Vitre.png"},
  {nom: "Plateau Rond 1500g", prix: "35.00", img: "images/Vrac/Sacs/PlateauCercle.png"},
  {nom: "Plateau Rectangle 2000g", prix: "45.00", img: "images/Vrac/Sacs/PlateauRectangle.png"},
]

const CreerTonPot = () => {
  const [filtreInfo, setFiltreInfo] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [allVrac, setAllVrac] = useState([]);

  // Starter
  useEffect(() => {
    fetchFiltreInfo();
    fetchProductsInfo();
  }, []);

  // ↓ Products Functions ↓
  // Fetch all the products.
  const fetchProductsInfo = async () => {
    try {
      const response = await fetch(`/getAllProduits/Vrac/Vrac`);
      if (!response.ok) {
        throw new Error("Failed to fetch Products");
      }
      const allProduitsData = await response.json();
      setAllVrac(allProduitsData.produitsInfo);
    } catch (error) {
      console.error(error);
    }
  }

  // ↓ Filter Functions ↓
  // Getting the Section for the Filter.
  const fetchFiltreInfo = async () => {
    try {
      const response = await fetch(`/getFiltre/${"Vrac"}`);
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

  const filterVrac = () => {
    if (selectedFilters.length === 0) {
      return allVrac; // No filter selected, send back the entire catalog.
    }

    return allVrac.filter(vrac => {
      // Filter vrac by ensurin all selected filters match the product's tags.
      const tagsMatch = selectedFilters.some(filter => vrac.tag.includes(filter));
      return tagsMatch;
    });
  };

  const filteredVrac = filterVrac();

  return (
    <Wrapper>
      <WarningMessage children={"Plus de produits en Boutique!"}/>
      <div className="content">
        <aside>
          <Filtre children={filtreInfo} selectedFilters={selectedFilters} handleFilterChange={handleFilterChange}/>
        </aside>
        <section>
          <div className="sacSelection">
            <h2 className="etape">Étape 1</h2>
            <p className="explication">Sélectionné le contenant que vous voulez.</p>
            <section>
              {listSac.map((sac, id) => {
                return (
                  <div key={id}>
                    <img src={sac.img} alt={sac.nom} />
                    <p>{sac.nom}</p>
                    <p>{sac.prix}$</p>
                    <button>Sélectionner</button>
                  </div>
                )
              })}
            </section>
          </div>
          <div className="produitsShowcase">
            <h2 className="etape">Étape 2</h2>
            <p className="explication">Sélectionné les bonbons qui vous intéressent!</p>
            <section>
              <VracCase vrac={filteredVrac} />
            </section>
          </div>
          <div className="confirmation">
            <h2 className="etape">Étape 3</h2>
            <p className="explication">Confirmer les bonbons qui ont été sélectionné</p>
            <section>

            </section>
          </div>
        </section>
      </div>
    </Wrapper>
  );
}

export default CreerTonPot;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    display: flex;
    justify-content: space-between;

    section {
      display: flex;
      flex-wrap: wrap;
    }

    .etape {
      width: 100%;
      background-color: var(--background-color);
      border-radius: 35px;
      margin-bottom: 0.75em;
    }

    .etape, .explication {
      font-family: var(--font-primary);
      color: var(--primary-color);
      text-align: center;
      font-size: 1.5em;
    }

    .sacSelection {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 5em;
      font-family: var(--font-primary);
      color: var(--primary-color);

      img {
        height: 150px;
      }

      > section {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 3em;
        div {
          width: 20%;
          min-width: 250px;
          height: fit-content;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 35px;
          background-color: #ffffff;
          margin: 1em 3em;
          box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px,
                      rgba(0, 0, 0, 0.09) 0px 4px 2px,
                      rgba(0, 0, 0, 0.09) 0px 8px 4px,
                      rgba(0, 0, 0, 0.09) 0px 16px 8px,
                      rgba(0, 0, 0, 0.09) 0px 32px 16px;
        }
      }
      button {
        background-color: var(--background-color);
        border: none;
        border-radius: 15px;
        width: 100%;
        height: 3em;
        color: var(--primary-color);
        cursor: pointer;
      }
    }

    .produitsShowcase {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 5em;
      > section {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-bottom: 3em;
      }
    }

    .confirmation {
      width: 100%;
    }
  }
`