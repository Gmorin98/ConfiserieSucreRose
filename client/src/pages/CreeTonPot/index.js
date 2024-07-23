// Necessary Import
import styled from "styled-components";
import React from 'react';

// Component and Other Import
import WarningMessage from "../Components/WarningMessage";

const CreerTonPot = () => {
  return (
    <Wrapper>
      <WarningMessage children={"Plus de produits en Boutique!"}/>
      <p>Creer Ton Pot</p>
    </Wrapper>
  );
}

export default CreerTonPot;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`