// Necessary Import
import styled from "styled-components";
import React from 'react';

// Component and Other Import
import WarningMessage from "../Components/WarningMessage";
import Filtre from "../Components/Filtre";
import ProduitCase from "../Components/ProduitCase";

// One time renderer
const filtreInfo = [{titre: "Type de Bonbon", options: ["Jujube", "Chocolat", "Réglisse", "Surette", "Caramel"]},
                    {titre: "Prix", options: ["0.10$ - 0.99$", "1.00$ - 5.00$", "5.00$ - 10.00$", "10.00$ - 25.00$", "25.00$ - 99.99$"]}];

const CreerTonPot = () => {
  return (
    <Wrapper>
      <WarningMessage children={"Plus de produits en Boutique!"}/>
      <div className="Content">
        <aside>
          <Filtre children={filtreInfo}/>
        </aside>
        <div className="ProduitsShowcase">
          <ProduitCase />
          <ProduitCase />
          <ProduitCase />
          <ProduitCase />
          <ProduitCase />
          <ProduitCase />
          <ProduitCase />
          <ProduitCase />
        </div>
      </div>
    </Wrapper>
  );
}

export default CreerTonPot;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .Content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    aside {
      width: 20%;
    }
    .ProduitsShowcase {
      display: flex;
      width: 70%;
      height: fit-content;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }
  }
`