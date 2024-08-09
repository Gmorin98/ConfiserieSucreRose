// Necessary Import
import styled from "styled-components";
import React, { useState } from 'react';

// Component and Other Import
import BanniereNouveaute from "./BanniereNouveaute";

const VracCase = ({vrac}, {setQuantiteSac}) => {
  const initialQuantities = vrac.map(() => 0);
  const [quantitesBonbon, setQuantitesBonbon] = useState(initialQuantities);

  const handleQuantiteChange = (index, change) => {
    setQuantitesBonbon((prevQuantites) => {
      const newQuantites = [...prevQuantites];
      if (newQuantites[index] <= 0 && change < 0) {
        newQuantites[index] = 0; // Prevent negative values
      } else {
        newQuantites[index] += change;
      }
      console.log(newQuantites);
      return newQuantites;
    });
  };

  return (
    <>
      {vrac.map((produit, id) => (
        <Wrapper key={id}>
          {produit.nouveau && <BanniereNouveaute />}
          <img src={produit.img} alt={produit.nom} />
          <p className="nom">{produit.nom}</p>
          {produit.inventaire === 0 ? (
            <div className="quantite">
              <p className="rupture">Rupture de Stock</p>
            </div>
          ) : (
            <div className="quantite">
              <button onClick={() => handleQuantiteChange(id, -25)}>-</button>
              {quantitesBonbon[id]} g
              <button onClick={() => handleQuantiteChange(id, 25)}>+</button>
            </div>
          )}
        </Wrapper>
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
`