// Necessary Import
import styled from "styled-components";
import React, { useState } from 'react';

// Component and Other Import

const ListeTag = ({optionSelectionne, sectionFiltre}) => {
  const [newOption, setNewOption] = useState({});

  const handleDelete = (filtreOption, sectionID) => {
    // ↓ Handeling the Fetch ↓
    fetch(`/deleteFiltre/${sectionFiltre}/${sectionID}/${filtreOption}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => { console.log(data) })
  }

  const handleAjout = (filtreOption, sectionID) => {
    // ↓ Handeling the Fetch ↓
    fetch(`/ajoutFiltre/${sectionFiltre}/${sectionID}/${filtreOption}`, {
      method: "PATCH",
      headers: {
        "Content-type" : "application/json"
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

  const handleInputChange = (e, sectionID) => {
    const value = e.target.value;
    setNewOption({ ...newOption, [sectionID]: value }); // Store the input value keyed by sectionID
  };

  const handleAddClick = (sectionID) => {
    const optionToAdd = newOption[sectionID]; // Get the input value for the specific sectionID
    if (optionToAdd) {
      handleAjout(optionToAdd, sectionID); // Pass the input value to handleAjout
    }
  };

  return (
    <Wrapper>
        {optionSelectionne.map((section, id) => {
          return (
            <section>
              <div key={id} className="filtreTitre">
                <button className="delete" onClick={() => handleDelete("", section._id)}>X</button>
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
                <button className="filtreAjout" onClick={() => handleAddClick(section._id)}>+</button>
                <input 
                  type="text"
                  onChange={(e) => handleInputChange(e, section._id)} 
                  value={newOption[section._id] || ''}
                />
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