// Necessary Import
import styled from "styled-components";
import React from 'react';

// Component and Other Import
import VracCase from "../../Components/VracCase";

const VracShowcase = ({vrac, setSac, sac, setReset, reset}) => {

  return (
    <Wrapper>
      {sac.nom && 
        <div className="wrapperQuantiteSac">
          <div className="quantiteSac">
            <p>{sac.quantitePrise}g</p>
            <p>{sac.quantiteMax}g</p>
          </div>
        </div>
      }
      <VracCase vrac={vrac} setSac={setSac} sac={sac} setReset={setReset} reset={reset} />
    </Wrapper>
  )
}

export default VracShowcase;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
  color: var(--primary-color);

  div:nth-child(2) {
  }
  
  .wrapperQuantiteSac {
    height: 0;
    position: sticky;
    top: 10px;
    z-index: 5;
  }
  
  .quantiteSac {
    width: 70px;
    height: fit-content;
    padding: 5px;
    margin-right: -70px;
    font-size: 1.5em;
    text-align: center;
    border-radius: 10px;
    background-color: var(--background-color);
    text-align: center;
    p:first-of-type {
      border-bottom: 1px solid;
    }
  }
`