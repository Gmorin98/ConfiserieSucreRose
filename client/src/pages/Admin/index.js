// Necessary Import
import styled from "styled-components";
import React, { useContext, useState, useEffect } from 'react';

// Component and Other Import
import Authentification from "./SubComponent/Authentification";
import { AllProduitsContext } from "../../contexts/AllProduitsContext";
import { AllFiltreContext } from "../../contexts/AllFiltreContext";
import ProduitsInventaire from "./SubComponent/produitsInventaire";
import ListeTag from "./SubComponent/listeTag";
import Evenement from "./SubComponent/evenement";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { allVrac, allProduits } = useContext(AllProduitsContext);
  const { filtreVracInfo, setFiltreVracInfo, filtreProduitInfo, setFiltreProduitInfo} = useContext(AllFiltreContext);
  const [allEvenement, setAllEvenement] = useState([]);
  const [currentInventaire, setCurrentInventaire] = useState("");
  const [sectionFiltre, setSectionFiltre] = useState("");
  const [optionSelectionne, setOptionSelectionne] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the item being edited
  const [editedOption, setEditedOption] = useState({}); // Track the edited fields
  const [trackError, setTrackError] = useState("");

  // Reset editingIndex when the selected options change
  useEffect(() => {
    setEditingIndex(null);
    setEditedOption({});
  }, [optionSelectionne]);

  // Retreive Evenement Info
  const fetchEvenementInfo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}getEvenementInfo`);
      if (!response.ok) {
        throw new Error("Failed to fetch the Evenement Info");
      }
      const allEvenementData = await response.json();
      setAllEvenement(allEvenementData.data);
      console.log(allEvenement);
    } catch (error) {
      console.error(error);
    }
  };
  fetchEvenementInfo();

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
  }, [allVrac, allProduits]);

  return (
    <div>
      {isLoggedIn ? false : <Authentification setIsLoggedIn={setIsLoggedIn} />}
      {!isLoggedIn ? true :      
        <Wrapper>
          <aside>
            <button onClick={() => { setOptionSelectionne(allVrac); setCurrentInventaire("Vrac"); }}>Vrac Inventaire</button>
            <button onClick={() => { setOptionSelectionne(filtreVracInfo); setCurrentInventaire("Filtre"); setSectionFiltre("Vrac") }}>Filtre Vrac Option</button>
            <button onClick={() => { setOptionSelectionne(allProduits); setCurrentInventaire("Produits"); }}>Produits Inventaire</button>
            <button onClick={() => { setOptionSelectionne(filtreProduitInfo); setCurrentInventaire("Filtre"); setSectionFiltre("Produits")}}>Filtre Produits Option</button>
            <button onClick={() => { setOptionSelectionne(allEvenement); setCurrentInventaire("Evenement")}}>Evenement</button>
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
          {(currentInventaire !== "" && currentInventaire !== "Filtre" && currentInventaire !== "Evenement") && 
            <ProduitsInventaire 
              currentInventaire={currentInventaire} 
              optionSelectionne={optionSelectionne} 
              setOptionSelectionne={setOptionSelectionne} 
              editedOption={editedOption} 
              setEditedOption={setEditedOption} 
              editingIndex={editingIndex} 
              setEditingIndex={setEditingIndex} 
              trackError={trackError} 
              setTrackError={setTrackError} 
              allProduits={allProduits}
              allVrac={allVrac}
              />}
          {currentInventaire === "Filtre" && 
            <ListeTag 
              optionSelectionne={optionSelectionne}
            setOptionSelectionne={setOptionSelectionne} 
            sectionFiltre={sectionFiltre}
            filtreVracInfo={filtreVracInfo}
            setFiltreVracInfo={setFiltreVracInfo}
            filtreProduitInfo={filtreProduitInfo}
              setFiltreProduitInfo={setFiltreProduitInfo}
              />}
          {(currentInventaire === "Evenement" ) && 
            <Evenement 
              optionSelectionne={optionSelectionne} 
              setOptionSelectionne={setOptionSelectionne} 
              editedOption={editedOption} 
              setEditedOption={setEditedOption} 
              editingIndex={editingIndex} 
              setEditingIndex={setEditingIndex} 
              trackError={trackError} 
              setTrackError={setTrackError} 
              />}
        </Wrapper>
      }
    </div>
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
  .selectionTagWrapper {
    position: sticky;
    top: 0;
    > section {
      margin-bottom: 1em;
    }
  }
`

const TagButton = styled.button`
  background-color: ${props => props.selected ? "limegreen" : "white"};
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
`