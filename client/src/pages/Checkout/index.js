// Necessary Import
import React, { useState } from 'react';
import styled from 'styled-components';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51PuHHbGP8twVSmcReNgv6D58s87HWZMA79MrqPl5cThkGmxQKgClIJby7rzsbl0iqNsTisOf9pNzMg2qxlizxL5q00FxoMhckX');

const Checkout = () => {
  const [agreedPickUp, setAgreedPickUp] = useState(false);
  const [commandConfirmer, setCommandeConfirmer] = useState(false);

  // Get items from local storage and aggregate quantities
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  const panierMap = panier.reduce((acc, produit) => {
    const existingProduit = acc.find(p => p._id === produit._id);
    if (existingProduit) {
      existingProduit.quantite += produit.quantite;
    } else {
      acc.push({ ...produit });
    }
    return acc;
  }, []);

  const [panierItems, setPanierItems] = useState(panierMap);

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

  const handleRemoveItem = (id) => {
    const updatedItems = panierItems.filter(item => item._id !== id);
    setPanierItems(updatedItems);
    
    // Update local storage
    localStorage.setItem('panier', JSON.stringify(updatedItems));
  };

  const handleConfirmOrder = () => {
    // Update local storage or backend as needed
    setCommandeConfirmer(true);
  };

  return (
    <Wrapper>
      {!agreedPickUp ? (
        <div className="confirmation">
          <input
            type='checkbox'
            id='confirmationCheckbox'
          />
          <p>Ramassage de commande en boutique SEULEMENT, en cochant cette case, vous confirmez avoir pris conscience de cette condition.</p>
          <button 
            onClick={confimationPickUp} 
            disabled={agreedPickUp}
          >
            Continuer
          </button>
        </div>
      ) : !commandConfirmer ? (
        <div className='confimationCommande'>
          {panierItems.map((produit) => (
            <div key={produit._id}>
              <img src={produit.img} alt={produit.nom} />
              <p>{produit.nom}</p>
              <p>${produit.prix}</p>
              <p>
                Quantité:
                <button onClick={() => handleQuantityChange(produit._id, -1)} disabled={produit.quantite <= 1 || produit._id === undefined}>-</button>
                {produit.quantity}
                <button onClick={() => handleQuantityChange(produit._id, 1)} disabled={produit._id === undefined || produit.quantity === produit.inventaire} >+</button>
              </p>
              <button className='removeProduits' onClick={() => handleRemoveItem(produit._id)}>X</button>
            </div>
          ))}
          <button onClick={handleConfirmOrder} disabled={panierItems.length === 0}>Confirmer la commande</button>
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </Wrapper>
  );
};

export default Checkout;

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto 2em;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 80px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: var(--primary-color);
  background-color: var(--background-color);

  button {
    cursor: pointer;
  }

  .confirmation {
    display: flex;
  }

  img {
    max-height: 150px;
    max-width: 150px;
  }
`;
