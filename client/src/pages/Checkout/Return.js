import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [sessionId, setSessionId] = useState(''); // Add state for sessionId

  const panier = JSON.parse(localStorage.getItem('panier')) || [];

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionIdFromUrl = urlParams.get('session_id'); // Get sessionId from URL

    if (sessionIdFromUrl) {
      setSessionId(sessionIdFromUrl); // Store sessionId in state

      // Fetch session data from backend
      fetch(`${process.env.REACT_APP_API_URL}session-status?session_id=${sessionIdFromUrl}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          setCustomerEmail(data.customer_email);
          setCustomerName(data.customer_name);
          setCustomerPhone(data.customer_phone);
          setOrderNumber(data.orderNumber);
        });
    }
  }, []); // Dependency array left empty to run only on mount

  if (status === 'open') {
    return (
      <Navigate to="/checkout" />
    );
  }

  if (status === 'complete') {
    const panierWithoutImg = panier.map(({ img, ...rest }) => rest);
    const data = {
      panierWithoutImg,
      customerEmail,
      customerName,
      customerPhone,
      orderNumber,
      sessionId, // Now using the sessionId from state
    };

    const envoieCommande = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}orderSent`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const confirmationEmailCustomer = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}confirmationEmailCustomer`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const reduceInventory = async () => {
      const items = panier.flatMap(item => {
        if (item._id === undefined) {
          return item.bonbonsSelectionne.map(bonbon => ({
            _id: bonbon.id,
            quantity: bonbon.quantite,
            origin: "Vrac",
          }));
        }
        return {
          _id: item._id,
          quantity: item.quantity,
          origin: "Produit",
        };
      });

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}pacthUpdateInventory`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(items),
        });
        const data = await response.json();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    envoieCommande();
    confirmationEmailCustomer();
    reduceInventory();
    localStorage.clear();

    return (
      <Wrapper id="success">
        <div className="contenantCheckmark">
          <p className="checkmark">&#10004;</p>
        </div>
        <div className="information">
          <p>Nous avons bien reçu votre commande!</p>
          <p>Elle sera prête dans un délai de 24 à 48 heures</p>
          <p>Une confirmation vous sera envoyée à l'adresse suivante: {customerEmail}</p>
          <p>Veuillez noter que ce site est nouvellement en ligne, si vous ne recevez pas votre confirmation de commande par courriel, veuillez contacter la confiserie au 514-730-0259</p>
        </div>
      </Wrapper>
    );
  }

  return null;
};

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
`;
