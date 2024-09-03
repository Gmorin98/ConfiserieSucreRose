// Necessary Import
import React, { useCallback } from "react";
import styled from 'styled-components';
import {loadStripe} from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51PuHHbGP8twVSmcReNgv6D58s87HWZMA79MrqPl5cThkGmxQKgClIJby7rzsbl0iqNsTisOf9pNzMg2qxlizxL5q00FxoMhckX");

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
    return fetch("/create-checkout-session", {
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