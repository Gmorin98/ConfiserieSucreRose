// Necessary Import
import React from 'react';
import styled from "styled-components";

// Components and Other Import

const WarningMessage = ({children}) => {
  return (
    <Wrapper>
      <p>{children}</p>
    </Wrapper>
  )
}

export default WarningMessage;

const Wrapper = styled.div`
  color: white;
  background-color: var(--accent-color);
  font-family: var(--font-primary);
  font-weight: bold;
  font-size: 2em;
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