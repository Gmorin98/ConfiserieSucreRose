// Necessary Import
import styled from "styled-components";
import React from 'react';

// Component and Other Import
import Checkbox from "./Checkbox";

const Filtre = ({children, selectedFilters, handleFilterChange}) => {
  return (
    <Wrapper>
      <h2>Filtre</h2>
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
    </Wrapper>
  );
}

export default Filtre;

const Wrapper = styled.div`
  padding: 1.5em;
  height: fit-content;
  color: var(--primary-color);
  background-color: var(--background-color);
  font-family: var(--font-primary);
  border-radius: 0px 35px 35px 0px;
  margin-bottom: 5em;

  h2 {
    margin-bottom: 1em;
  }

  section {
    border-top: solid 1px var(--primary-color);
    padding: 1em 0em;
    div {
      display: flex;
      flex-direction: column;
    }
  }
`