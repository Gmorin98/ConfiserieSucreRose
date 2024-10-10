// Necessary Import
import styled from "styled-components";
import React, { useEffect, useState } from 'react';

// Component and Other Import
import BanniereNouveaute from "./BanniereNouveaute";

const VracCase = ({ vrac, setSac, sac, setReset, reset }) => {
  const initialQuantities = vrac.map(() => 0);
  const [quantitesBonbon, setQuantitesBonbon] = useState(initialQuantities);
  
  const handleQuantiteChange = (index, change, bonbonsID, bonbonsNom, bonbonsInventaire) => {
    setQuantitesBonbon((prevQuantites) => {
      const newQuantites = [...prevQuantites];
      const currentQuantite = newQuantites[index] || 0;
      let updatedQuantite = currentQuantite + change;
  
      // Prevent negative quantities.
      updatedQuantite = updatedQuantite < 0 ? 0 : updatedQuantite;
  
      // Ensure the quantity does not exceed the bonbonsInventaire.
      updatedQuantite = updatedQuantite > bonbonsInventaire ? bonbonsInventaire : updatedQuantite;
  
      newQuantites[index] = updatedQuantite;
  
      if (change > 0) {
        // Ensure the bag doesn't get overfilled.
        if (sac.quantitePrise + change > sac.quantiteMax) return prevQuantites;
      }
  
      // Update the sac state
      setSac((prevSac) => {
        const updatedBonbonsSelectionne = [...prevSac.bonbonsSelectionne];
        const bonbonsIndex = updatedBonbonsSelectionne.findIndex(item => item._id === bonbonsID);
  
        if (bonbonsIndex > -1) {
          updatedBonbonsSelectionne[bonbonsIndex].quantite = newQuantites[index];
          if (updatedQuantite === 0) {
            updatedBonbonsSelectionne.splice(bonbonsIndex, 1);
          }
        } else if (updatedQuantite > 0) {
          updatedBonbonsSelectionne.push({ _id: bonbonsID, nom: bonbonsNom, quantite: updatedQuantite });
        }
  
        const totalQuantitePrise = updatedBonbonsSelectionne.reduce((acc, item) => acc + item.quantite, 0);
  
        return {
          ...prevSac,
          quantitePrise: totalQuantitePrise,
          bonbonsSelectionne: updatedBonbonsSelectionne,
        };
      });
  
      return newQuantites;
    });
  };
  

  useEffect(() => {
    if (reset) {
      // Reset the quantitesBonbon state to its initial values
      setQuantitesBonbon(initialQuantities);

      // Set reset back to false after resetting
      setReset(false);
    }
  }, [reset]);

  return (
    <>
      {vrac.map((produit, id) => (
        produit.actif && (  // Only render if produit.actif is true
          <Wrapper key={id}>
            {produit.nouveau && <BanniereNouveaute />}
            <img src={produit.img} alt={produit.nom} loading="lazy"/>
            <p className="nom">{produit.nom}</p>
            {produit.inventaire === 0 ? (
              <div className="quantite">
                <p className="rupture">Rupture de Stock</p>
              </div>
            ) : (
              <div className="quantite">
                <button onClick={() => handleQuantiteChange(id, -25, produit._id, produit.nom, produit.inventaire)}>-</button>
                {quantitesBonbon[id] || 0} g
                <button onClick={() => handleQuantiteChange(id, 25, produit._id, produit.nom, produit.inventaire)}>+</button>
              </div>
            )}
          </Wrapper>
        )
      ))}
    </>
  );
};

export default VracCase;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  width: 15%;
  min-width: 200px;
  height: fit-content;
  border-radius: 15px;
  margin: 2em 1.5em;
  font-family: var(--font-primary);
  color: var(--primary-color);
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, 
              rgba(0, 0, 0, 0.09) 0px 4px 2px, 
              rgba(0, 0, 0, 0.09) 0px 8px 4px, 
              rgba(0, 0, 0, 0.09) 0px 16px 8px, 
              rgba(0, 0, 0, 0.09) 0px 32px 16px;

  > img {
    height: 150px;
    padding: 0.5em;
  }

  .nom {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    padding: 0.5em;
  }

  .quantite {
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: space-evenly;
    align-items: center;
    background-color: var(--background-color);
    border-radius: 15px;

    button {
      width: 20%;
      height: fit-content;
      color: var(--primary-color);
      background-color: var(--background-color);
      font-size: 2em;
      border: none;
      cursor: pointer;
    }
    
    p {
      padding: 0.5em;
      cursor: not-allowed;
    }
  }

  @media screen and (max-width: 900px) {
    margin: 10px;
    width: 150px;
    min-width: 175px;
  }
`