// Necessary Import
import styled from "styled-components";
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

// Component and Other Import
import WarningMessage from "../Components/WarningMessage";
import Checkbox from "../Components/Checkbox";
import Carrousel from "../Components/Carrousel";

const typeEvenement = ["Mariage", "Corporation", "Fête", "Cadeau", "Autre"];
const CarrouselBarBonbons = [
  {
    id: 1,
    img: "images/BarABonbons/Bar_Bonbons_Bas.jpg",
  },
  {
    id: 2,
    img: "images/BarABonbons/Bar_Bonbons_Chaise.jpg",
  },
  {
    id: 3,
    img: "images/BarABonbons/Bar_Bonbons_Haut.jpg",
  },
  {
    id: 4,
    img: "images/BarABonbons/Meuble_Bonbons_Haut.jpg",
  },
  {
    id: 5,
    img: "images/BarABonbons/Meuble_Vide.jpg",
  }
]

const BarABonbons = () => {
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
  const [statusResponse, setStatusResponse] = useState();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Sending user credentials using POST
      const response = await fetch(`${process.env.REACT_APP_API_URL}contactBarBonbon`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.status === 200) {
        setStatusResponse(true);
      } else {
        setStatusResponse(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Wrapper>
      {/* Helmet for SEO */}
      <Helmet>
        <title>Contactez-nous | Bar à Bonbons - Sucre Rose</title>
        <meta name="description" content="Réservez votre bar à bonbons pour votre événement : mariage, fête d'entreprise, anniversaire, ou tout autre événement spécial. Contactez Sucre Rose pour plus d'informations ou une commande." />
        <meta name="keywords" content="bar à bonbons, mariage, événement d'entreprise, fête, anniversaire, candy bar, réservation, contact, bonbons, information" />
        <meta property="og:title" content="Confiserie Sucre Rose | Bar à Bonbons" />
        <meta property="og:description" content="Organisez un bar à bonbons unique pour vos événements spéciaux tels que les mariages, événements d'entreprise, et fêtes. Contactez-nous dès aujourd'hui pour réserver." />
        <meta property="og:image" content="images/BarABonbons/Bar_Bonbons_Bas.jpg" />
        <meta property="og:url" content="https://www.confiseriesucrerose.ca/contact-bar-a-bonbons" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <WarningMessage children={"Contactez-nous pour réserver votre bar à bonbons!"} />
      <Carrousel children={CarrouselBarBonbons}/>
      {!statusResponse ?
        ( 
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
              <label htmlFor="email">Courriel*</label>
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
              <label htmlFor="date">Date de l'Événement</label>
              <input
                name="date"
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
              <div className="evenement">
                <label>Type d'Événement</label>
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
              <label htmlFor="extraInfo">Informations Pertinentes*</label>
              <textarea
                name="extraInfo"
                id="extraInfo"
                value={formData.extraInfo}
                onChange={handleChange}
                required
              />
              <button type="submit" onClick={handleSubmit} className="submit">Soumettre!</button>
            </form>
          </div>
        ) : (
          <Wrapper>
            <h3 className="success">Nous avons bien reçu votre demande de contact!<br/> Nous vous répondrons dans les plus brefs délais.</h3>
          </Wrapper>
      )
      }
    </Wrapper>
  );
};

export default BarABonbons;

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
    
      .evenement {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        input {
          margin-right: 10px;
        }
      }
    
      button {
        width: fit-content;
        color: var(--primary-color);
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

  .success {
    color: var(--primary-color);
    padding: 1.5em;
    background-color: var(--background-color);
    border-radius: 10px;
    margin-bottom: 2em;
  }

  @media screen and (max-width: 900px) {
    .formulaireWrapper {
      width: 80%;
    }
  }
`;
