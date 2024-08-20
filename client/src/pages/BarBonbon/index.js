import styled from "styled-components";
import React, { useState } from 'react';

import WarningMessage from "../Components/WarningMessage";
import Checkbox from "../Components/Checkbox";
import Carrousel from "../Components/Carrousel";
import { CarrouselBarBonbons } from "../Components/DataTemp";

const typeEvenement = ["Mariage", "Corporation", "Fête", "Cadeau", "Autre"];

const BarBonbons = () => {
  // All the info in this object
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    date: '',
    evenement: [],
    extraInfo: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevState) => {
      if (checked) {
        return { ...prevState, evenement: [...prevState.evenement, value] };
      } else {
        return {
          ...prevState,
          evenement: prevState.evenement.filter((e) => e !== value),
        };
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data here
    console.log(formData);
  };

  return (
    <Wrapper>
      <WarningMessage children={"Contactez-nous pour réserver votre bar à bonbons!"} />
      <Carrousel children={CarrouselBarBonbons}/>
      <div className="formulaireWrapper">
        <form onSubmit={handleSubmit}>
          <label htmlFor="prenom">Prénom*</label>
          <input
            name="prenom"
            id="prenom"
            type="text"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
          <label htmlFor="nom">Nom*</label>
          <input
            name="nom"
            id="nom"
            type="text"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email*</label>
          <input
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="telephone">Numéro de Téléphone*</label>
          <input
            name="telephone"
            id="telephone"
            type="tel"
            value={formData.telephone}
            onChange={handleChange}
            required
          />
          <label htmlFor="date">Date de l'Évènement</label>
          <input
            name="date"
            id="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
          <div className="something">
            <label>Type d'Évènement</label>
            {typeEvenement.map((option, id) => (
              <Checkbox
                key={id}
                label={option}
                value={option}
                onChange={handleCheckboxChange}
                children={option}
              />
            ))}
          </div>
          <label htmlFor="extraInfo">Information Pertinente*</label>
          <textarea
            name="extraInfo"
            id="extraInfo"
            value={formData.extraInfo}
            onChange={handleChange}
            required
          />
          <button type="submit">Soumettre!</button>
        </form>
      </div>
    </Wrapper>
  );
};

export default BarBonbons;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-primary);

  .formulaireWrapper {
    width: 50%;
    form {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

      input {
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
        margin: 30px auto;
        padding: 15px 50px;
        font-size: 1.5em;
        border: none;
        border-radius: 10px;
        background-color: var(--background-color);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 900px) {
    .formulaireWrapper {
      width: 80%;
    }
  }
`;
