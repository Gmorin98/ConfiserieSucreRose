// Necessary Import
import styled from "styled-components";
import React from 'react';

// Component and Other Import
import WarningMessage from "../Components/WarningMessage";

const Produit = () => {
  return (
    <Wrapper>
      <WarningMessage children={"Plus de produits en boutique!"}/>
      <p>Produits</p>
    </Wrapper>
  );
}

export default Produit;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`