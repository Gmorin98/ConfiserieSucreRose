// Necessary Import
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  
  // Get all the items from the local storage.
  const panier = JSON.parse(localStorage.getItem('panier')) || [];

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    // Get the session ID
    fetch(`/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
      
    }, []);

    
    if (status === 'open') {
      return (
        <Navigate to="/checkout" />
      )
    }

    
    if (status === 'complete') {
      // Send the confirmation email to the customer.
      const confirmationEmailCustomer = async () => {
        try {
          // Sending user credentials using POST
          const response = await fetch(`/confirmationEmailCustomer`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify() // SEND WHAT YOU NEED HERE
          });

          const data = await response.json();
        } catch (error) {
          console.error('Error:', error);
        }
      };
      // Reduce the Inventory
      const reduceInventory = async () => {
        const filteredPanier = panier.filter(item => item._id !== undefined);
        const dataTransfer = filteredPanier.map(item => {
          return {
            _id: item._id,
            quantity: item.quantity
          };
        });

        try {
          // Sending user credentials using POST
          const response = await fetch(`/pacthUpdateInventory`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataTransfer)
          });

          const data = await response.json();
          console.log('Response data:', data);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      reduceInventory()

      return (
      <Wrapper id="success">
        <div className="contenantCheckmark">
          <p className="checkmark">&#10004;</p>
        </div>
        <div className='information'>
          <p>Nous avons bien reçu votre commande!</p>
          <p>Votre commande sera prête dans un délai de 24 à 48 heures.</p>
          <p>Un email de confirmation sera envoyé à l'address suivante : {customerEmail}</p>
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