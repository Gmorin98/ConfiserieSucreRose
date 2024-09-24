// Necessary Import
import styled from "styled-components";
import React, { useState, useContext, useEffect } from 'react';

// Component and Other Import
import { AllProduitsContext } from "../../../contexts/AllProduitsContext";

const ProduitsInventaire = ({optionSelectionne, setOptionSelectionne, editedOption, setEditedOption, editingIndex, currentInventaire, setEditingIndex, setTrackError, allProduits, allVrac}) => {
  const { setAllVrac, setAllProduits } = useContext(AllProduitsContext);
  const [formNouveauBonbons, setFormNouveauBonbons] = useState(false);
  const [nouveauProduit, setNouveauProduit] = useState({
    'nom': "",
    'img': null,
    'prix': null,
    'stock': 0,
    'tag': [],
    'actif': false,
    'nouveau': false,
    'boutique': false,
    'inventaire': `${currentInventaire}`,
  });

  const handleChangeProduits = (e, field) => {
    let value = e.target.value;
    switch (field) {
      case "nouveau":
      case "actif":
      case "boutique":
        value = e.target.checked; // Handle checkbox toggle
        break;
      case "stock":
        value = Math.max(0, Number(value)); // Ensure the inventory is a positive number
        break;
      case "prix":
        value = value.trim() === "" ? null : Number(value); // Set to NaN if empty
        break;
      case "tag":
        value = value.split(',').map(tag => tag.trim()).filter(tag => tag); // Ensure the tags are stored as an array
        break;
    }

    setEditedOption({
      ...editedOption,
      [field]: value,
    });
  };

  const nouveauProduitInformation = (e, field) => {
    let value = e.target.value;
    switch (field) {
      case "img":
        value = e.target.files[0]; // Handle file input
        break;
      case "actif":
      case "nouveau":
      case "boutique":
        value = e.target.checked; // Handle checkbox inputs
        break;
      case "tag":
        value = value.split(',').map(tag => tag.trim()); // Handle tag as an array
        break;
      case "stock":
        value = Math.max(0, Number(value)); // Ensure inventory is at least 0
        break;
      case "prix":
        value = value.trim() === "" ? null : Number(value); // Set to null if empty
        break;
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

    // Ensure 'img' is properly handled and exists
    if (!nouveauProduit.img) {
      console.error('No image selected');
      return;
    }

    const data = {
      nom: nouveauProduit.nom ?? "",
      prix: nouveauProduit.prix ?? null,
      stock: nouveauProduit.stock ?? 0,
      tag: nouveauProduit.tag ?? [],
      actif: nouveauProduit.actif ?? false,
      nouveau: nouveauProduit.nouveau ?? false,
      boutique: nouveauProduit.boutique ?? false,
      origine: currentInventaire,
    };

    const formData = new FormData();
      formData.append('img', nouveauProduit.img);
      formData.append('data', JSON.stringify(data));

    // ↓ Handeling the Fetch ↓
    fetch(`${process.env.REACT_APP_API_URL}nouveauProduit`, {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => updateList(data.data))
    .catch(error => console.error('Error:', error));
  };

  const handleConfirmUpdate = () => {
    // ↓ Handeling the Fetch ↓
    fetch(`${process.env.REACT_APP_API_URL}updateInventaire`, {
      method: "PATCH",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify({
        _id: editedOption._id,
        nom: editedOption.nom,
        prix: editedOption.prix,
        inventaire: editedOption.inventaire,
        tag: editedOption.tag,
        actif: editedOption.actif,
        nouveau: editedOption.nouveau,
        boutique: editedOption.boutique,
        origine: editedOption.origine,
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
    fetch(`${process.env.REACT_APP_API_URL}deleteProduit/${editedOption._id}/${editedOption.origine}`, {
      method: "DELETE",
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
    if (currentInventaire === "Vrac") {
      setAllVrac(prev => [...prev, newData]);
    } else {
      setAllProduits(prev => [...prev, newData]);
    }
  };

  useEffect(() => {
    if (currentInventaire === "Vrac") {
      setOptionSelectionne(allVrac);
    } else {
      setOptionSelectionne(allProduits);
    }
  }, [currentInventaire, allVrac, allProduits]);

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
                <input type="checkbox" onChange={(e) => nouveauProduitInformation(e, 'actif')} />
              </div>
              <div>
                <label>Nouveauté :</label>
                <input type="checkbox" onChange={(e) => nouveauProduitInformation(e, 'nouveau')} />
              </div>
              <div>
                <label>Boutique Seulement :</label>
                <input type="checkbox" onChange={(e) => nouveauProduitInformation(e, 'boutique')} />
              </div>
              <div>
                <label>Tag :</label>
                <input type="text" onChange={(e) => nouveauProduitInformation(e, 'tag')} />
              </div>
              <div>
                <button className="confirmer" type="submit">CONFIRM</button>
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
              <p>ACTIF: {isEditing ?
                <input type="checkbox" checked={editedOption.actif} onChange={(e) => handleChangeProduits(e, 'actif')} /> 
                : (option.actif ? "OUI" : "NON")}</p>
              <p>NOUVEAUTÉ: {isEditing ?
                <input type="checkbox" checked={editedOption.nouveau} onChange={(e) => handleChangeProduits(e, 'nouveau')} /> 
                : (option.nouveau ? "OUI" : "NON")}</p>
              <p>BOUTIQUE SEULEMENT: {isEditing ?
                <input type="checkbox" checked={editedOption.boutique} onChange={(e) => handleChangeProduits(e, 'boutique')} /> 
                : (option.boutique ? "OUI" : "NON")}</p>
              <p>TAG: {Array.isArray(option.tag) ? option.tag.join(', ') : ''}</p>
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