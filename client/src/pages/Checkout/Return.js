// Necessary Import
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  
  // Get all the items from the local storage.
  const panier = JSON.parse(localStorage.getItem('panier')) || [];

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    // Get the session ID
    fetch(`${process.env.REACT_APP_API_URL}session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        setOrderNumber(data.orderNumber);
      });
    }, []);

    
    if (status === 'open') {
      return (
        <Navigate to="/checkout" />
      )
    }


    if (status === 'complete') {
      // Send the order to the merchant.
      const envoieCommande = async () => {
        const panierWithoutImg = panier.map(({ img, ...rest }) => rest);
        const data = {
          panierWithoutImg,
          customerEmail
        }
        try {
          // Sending user credentials using POST
          const response = await fetch(`${process.env.REACT_APP_API_URL}orderSent`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
  
          const result = await response.json();
        } catch (error) {
          console.error('Error:', error);
        }
      }

      // Send the confirmation email to the customer.
      const confirmationEmailCustomer = async () => {
        const panierWithoutImg = panier.map(({ img, ...rest }) => rest);
        const data = {
          panierWithoutImg,
          customerEmail,
          orderNumber
        }
        
        try {
          // Sending user credentials using POST
          const response = await fetch(`${process.env.REACT_APP_API_URL}confirmationEmailCustomer`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          const result = await response.json();
        } catch (error) {
          console.error('Error:', error);
        }
      };

      // Reduce the Inventory
      const reduceInventory = async () => {
        const items = panier.flatMap(item => {
          if (item._id === undefined) {
            return item.bonbonsSelectionne.map(bonbon => ({
              _id: bonbon.id,
              quantity: bonbon.quantite,
              origin: "Vrac"
            }));
          }
          return {
            _id: item._id,
            quantity: item.quantity,
            origin: "Produit"
          };
        });
        
        try {
          // Sending user credentials using POST
          const response = await fetch(`${process.env.REACT_APP_API_URL}pacthUpdateInventory`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(items)
          });
      
          const data = await response.json();
        } catch (error) {
          console.error('Error:', error);
        }
      };

      envoieCommande()
      confirmationEmailCustomer()
      reduceInventory()
      // Empty the localStorage.
      localStorage.clear();

      return (
      <Wrapper id="success">
        <div className="contenantCheckmark">
          <p className="checkmark">&#10004;</p>
        </div>
        <div className='information'>
          <p>Nous avons bien reçu votre commande!</p>
          <p>Elle sera prête dans un délai de 24 à 48 heures</p>
          <p>Une confirmation vous sera envoyée à l'adresse suivante: {customerEmail}</p>
        </div>
      </Wrapper>
    )
  }

  return null;
}

export default Return;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;

  .contenantCheckmark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background-color: limegreen;
    border-radius: 50%;
    .checkmark {
      font-size: 3em;
      color: white;
    }
  }

  .information {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--background-color);
    padding: 1em;
    border-radius: 10px;
    margin-top: 2em;
    p {
      color: var(--primary-color);
      font-size: 1.25em;
    }
  }
`