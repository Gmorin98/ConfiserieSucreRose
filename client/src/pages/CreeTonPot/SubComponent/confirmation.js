// Necessary Import
import styled from "styled-components";
import React, { useState, useEffect } from 'react';

// Component and Other Import
import WarningMessage from "../../Components/WarningMessage";

const Confirmation = ({sac, setSac, setReset}) => {
  const [displayAvertissement, setDisplayAvertissement] = useState(false);
  const [avertissementMessage, setAvertissementMessage] = useState("")

  const ajouterAuPanier = () => {
    if(sac.quantitePrise < sac.quantiteMax) {
      setDisplayAvertissement(true);
      setAvertissementMessage(`Il vous reste encore ${sac.quantiteMax - sac.quantitePrise}g à choisir!`);
      return;
    } else if (sac.quantitePrise > sac.quantiteMax) {
      setDisplayAvertissement(true);
      setAvertissementMessage(`Vous avez trop de bonbons dans votre sac! S.v.p retirer ${sac.quantiteMax - sac.quantitePrise}g!`);
      return;
    }

    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    panier.push(sac);

    // Save the updated panier back to localStorage
    localStorage.setItem('panier', JSON.stringify(panier));

    // Clear the current sac selection and reset state.
    setSac({
      nom: "",
      prix: "",
      img: "",
      quantitePrise: 0,
      quantiteMax: 0,
      bonbonsSelectionne: [],
      quantity: 1,
    });

    setReset(true);
    setDisplayAvertissement(false);
  };

  return (
    <Wrapper>
      {displayAvertissement && <WarningMessage children={avertissementMessage} /> }
        {sac.nom !== '' &&
          <div className="resumer">
            <div className="imgContainer">
              <img src={sac.img} alt={sac.nom}/>
            </div>
            <div className="sacContenu" style={{ display: sac.nom=== "" ? "none" : "block" }}>
              <h3>Le contenant comprend:</h3>
              <div>
                <h3>{sac.nom}</h3>
                <p>{sac.prix}$</p>
              </div>
              {sac.bonbonsSelectionne.map((bonbon, id) => {
                return (
                  <div className="listeBonbons" key={id}>                     
                    <p>{bonbon.nom}</p>
                    <p>{bonbon.quantite}g</p>
                  </div>
                )
              })}
            </div>
          </div>
        }
        <button disabled={sac.nom === ""} onClick={() => ajouterAuPanier()} style={{ cursor: sac.nom === "" ? "not-allowed" : "pointer" }}>Ajouter au panier!</button>
    </Wrapper>
  )
}

export default Confirmation;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
  width: 100%;

  > button {
    width: fit-content;
    margin: 2em auto;
    padding: 0.5em;
    color: var(--primary-color);
    background-color: var(--background-color);
    border: none;
    border-radius: 10px;
    font-size: 1.5em;
    font-weight: bold;
    font-family: var(--font-primary);
    cursor: pointer;
  }
    .resumer {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-color);
      font-family: var(--font-primary);
      > div {
        margin: 0 2em;
      }
      .imgContainer {
        height: fit-content;
        > img {
          height: fit-content;
          max-width: 200px;
          max-height: 200px;
        }
        @media screen and (max-width: 900px) {
          display: none;
        }
      }
      .sacContenu {
        height: fit-content;
        width: fit-content;
        border-radius: 20px;
        background-color: var(--background-color);
        padding: 1em;
        > h3 {
          margin-bottom: 0.75em;
        }
        > div {
          display: flex;
          justify-content: space-between;
          > h3 {
            margin: 0 3em 0.5em 0;
          }
        }
        div:nth-child(3) {
          border-radius: 10px 10px 0 0;
        }
      }
      .listeBonbons {
        padding: 0.5em 0 0 0.5em;
        border-bottom: 1px solid var(--primary-color);
        background-color: hsla(354,67%, 90%, 1);
        p:first-of-type {
          padding-right: 1.5em;
        }
        p:last-of-type {
          padding-right: 0.5em;
        }
      }
      .listeBonbons:nth-child(2n) {
        background-color: var(--background-color);
      }
      .listeBonbons:last-of-type {
        border-radius: 0 0 10px 10px;
        border: none;
      }
    }
`