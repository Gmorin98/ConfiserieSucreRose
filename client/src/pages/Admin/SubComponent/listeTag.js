// Necessary Import
import styled from "styled-components";
import React, { useState } from 'react';

// Component and Other Import

const ListeTag = ({optionSelectionne, setOptionSelectionne, sectionFiltre, filtreVracInfo, setFiltreVracInfo, filtreProduitInfo, setFiltreProduitInfo}) => {
  const [newOption, setNewOption] = useState({});

  const handleDelete = (filtreOption, sectionID) => {
    // ↓ Handeling the Fetch ↓
    fetch(`${process.env.REACT_APP_API_URL}/deleteFiltre/${sectionFiltre}/${sectionID}/${filtreOption}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => updateList(data.data))
    .catch(error => console.error('Error:', error));
  }

  const handleAjout = (filtreOption, sectionID) => {
    // ↓ Handeling the Fetch ↓
    fetch(`${process.env.REACT_APP_API_URL}/ajoutFiltre/${sectionFiltre}/${sectionID}/${filtreOption}`, {
      method: "PATCH",
      headers: {
        "Content-type" : "application/json"
      }
    })
    .then(response => response.json())
    .then(data => updateList(data.data))
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

  const updateList = (newData) => {
    if(sectionFiltre === "Vrac") {
      setFiltreVracInfo((prevInfo) => 
        prevInfo.map((item) => 
          item._id === newData._id
            ? { ...item, titre: newData.titre, options: newData.options }
            : item
        )
      );
    } else {
      setFiltreProduitInfo((prevInfo) => 
        prevInfo.map((item) => 
          item._id === newData._id
            ? { ...item, titre: newData.titre, options: newData.options }
            : item
        )
      );
    }
  };

  if(sectionFiltre === "Vrac") {
    setOptionSelectionne(filtreVracInfo);
  } else {
    setOptionSelectionne(filtreProduitInfo);
  }

  return (
    <Wrapper>
        {optionSelectionne.map((section, id) => {
          return (
            <section>
              <div key={id} className="filtreTitre">
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
  display: flex;
  
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