// Necessary Import
import styled from "styled-components";
import React from 'react';

// Component and Other Import
// const listSac = [
//   {nom: "Petit Cône 125g", prix: "4.50", img: "images/Vrac/Sacs/Petit_cone.jpg", quantite: 125},
//   {nom: "Sac 175g", prix: "5.50", img: "images/Vrac/Sacs/Sac.jpg", quantite: 175},
//   {nom: "Grand Cône 225g", prix: "6.75", img: "images/Vrac/Sacs/Grand_Cone.jpg", quantite: 225},
//   {nom: "Verre en vitre avec Paille ???g", prix: "15.99", img: "images/Vrac/Sacs/Verre_Pascale.jpg", quantite: 325},
//   {nom: "Plateau 1000g", prix: "29.50", img: "images/Vrac/Sacs/Plateau.jpg", quantite: 1000},
// ]

const listSac = [
{nom: "Petit Cône 125g", prix: "4.50", img: "images/Vrac/Sacs/Petit_Cone_Crop.png", quantite: 125},
{nom: "Sac 175g", prix: "5.50", img: "images/Vrac/Sacs/Sac_Crop.png", quantite: 175},
{nom: "Grand Cône 225g", prix: "6.75", img: "images/Vrac/Sacs/Grand_Cone_Crop.png", quantite: 225},
{nom: "Verre en vitre avec Paille 325g", prix: "15.99", img: "images/Vrac/Sacs/Verre_Pascale_Crop.png", quantite: 325},
{nom: "Plateau 1000g", prix: "29.50", img: "images/Vrac/Sacs/Plateau_Crop.png", quantite: 1000},
]

const SelectionSac = ({setSac}) => {

  const handleSacSelection = (sac) => {
    setSac((prevState) => ({
      ...prevState,
      nom: sac.nom,
      prix: sac.prix,
      img: sac.img,
      quantitePrise: 0,
      quantiteMax: sac.quantite,
      bonbonsSelectionne: []
    }));
  }

  return (
    <Wrapper>
      {listSac.map((sac, id) => {
        return (
          <div key={id} >
            <img src={sac.img} alt={sac.nom} />
            <p>{sac.nom}</p>
            <p>{sac.prix}$</p>
            <button onClick={() => handleSacSelection(sac)}>Sélectionner</button>
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
    margin: 1em 3em;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px,
                rgba(0, 0, 0, 0.09) 0px 4px 2px,
                rgba(0, 0, 0, 0.09) 0px 8px 4px,
                rgba(0, 0, 0, 0.09) 0px 16px 8px,
                rgba(0, 0, 0, 0.09) 0px 32px 16px;

    img {
      height: 150px;
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
`