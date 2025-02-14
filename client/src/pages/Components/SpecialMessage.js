// Necessary Import
import React from 'react';
import styled from "styled-components";

// Components and Other Import

const SpecialMessage = () => {
  return (
    <Wrapper>
      <p>Vacances de la Sucre Rose!</p>
      <p>La boutique sera fermée du lundi 17 février au jeudi 20 février.</p>
      <p>De RETOUR vendredi 21 février.</p>
    </Wrapper>
  )
}

export default SpecialMessage;

const Wrapper = styled.div`
  color: white;
  background-color: var(--accent-color);
  font-family: var(--font-primary);
  font-weight: bold;
  font-size: 1.5em;
  border-radius: 20px;
  width: fit-content;
  max-width: 45%;
  padding: 10px 15px;
  margin: 0em auto 1.25em;
  text-align: center;
  white-space: pre-wrap;

  @media screen and (max-width: 900px) {
    font-size: 1.5em;
    margin-top: 2em;
  }
`