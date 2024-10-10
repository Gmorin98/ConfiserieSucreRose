// Necessary Import
import styled from "styled-components";
import React, { useState } from 'react';

// Component and Other Import

const Evenement = ({optionSelectionne, setOptionSelectionne, editedOption, setEditedOption, editingIndex, setEditingIndex, setTrackError, currentInventaire}) => {
  const [formNouveauEvenement, setFormNouveauEvenement] = useState(false);
  const [nouveauEvenement, setNouveauEvenement] = useState({
    'info': "",
    'img': null,
  });

  const handleChangeEvenement = (e, field) => {
    let value = e.target.value;

    setEditedOption({
      ...editedOption,
      [field]: value,
    });
  };

  const nouveauEvenementInfo = (e, field) => {
    let value = e.target.value;

    setNouveauEvenement({
      ...nouveauEvenement,
      [field]: value,
    });
  }

  const handleEdit = (index, option) => {
    setEditingIndex(index);
    setEditedOption({ ...option }); // Initialize editedOption with the current values
  };

  const handleConfirmNouveau = async (event) => {
    event.preventDefault();

    const data = {
      info: nouveauEvenement.info ?? "",
    };

    const formData = new FormData();
      formData.append('img', nouveauEvenement.img);
      formData.append('data', JSON.stringify(data));

    // ↓ Handeling the Fetch ↓
    fetch(`${process.env.REACT_APP_API_URL}nouveauEvenement`, {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => updateList(data.data))
    .catch(error => console.error('Error:', error));
  };

  const handleConfirmUpdate = () => {
    // ↓ Handeling the Fetch ↓
    fetch(`${process.env.REACT_APP_API_URL}patchEvenement`, {
      method: "PATCH",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify({
        _id: editedOption._id,
        info: editedOption.info,
      })
    })
    .then(response => response.json())
    .then(data => {
      // Check if the server response status is 200
      if (data.status === 200) {
        // Update the product in the optionSelectionne state with the new data
        const newOptions = optionSelectionne.map((option, index) =>
          index === editingIndex ? { ...option, ...data.data } : option
        );
  
        setOptionSelectionne(newOptions);
        setEditingIndex(null); // Exit editing mode
      } else {
        // Handle errors or unsuccessful response
        setTrackError(data);
      }
    })
  };

  const handleDelete = () => {
    // ↓ Handeling the Fetch ↓
    fetch(`${process.env.REACT_APP_API_URL}deleteEvenement`, {
      method: "DELETE",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify({
        _id: editedOption._id
      })
    })
    .then(response => response.json())
    .then(data => {
      setTrackError(data)
      if(data.status === 200) {
        setAllEvenement(prevAllEvenement => prevAllEvenement.filter(evenement => evenement._id !== editedOption._id));
      }
    })
  }

  const handleCancel = () => {
    setEditingIndex(null);
  };

  const updateList = (newData) => {
    setAllEvenement(prev => [...prev, newData]);
  };

  return (
    <Wrapper>
      {currentInventaire !== "" && (
        !formNouveauEvenement ? 
          <button className="ajoutEvenementButton" onClick={() => setFormNouveauEvenement(true)}>+</button> 
          :
          <div>
            <form className="ajoutEvenementForm" onSubmit={handleConfirmNouveau}>
              <div>
                <label>Image :</label>
                <input type="file" onChange={(e) => nouveauEvenementInfo(e, 'img')} required />
              </div>
              <div>
                <label>Nom :</label>
                <input type="text" onChange={(e) => nouveauEvenementInfo(e, 'nom')} required />
              </div>
              <div>
                <button className="confirmer" type="submit">CONFIRM</button>
                <button className="cancel" onClick={() => setFormNouveauEvenement(false)}>CANCEL</button>
              </div>
            </form>
          </div>
      )}
      {optionSelectionne.map((option, id) => {
        const isEditing = editingIndex === id;
        return (
          <div key={id} className="wrapperItem">
            {isEditing && <button className="deleteButton" onClick={() => handleDelete()}>DELETE</button>}
            <div className="imgContainer">
              <img src={option.img} />
            </div>
            <section>
              <div className="container">
                <p>INFO: </p>
                {isEditing ?
                  <input type="text" value={editedOption.info} onChange={(e) => handleChangeEvenement(e, 'info')} /> 
                  : <p>&nbsp;{option.info}</p>}
              </div>
            </section>
            <div className="editButton">
              {isEditing ? (
                <>
                  <button className="confirmer" onClick={handleConfirmUpdate}>CONFIRM</button>
                  <button className="cancel" onClick={handleCancel}>CANCEL</button>
                </>
              ) : (
                <button onClick={() => handleEdit(id, option)}>EDIT</button>
              )}
            </div>
          </div>
        );
      })}
    </Wrapper>
  )
}

export default Evenement

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;

  button {
    border: none;
    border-radius: 10px;
  }
  .wrapperItem {
    display: flex;
    flex-direction: column;
    width: 250px;
    padding: 5px;
    margin: 10px;
    background-color: #ffffff;
    border: solid 2px var(--primary-color);
    border-radius: 10px;
    .container {
      display: flex;
      align-items: center;
      height: 30px;
      > input {
        width: 70%;
      }
      > p:last-of-type {
        width: fit-content;
        height: 24px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .editButton {
      display: flex;
      justify-content: space-evenly;
      button {
        background-color: var(--primary-color);
        color: #ffffff;
        width: 100%;
      }
      .confirmer {
        background-color: limegreen;
      }
      .cancel {
        background-color: crimson;
      }
    }
  }
  .imgContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;
    img {
      max-height: 150px;
    }
  }

  .ajoutEvenementButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 210px;
    margin: 10px;
    color: white;
    background-color: var(--primary-color);
    border-radius: 10px;
    font-size: 5em;
    text-align: center;
  }

  .ajoutEvenementForm {
    width: 250px;
    height: fit-content;
    padding: 5px;
    margin: 10px;
    background-color: #ffffff;
    border: solid 2px var(--primary-color);
    border-radius: 10px;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > label {
        width: fit-content;
      }
      > input {
        max-height: 30px;
        max-width: 75%;
      }
      > button {
        color: #ffffff;
        margin-top: 5px;
      }
      > button:first-of-type {
        background-color: limegreen;
      }
      > button:last-of-type {
        background-color: crimson;
      }
    }
  }
`