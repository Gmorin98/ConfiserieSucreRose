// Necessary Import
import styled from "styled-components";
import React, { useState } from 'react';

// Component and Other Import
import Checkbox from "./Checkbox";

const Filtre = ({children, selectedFilters, handleFilterChange}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  return (
    <Wrapper>
      <button onClick={() => toggleVisibility()} className="toggleFiltre"><img src="/images/Filter_icon.svg" loading="lazy"/></button>
      <div className={isVisible ? "" : "hidden"}>
        <h2>Filtres</h2>
        {children.map(element => {return (
            <section key={element.titre}>
              <h3>{element.titre}</h3>
              <div>
                {element.options.map((option, id) => {return (
                  <Checkbox 
                    key={id}
                    children={option}
                    checked={selectedFilters.includes(option)}
                    onChange={() => handleFilterChange(option)}/>
                )})}
              </div>
            </section>
          )
        })}
      </div>
    </Wrapper>
  );
}

export default Filtre;

const Wrapper = styled.div`
  position: relative;
  padding: 1.5em;
  height: fit-content;
  width: fit-content;
  color: var(--primary-color);
  background-color: var(--background-color);
  font-family: var(--font-primary);
  border-radius: 0px 35px 35px 0px;
  margin-bottom: 5em;

  h2 {
    margin-bottom: 1em;
  }

  .toggleFiltre {
    display: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    > img {
      width: 50px;
    }
  }

  section {
    border-top: solid 1px var(--primary-color);
    padding: 1em 0em;
    div {
      display: flex;
      flex-direction: column;
    }
  }

  @media screen and (max-width: 1200px) {
    padding: 0.75em;
    min-width: 50px;
    width: fit-content;
    min-height: 50px;
    height: fit-content;
    margin-right: -50px;
    z-index: 2;
    button {
      width: 35px;
      position: absolute;
      right: 10px;
    }
    .toggleFiltre {
      display: block;
      width: fit-content;
      > img {
        width: 30px;
      }
    }
    div.hidden {
      display : none;
    }
  }
`