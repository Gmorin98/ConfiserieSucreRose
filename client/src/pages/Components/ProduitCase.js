// Necessary Import
import styled from "styled-components";
import React, { useEffect, useState } from 'react';

// Component and Other Import
import BanniereNouveaute from "./BanniereNouveaute";

const ProduitCase = ({children}) => {
  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem('panier');
      return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(data));
  }, [data]);

  const addToCart = (produit) => {
    setData((prevData) => [...prevData, produit]);
  };

  return (
    <>
      {children.map((produit, id) => 
        <Wrapper key={id}>
          {produit.nouveau && <BanniereNouveaute />}
          <div className="imgContainer">
            <img src={produit.img} alt={produit.nom}/>
          </div>
          <div className="info">
            <p>{produit.nom}</p>
            <p>{produit.prix}$</p>
          </div>
          {produit.inventaire === 0 ? (
            <button disabled className="disableButton">Rupture de Stock</button>
          ) : (
            <button onClick={() => addToCart(produit)}>Ajouter au Panier</button>
          )}
        </Wrapper>
      )}
    </>
  );
}

export default ProduitCase;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  background-color: #ffffff;
  width: 250px;
  height: fit-content;
  border-radius: 15px;
  margin: 0em 1.5em 3em;
  font-family: var(--font-primary);
  color: var(--primary-color);
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px,
              rgba(0, 0, 0, 0.09) 0px 4px 2px,
              rgba(0, 0, 0, 0.09) 0px 8px 4px,
              rgba(0, 0, 0, 0.09) 0px 16px 8px,
              rgba(0, 0, 0, 0.09) 0px 32px 16px;

  .imgContainer {
    display: flex;
    align-items: center;
    min-height: 150px;
    > img {
    max-height: 150px;
    padding: 0.5em;
    }
  }


  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5em;

    p {
      margin: 0;
    }

    p:first-of-type {
      width: 70%;
    }
  }

  button {
    width: 100%;
    height: 3em;
    border-radius: 15px;
    color: var(--primary-color);
    border: none;
    background-color: var(--background-color);
    cursor: pointer;
  }

  .banniere {
    color: #ffffff;
    position: absolute;
    top: 10px;
    right: -10px;
  }

  .disableButton {
    cursor: not-allowed;
  }
`