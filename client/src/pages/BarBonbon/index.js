// Necessary Import
import styled from "styled-components";
import React, { useState } from 'react';

// Component and Other Import
import WarningMessage from "../Components/WarningMessage";

const BarBonbons = () => {
  const [buttonSubmiting, setButtonSubmiting] = React.useState(true);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    date: '',
    evenement: '',
    extraInfo: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const typeEvent = document.getElementById("event").value;
    const information = document.getElementById("information").value;
  }

  return (
    <Wrapper>
      <WarningMessage children={"Contactez-nous pour réserver votre bar à bonbons!"} />
      <div>
        <p>Carousel ICI</p>
      </div>
      <div className="formulaireWrapper">
        <form>
          <label htmlFor="firstName">Prénom*</label>
          <input name="firstName" id="firstName" type="text" autoComplete="given-name" required/>
          <label htmlFor="lastName">Nom*</label>
          <input name="lastName" id="lastName" type="text" autoComplete="family-name" required/>
          <label htmlFor="email">Email*</label>
          <input name="email" id="email" type="text" autoComplete="email" required/>
          <label htmlFor="phone">Numéro de Téléphone*</label>
          <input name="phone" id="phone" type="text" autoComplete="phone" required/>
          <label htmlFor="date">Date de l'Évènement</label>
          <input name="date" id="date" type="date" />
          <div className="something">
            <label htmlFor="event">Type d'Évènement</label>
            <label htmlFor="event">
              <input type="radio" />
              Mariage
            </label>
            <label htmlFor="event">
              <input type="radio" />
              Corporation
            </label>
            <label htmlFor="event">
              <input type="radio" />
              Fête
            </label>
            <label htmlFor="event">
              <input type="radio" />
              Cadeau
            </label>
            <label htmlFor="event">
              <input type="radio" />
              Autre
            </label>
          </div>
          <label htmlFor="information">Information Pertinente*</label>
          <textarea name="information" id="information" type="text" required/>
          <button id="submitButton" onClick={handleSubmit}>Soumettre!</button>
        </form>
      </div>
    </Wrapper>
  );
}

export default BarBonbons;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-primary);

  .formulaireWrapper {
    width: 50%;
  }

  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  form > input {
    margin-bottom: 20px;
  }

  input,
  textarea {
    border: solid  1px var(--primary-color);
  }

  textarea {
    max-width: 100%;
  }

  .something {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    input {
      margin-right: 10px;
    }
  }

  button {
    width: fit-content;
    font-size: 25px;
    margin: 30px auto;
    padding: 15px 50px;
    border: none;
    border-radius: 10px;
    background-color: var(--background-color);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    cursor: pointer;
  }
`