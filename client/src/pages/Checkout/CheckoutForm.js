// Necessary Import
import React, { useCallback } from "react";
import styled from 'styled-components';
import {loadStripe} from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_live_51Pv3PZEK95c21YRdzCarcCRd8ESlOjQOuf9qWkpBZdUVpxEJjWzRv9IYeenVrn6wTKDd36jUirARUs0clsvVCY9a00RRJBi2ZQ");

const CheckoutForm = () => {
    // Retrieve the "panier" array from local storage
    const panier = JSON.parse(localStorage.getItem('panier')) || [];

    // Map the panier array to the format expected by your backend
    const items = panier.map(item => ({
      name: item.nom,           // Product name
      price: item.prix,         // Product price (assuming it's in dollars)
      quantity: item.quantity,  // Set quantity to 1, or use item.quantity if available
    }));

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(`${process.env.REACT_APP_API_URL}create-checkout-session`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items })
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = {fetchClientSecret};

  return (
    <Wrapper id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </Wrapper>
  )
}

export default CheckoutForm;

const Wrapper = styled.div`
  width: 100%;
`;