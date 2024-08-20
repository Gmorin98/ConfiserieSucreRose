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
  color: #FFFFFF;
  background-color: var(--accent-color);
  font-family: var(--font-primary);
  font-weight: bold;
  font-size: 1.25em;
  border-radius: 20px;
  width: fit-content;
  padding: 20px 15px;
  margin: 0em auto 2em;
  text-align: center;
`