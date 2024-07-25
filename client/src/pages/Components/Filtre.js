// Necessary Import
import styled from "styled-components";
import React from 'react';

// Component and Other Import
import Checkbox from "./Checkbox";

const Filtre = ({children}) => {
  return (
    <Wrapper>
      <h2>Filtre</h2>
      {children.map(element => {return (
          <section key={element.titre}>
            <h3>{element.titre}</h3>
            <div>
              {element.options.map((option, id) => {return (
                <Checkbox children={option} key={id}/>
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