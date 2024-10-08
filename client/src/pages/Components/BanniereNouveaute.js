// Necessary Import
import styled from "styled-components";
import React from 'react';

const BanniereNouveaute = () => {
  return (
    <>
    <Wrapper className="banniere">
      <img src="images/BannierePointe.svg" height="24px" loading="lazy"/>
      <p>Nouveauté!</p>
    </Wrapper>
    </>
  )
}

export default BanniereNouveaute;

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: -10px;
  background-color: var(--accent-color);
  color: #ffffff;
  border-radius: 0px 35px 35px 0px;
  padding-right: 15px;
  img {
    position: absolute;
    height: 24px;
    left: -24px;
  }
`