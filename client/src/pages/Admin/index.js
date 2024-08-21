// Necessary Import
import styled from "styled-components";
import React, { useContext, useState, useEffect } from 'react';

// Component and Other Import
import { AllProduitsContext } from "../../contexts/AllProduitsContext";
import { AllFiltreContext } from "../../contexts/AllFiltreContext";
import ProduitsInventaire from "./SubComponent/produitsInventaire";
import ListeTag from "./SubComponent/listeTag";

const Admin = () => {
  const { allVrac, allProduits } = useContext(AllProduitsContext);
  const { filtreVracInfo, filtreProduitInfo } = useContext(AllFiltreContext);
  const [currentInventaire, setCurrentInventaire] = useState("");
  const [optionSelectionne, setOptionSelectionne] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the item being edited
  const [editedOption, setEditedOption] = useState({}); // Track the edited fields
  const [trackError, setTrackError] = useState("");

  // Reset editingIndex when the selected options change
  useEffect(() => {
    setEditingIndex(null);
    setEditedOption({});
  }, [optionSelectionne]);

  // Check for error message from fetches and log them to the console
  // FIX THIS, ALWAYS LOG UNDEFINED
  // useEffect(() => {
  //   if(trackError.status !== 200 && trackError !== undefined) {
  //     console.log(trackError.message);
  //   }
  // }, [trackError])

  const addTag = (tag) => {
    if (editedOption.tag.includes(tag)) {
      // If the tag is already selected, remove it from the array
      const newTagArray = editedOption.tag.filter((selectedTag) => selectedTag !== tag);
      setEditedOption({
        ...editedOption,
        tag: newTagArray,
      });
    } else {
      // If the tag is not selected, add it to the array
      const newTagArray = [...editedOption.tag, tag];
      setEditedOption({
        ...editedOption,
        tag: newTagArray,
      });
    }
  }
  useEffect (() => {
  }, [allVrac, allProduits])

  return (
    <Wrapper>
      <aside>
        <button onClick={() => { setOptionSelectionne(allVrac); setCurrentInventaire("Vrac"); }}>Vrac Inventaire</button>
        <button onClick={() => { setOptionSelectionne(filtreVracInfo); setCurrentInventaire("Filtre"); }}>Filtre Vrac Option</button>
        <button onClick={() => { setOptionSelectionne(allProduits); setCurrentInventaire("Produits"); }}>Produits Inventaire</button>
        <button onClick={() => { setOptionSelectionne(filtreProduitInfo); setCurrentInventaire("Filtre"); }}>Filtre Produits Option</button>
        {editingIndex !== null && 
          <div className="selectionTagWrapper">
            {(currentInventaire === "Vrac" ? filtreVracInfo : filtreProduitInfo).map((section, id) => {
              return (
                <section className="selectionTag" key={id}>
                  <h3>{section.titre}</h3>
                  <div> 
                    {section.options.map((option, id) => {
                      return (
                        <TagButton type="button" selected={editedOption.tag.includes(option)} onClick={() => addTag(option)} key={id}>{option}</TagButton>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        }
      </aside>
      {currentInventaire !== "Filtre" && 
        <ProduitsInventaire 
          currentInventaire={currentInventaire} 
          optionSelectionne={optionSelectionne} 
          setOptionSelectionne={setOptionSelectionne} 
          editedOption={editedOption} 
          setEditedOption={setEditedOption} 
          editingIndex={editingIndex} 
          setEditingIndex={setEditingIndex} 
          trackError={trackError} 
          setTrackError={setTrackError} />}
      {currentInventaire === "Filtre" && 
        <ListeTag 
        optionSelectionne={optionSelectionne}
        currentInventaire={currentInventaire}/>}
    </Wrapper>
  );
}

export default Admin;

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  button {
    cursor: pointer;
  }

  aside {
    display: flex;
    flex-direction: column;
    width: 20%;
    > button {
      border: none;
      background-color: var(--background-color);
      border-bottom: 1px solid var(--primary-color);
    }
    > button:hover {
      background-color: var(--primary-color);
    }
  }
  .selectionTagWrapper > section {
    margin-bottom: 1em;
  }
`

const TagButton = styled.button`
  background-color: ${props => props.selected ? "limegreen" : "white"};
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
`