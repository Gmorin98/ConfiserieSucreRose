// Necessary Import
import styled from "styled-components";
import React, { useState, useContext } from 'react';

// Component and Other Import
import { AllProduitsContext } from "../../../contexts/AllProduitsContext";

const ProduitsInventaire = ({optionSelectionne, setOptionSelectionne, editedOption, setEditedOption, editingIndex, currentInventaire, setEditingIndex, setTrackError, allProduits, allVrac}) => {
  const { setAllVrac, setAllProduits } = useContext(AllProduitsContext);
  const [formNouveauBonbons, setFormNouveauBonbons] = useState(false);
  const [nouveauProduit, setNouveauProduit] = useState({});

  const handleChangeProduits = (e, field) => {
    let value = e.target.value;
    if (field === ("nouveau")) {
      value = e.target.checked; // Handle checkbox toggle
    } else if (field === ("actif")){
      value = e.target.checked; // Handle checkbox toggle
    } else if (field === "tag") {
      value = value.split(',').map(tag => tag.trim()); // Ensure the tags are stored as an array
    } else if (field === "inventaire") {
      value = Math.max(0, Number(value)); // Ensure the inventory is a positive number
    }

    setEditedOption({
      ...editedOption,
      [field]: value,
    });
  };

  const nouveauProduitInformation = (e, field) => {
    let value = e.target.value;
    if (field === "img") {
      value = e.target.files[0]; // Handle file input
    } else if (field === "nouveau" || field === "actif") {
      value = e.target.checked;
    } else if (field === "tag") {
      value = value.split(',').map(tag => tag.trim());
    } else if (field === "inventaire") {
      value = Math.max(0, Number(value));
    }

    setNouveauProduit({
      ...nouveauProduit,
      [field]: value,
    });
  }

  const handleEdit = (index, option) => {
    setEditingIndex(index);
    setEditedOption({ ...option }); // Initialize editedOption with the current values
  };

  const handleConfirmNouveau = async (event) => {
    event.preventDefault();

    const formData = new FormData();
      formData.append('img', nouveauProduit.img);
      formData.append('nom', nouveauProduit.nom);
      formData.append('stock', nouveauProduit.stock);
      formData.append('prix', nouveauProduit.prix);
      formData.append('actif', nouveauProduit.actif);
      formData.append('nouveau', nouveauProduit.nouveau);
      formData.append('tag', nouveauProduit.tag);
      formData.append('inventaire', currentInventaire);
  
    // ↓ Handeling the Fetch ↓
    fetch(`/nouveauProduit`, {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => updateList(data.data))
    .catch(error => console.error('Error:', error));
  };

  const handleConfirmUpdate = () => {
    const updatedOptions = optionSelectionne.map((option, index) =>
      index === editingIndex ? editedOption : option
    );

    // ↓ Handeling the Fetch ↓
    fetch(`/updateInventaire/${currentInventaire}`, {
      method: "PATCH",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify({
        _id: editedOption._id,
        nom: editedOption.nom,
        tag: editedOption.tag,
        inventaire: editedOption.inventaire,
        nouveau: editedOption.nouveau,

      })
    })
    .then(response => response.json())
    .then(data => setTrackError(data))

    setOptionSelectionne(updatedOptions);
    setEditingIndex(null);
  };

  const handleDelete = () => {

    // ↓ Handeling the Fetch ↓
    fetch(`/deleteProduit/${editedOption._id}/${currentInventaire}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
      setTrackError(data)
      if(data.status === 200) {
        if(currentInventaire === "Vrac") {
          setAllVrac(prevAllVrac => prevAllVrac.filter(item => item._id !== editedOption._id));
        } else {
          setAllProduits(prevAllProduits => prevAllProduits.filter(item => item._id !== editedOption._id));
        }
      }
    })
  }

  const handleCancel = () => {
    setEditingIndex(null);
  };

  const updateList = (newData) => {
    if(currentInventaire === "Vrac") {
      allVrac.push(newData);
    } else {
      allProduits.push(newData);
    }
  };

  if(currentInventaire === "Vrac") {
    setOptionSelectionne(allVrac);
  } else {
    setOptionSelectionne(allProduits);
  }

  return (
    <Wrapper>
      {currentInventaire !== "" && (
        !formNouveauBonbons ? 
          <button className="ajoutBonbonButton" onClick={() => setFormNouveauBonbons(true)}>+</button> 
          : 
          <div className="ajoutBonbonsWrapper">
            <form className="ajoutBonbonsForm" onSubmit={handleConfirmNouveau}>
              <div>
                <label>Image :</label>
                <input type="file" onChange={(e) => nouveauProduitInformation(e, 'img')} required />
              </div>
              <div>
                <label>Nom :</label>
                <input type="text" onChange={(e) => nouveauProduitInformation(e, 'nom')} required />
              </div>
              <div>
                <label>Stock :</label>
                <input type="number" onChange={(e) => nouveauProduitInformation(e, 'stock')} required />
              </div>
              <div>
                <label>Prix :</label>
                <input type="text" onChange={(e) => nouveauProduitInformation(e, 'prix')} />
              </div>
              <div>
                <label>Actif :</label>
                <input type="checkbox" onChange={(e) => nouveauProduitInformation(e, 'actif')} required />
              </div>
              <div>
                <label>Nouveauté :</label>
                <input type="checkbox" onChange={(e) => nouveauProduitInformation(e, 'nouveau')} required />
              </div>
              <div>
                <label>Tag :</label>
                <input type="text" onChange={(e) => nouveauProduitInformation(e, 'tag')} />
              </div>
              <div>
                <button className="confirmer" onClick={handleConfirmNouveau} type="">CONFIRM</button>
                <button className="cancel" onClick={() => setFormNouveauBonbons(false)}>CANCEL</button>
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
              <img src={option.img} alt={option.nom} />
            </div>
            <section>
              <div className="container">
                <p>NOM: </p>
                {isEditing ?
                  <input type="text" value={editedOption.nom} onChange={(e) => handleChangeProduits(e, 'nom')} /> 
                  : <p>&nbsp;{option.nom}</p>}
              </div>
              <div className="container">
                <p>STOCK: </p>
                {isEditing ?
                  <input type="number" value={editedOption.inventaire} onChange={(e) => handleChangeProduits(e, 'inventaire')} min="0" />
                  : <p>&nbsp;{option.inventaire + (currentInventaire === "Vrac" ? "g" : "")}</p>}               
              </div>
              {option.prix && (
                <div className="container">
                  <p>PRIX: </p>
                  {isEditing ?
                    <input type="number" value={editedOption.prix} onChange={(e) => handleChangeProduits(e, 'prix')} min="0" step="0.01" /> 
                    :<p>&nbsp;{`${option.prix}$`}</p>}
                </div>
              )}
              <p>NOUVEAUTÉ: {isEditing ?
                <input type="checkbox" checked={editedOption.nouveau} onChange={(e) => handleChangeProduits(e, 'nouveau')} /> 
                : (option.nouveau ? "OUI" : "NON")}</p>
              <p>ACTIF: {isEditing ?
                <input type="checkbox" checked={editedOption.actif} onChange={(e) => handleChangeProduits(e, 'actif')} /> 
                : (option.nouveau ? "OUI" : "NON")}</p>
              <p>TAG: {(option.tag ? option.tag.join(', ') : '')}</p>
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

export default ProduitsInventaire

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

  .ajoutBonbonButton {
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

  .ajoutBonbonsForm {
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