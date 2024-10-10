// Necessary Import
import React, { useState } from 'react';
import styled from 'styled-components';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_live_51Pv3PZEK95c21YRdzCarcCRd8ESlOjQOuf9qWkpBZdUVpxEJjWzRv9IYeenVrn6wTKDd36jUirARUs0clsvVCY9a00RRJBi2ZQ');

const Checkout = () => {
  const [agreedPickUp, setAgreedPickUp] = useState(false);
  const [commandConfirmer, setCommandeConfirmer] = useState(false);

  // Get items from local storage and aggregate quantities
  const panier = JSON.parse(localStorage.getItem('panier')) || [];

  const [panierItems, setPanierItems] = useState(panier);

  const confimationPickUp = () => {
    const confimationCheckbox = document.getElementById("confirmationCheckbox");
    if (confimationCheckbox.checked) {
      setAgreedPickUp(true);
    }
  };

  const handleQuantityChange = (id, change) => {
    const updatedItems = panierItems.map(item => {
      if (item._id === id) {
        const newQuantity = item.quantity + change;
        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : 1 // Prevent negative quantities
        };
      }
      return item;
    });
  
    setPanierItems(updatedItems);
  
    // Update local storage
    localStorage.setItem('panier', JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (id, index) => {
    const updatedItems = panierItems.filter((item, i) => {
      if (item._id) {
        // If the item has an _id, filter based on that
        return item._id !== id;
      } else {
        // If the item doesn't have an _id, filter based on index
        return i !== index;
      }
    });
    
    setPanierItems(updatedItems);
  
    // Update local storage
    localStorage.setItem('panier', JSON.stringify(updatedItems));
  }

  return (
    <Wrapper>
      <div>
        {!agreedPickUp ? (
          <div className="confirmation">
            <div>
              <input
                type='checkbox'
                id='confirmationCheckbox'
              />
              <p>Ramassage de votre commande en boutique SEULEMENT, en cochant cette case, vous confirmez avoir pris connaissance de cette condition.</p>
            </div>
            <button 
              onClick={confimationPickUp} 
              disabled={agreedPickUp}
            >
              Continuer
            </button>
          </div>
        ) : !commandConfirmer ? (
          <div className='confimationCommande'>
            {panierItems.map((produit, index) => (
              <div key={produit._id || index}>
                <div className='infoProduit'>
                  <button className='removeProduits' onClick={() => handleRemoveItem(produit._id, index)}>X</button>
                  <img src={produit.img} alt={produit.nom} loading="lazy"/>
                  <div className='infoGeneral'>
                    <p>{produit.nom}</p>
                    <p>${produit.prix}</p>
                    {produit._id === undefined ? (
                      <p>Quantité: {produit.quantity}</p>
                    ) : (
                      <p>
                        Quantité:
                        <button onClick={() => handleQuantityChange(produit._id, -1)} disabled={produit.quantite <= 1 || produit._id === undefined}>-</button>
                        {produit.quantity}
                        <button onClick={() => handleQuantityChange(produit._id, 1)} disabled={produit._id === undefined || produit.quantity === produit.inventaire} >+</button>
                      </p>
                    )}
                  </div>
                </div>
                  {produit.bonbonsSelectionne ? 
                <div className='bonbonsSelection'>
                  {produit.bonbonsSelectionne.map(bonbon => {
                    return (
                      <div key={bonbon.nom} className='infoBonbons'>
                        <p>{bonbon.nom}</p>
                        <p>{bonbon.quantite}g</p>
                      </div>
                    )
                  })}
                </div> 
              : 
                null}
              </div>
            ))}
            <button onClick={() => setCommandeConfirmer(true)} disabled={panierItems.length === 0} className='confirmationButton'>Confirmez la commande</button>
          </div>
        ) : (
          <Elements stripe={stripePromise}>
            <CheckoutForm className="CheckoutForm"/>
          </Elements>
        )}
      </div>
    </Wrapper>
  );
};

export default Checkout;

const Wrapper = styled.div`
  display: flex;
  min-height: 60vh;
  height: fit-content;
  justify-content: center;
  align-items: center;
  
  > div {
    margin-bottom: 3em;
    padding: 20px;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: var(--primary-color);
    background-color: var(--background-color);
    height: fit-content;
    width: fit-content;
  }

  button {
    cursor: pointer;
  }

  .confirmation {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      max-width: 750px;
      > input[type='checkbox'] {
        min-width: 30px;
        height: 30px;
        cursor: pointer;
        appearance: none; /* Remove default styling */
        border: 2px solid #B63643;
        background-color: #FFFFFF;
        border-radius: 5px;
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;

        &:checked {
          background-color: #B63643;
          border-color: #B63643;
        }

        &:checked::after {
          content: '✔'; /* Checkmark symbol */
          color: white;
          font-size: 1.5em;
        }
      }
      > p {
        font-size: 1.25em;
        text-align: center;
        max-width: 70%;
      }
    }
    > button {
      border: none;
      color: #FFFFFF;
      background-color: var(--primary-color);
      padding: 10px;
      margin-top: 2em;
      border-radius: 10px;
      font-size: 1.25em;
    }
  }

  
  .confimationCommande {
    height: fit-content;
    display: flex;
    flex-direction: column;
    > div {
      display: flex;
      align-items: flex-start;
      position: relative;
      flex-wrap: wrap;
      margin: 1em 0;
      padding: 1em;
      flex-direction: column;
      .infoProduit {
        display: flex;
      }
      p {
        font-size: 1.25em;
      }
      button:not(.removeProduits) {
        background-color: #B63643;
        border: none;
        border-radius: 10px;
        height: fit-content;
        color: #FFFFFF;
        font-weight: bold;
        margin: 0 10px
      }
      .removeProduits {
        position: absolute;
        top: -10px;
        left: -10px;
        height: fit-content;
        background-color: crimson;
        color: #FFFFFF;
        font-weight: bold;
        border: none;
        border-radius: 10px;
      }
    }
    
    .bonbonsSelection {
      .infoBonbons {
        display: flex;
        justify-content: space-between;
        background-color: hsla(354,67%, 90%, 1);
        padding: 0 1em;
        p:first-of-type {
          padding-right: 1em;
        }
      }
      .infoBonbons:nth-child(2n) {
        background-color: var(--background-color);
      }
      .infoBonbons:last-of-type {
        border-radius: 0 0 1em 1em;
      }
      .infoBonbons:first-of-type {
        border-radius: 1em 1em 0 0;
      }
    }

    img {
      max-height: 150px;
      max-width: 150px;
      padding: 10px;
      margin-right: 1em;
      background-color: #FFFFFF;
      border-radius: 10px;
    }
  }

  .confirmationButton {
    background-color: #B63643;
    border: none;
    border-radius: 10px;
    height: fit-content;
    font-size: 1.5em;
    color: #FFFFFF;
    margin: 0.5em auto 0;
    padding: 10px;
  }

  @media screen and (max-width: 900px) {
    margin-top: 3em;
  }

  @media screen and (min-width: 1350px) {
    .CheckoutForm {
      width: 1100px;
    }
  }
`;
