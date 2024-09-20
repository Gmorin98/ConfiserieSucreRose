// Necessary Import
import styled from "styled-components";
import React, { useState } from 'react';

const listSac = [
  {nom: "Petit Cône 125g", prix: "4.50", img: "images/Vrac/Sacs/Petit_Cone_Crop.png", quantite: 125},
  {nom: "Sac 175g", prix: "5.50", img: "images/Vrac/Sacs/Sac_Crop.png", quantite: 175},
  {nom: "Contenant 200g", prix: "5.25", img: "images/Vrac/Sacs/Petit_Format_Crop.png", quantite: 200},
  {nom: "Grand Cône 225g", prix: "6.75", img: "images/Vrac/Sacs/Grand_Cone_Crop.png", quantite: 225},
  {nom: "Contenant 300g", prix: "7.55", img: "images/Vrac/Sacs/Grand_Format_Crop.png", quantite: 300},
  {nom: "Verre en vitre avec Paille 325g", prix: "15.99", img: "images/Vrac/Sacs/Verre_Pascale_Crop.png", quantite: 325},
  {nom: "Plateau 1000g", prix: "29.50", img: "images/Vrac/Sacs/Plateau_Crop.png", quantite: 1000}, // limite 2 
  {nom: "Plateau 1300g", prix: "36.50", img: "images/Vrac/Sacs/Plateau_Crop.png", quantite: 1300}  // limite 2
]

const SelectionSac = ({setSac, setQuantiteContenant}) => {
  const [clickedButtons, setClickedButtons] = useState({}); // Track which buttons were clicked
  const panierOnlyContenant = JSON.parse(localStorage.getItem('panier')).filter(item => item._id === undefined) || [];
  let quantiteContenant = 0;
  
  const handleSacSelection = (sac, index) => {
    panierOnlyContenant.forEach(contenant => {
      if (contenant.quantiteMax > 500) {quantiteContenant += 3}
      else {quantiteContenant += 1}
    });
    setQuantiteContenant(quantiteContenant)
    if(quantiteContenant >= 6) return

    setSac((prevState) => ({
      ...prevState,
      nom: sac.nom,
      prix: sac.prix,
      img: sac.img,
      quantiteMax: sac.quantite,
    }));

    // Trigger the animation for the specific button
    setClickedButtons((prevState) => ({
      ...prevState,
      [index]: true,
    }));

    // Revert the animation state after the animation completes
    setTimeout(() => {
      setClickedButtons((prevState) => ({
        ...prevState,
        [index]: false,
      }));
    }, 2000);  // Adjust the duration to match your animation
  }

  return (
    <Wrapper>
      {listSac.map((sac, id) => {
        return (
          <div key={id} >
            <img src={sac.img} alt={sac.nom} />
            <p>{sac.nom}</p>
            <p>{sac.prix}$</p>
            <button 
              onClick={() => handleSacSelection(sac, id)}
              className={`selection ${clickedButtons[id] ? 'transform-active' : ''}`}
            >
              Sélectionner
            </button>
          </div>
        )
      })}
    </Wrapper>
  )
}

export default SelectionSac;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  div {
    display: flex;
    color: var(--primary-color);
    font-family: var(--font-primary);
    width: 20%;
    min-width: 250px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 35px;
    background-color: #ffffff;
    margin: 1em 1.5em;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px,
                rgba(0, 0, 0, 0.09) 0px 4px 2px,
                rgba(0, 0, 0, 0.09) 0px 8px 4px,
                rgba(0, 0, 0, 0.09) 0px 16px 8px,
                rgba(0, 0, 0, 0.09) 0px 32px 16px;

    img {
      max-height: 150px;
      padding: 1em;
    }
  }

  button {
    background-color: var(--background-color);
    border: none;
    border-radius: 15px;
    width: 100%;
    height: 3em;
    color: var(--primary-color);
    cursor: pointer;
  }

  @keyframes confirmationAdded {
    0% {
      background: var(--background-color);
      color: white;
    }
    50% {
      background: #6FF178;
      color: white;
    }
    100% {
      background: var(--background-color);
      color: var(--primary-color);
    }
  }

  .selection.transform-active {
    animation: confirmationAdded 2s linear forwards;
  }
`