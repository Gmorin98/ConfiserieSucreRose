import styled from "styled-components";
import React, { useEffect, useState } from 'react';

// Component and Other Import
import BanniereNouveaute from "./BanniereNouveaute";

const ProduitCase = ({children}) => {
  const [clickedButtons, setClickedButtons] = useState({}); // Track which buttons were clicked
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

  const addToCart = (produit, index) => {
    setData((prevData) => {
      const existingProductIndex = prevData.findIndex(item => item._id === produit._id);

      if (existingProductIndex !== -1) {
        const existingProduct = prevData[existingProductIndex];

        if (existingProduct.quantity < produit.inventaire) {
          const updatedProduct = {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
          };
          return [
            ...prevData.slice(0, existingProductIndex),
            updatedProduct,
            ...prevData.slice(existingProductIndex + 1),
          ];
        } else {
          return prevData;
        }
      } else {
        const newProduct = {
          ...produit,
          quantity: 1,
        };

        return [...prevData, newProduct];
      }
    });

    // Trigger the animation for the specific button
    setClickedButtons((prevState) => ({
      ...prevState,
      [index]: true,
    }));

    // Revert the animation state after the animation completes
    setTimeout(() => {
      setClickedButtons((prevState) => ({
        ...prevState,
        [index]: false,
      }));
    }, 2000);  // Adjust the duration to match your animation
  };
  
  return (
    <>
      {children.length === 0 ? (
        <NoResult>
          <p className="noResult">Aucun produit trouvé</p>
        </NoResult>
      ) : (
        children
          .filter(produit => produit.actif) // Filter out inactive products
          .map((produit, id) => (
            <Wrapper key={id}>
              {produit.nouveau && <BanniereNouveaute />}
              <div className="imgContainer">
                <img src={produit.img} alt={produit.nom} loading="lazy"/>
              </div>
              <div className="info">
                <p>{produit.nom}</p>
                <p>{`${produit.prix}$`}</p>
              </div>
              {produit.boutique ? ( 
                <button disabled className="disableButton">En boutique seulement</button>
              ) : produit.inventaire === 0 ? (
                <button disabled className="disableButton">Rupture de Stock</button>
              ) : (
                <button 
                  onClick={() => addToCart(produit, id)} 
                  className={`addToCart ${clickedButtons[id] ? 'transform-active' : ''}`}
                >
                  Ajouter au Panier
                </button>
              )}
            </Wrapper>
          ))
      )}
    </>
  );
  
}

export default ProduitCase;

const NoResult = styled.div`
  p {
    color: var(--primary-color);
    font-size: 2em;
  }
`

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
    transition: background-color 0.3s ease;
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
  
  @media screen and (max-width: 900px) {
    width: 175px;
    margin: 0em 0 3em;;
    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      > p:first-of-type {
        width: 100%;
      }
    }
  }
  
  @keyframes confirmationAdded {
    0% {
      background: var(--background-color);
      color: white;
    }
    50% {
      background: #6FF178;
      color: white;
    }
    100% {
      background: var(--background-color);
      color: var(--primary-color);
    }
  }

  .addToCart.transform-active {
    animation: confirmationAdded 2s linear forwards;
  }
`