// Necessary Import
import styled from "styled-components";
import React from 'react';

// Component and Other Import

const ListeTag = ({optionSelectionne}) => {

  return (
    <Wrapper>
        {optionSelectionne.map((section, id) => {
          return (
            <section>
              <div key={id} className="filtreTitre">
                <button className="delete">X</button>
                <h3>{section.titre}</h3>
              </div>
              <div> 
                {section.options.map((option, id) => {
                  return (
                    <div key={id} className="filtreOption">
                      <button className="delete">X</button>
                      <p>{option}</p>
                    </div >
                  )
                })}
                <button className="filtreAjout">+</button>
                <input type="text"></input>
              </div>
            </section>
          )
        })}
    </Wrapper>
  )
}

export default ListeTag

const Wrapper = styled.div`
  section {
    margin: 1em;
    > div {
      padding: 0.5em;
    }
  }
  button.delete {
    background-color: crimson;
    color: white;
    border-radius: 5px;
  }
  button.filtreAjout {
    background-color: limegreen;
    color: white;
    border-radius: 5px;
  }
  .filtreTitre{
    display: flex;
    flex-wrap: wrap;
    > button {
      width: fit-content;
    }
  }
  .filtreOption {
    display: flex;
  }
`