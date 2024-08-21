// Necessary Import
import styled from "styled-components";
import React from 'react';

// Component and Other Import

const ListeTag = ({optionSelectionne, currentInventaire, filtreVrac, setFiltreVrac, filtreProduits, setFiltreProduits}) => {

  const handleDelete = (filtreOption, filtreSection) => {
    console.log(filtreOption);
    console.log(filtreSection);
    console.log(currentInventaire);
    // ↓ Handeling the Fetch ↓
    // fetch(`/deleteFiltre/${filtreOption}/${filtreSection}/${currentInventaire}`, {
    //   method: "DELETE"
    // })
    // .then(response => response.json())
    // .then(data => { setTrackError(data) }
    // })
  }

  return (
    <Wrapper>
        {optionSelectionne.map((section, id) => {
          console.log(section._id);
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
                      <button className="delete" onClick={() => handleDelete(option, section._id)}>X</button>
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