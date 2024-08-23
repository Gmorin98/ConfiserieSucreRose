import React, { useState, useEffect } from "react";

export const AllFiltreContext = React.createContext();

const AllFiltreProvider = ({children}) => {
  const [filtreVracInfo, setFiltreVracInfo] = useState([]);
  const [filtreProduitInfo, setFiltreProduitInfo] = useState([]);

  useEffect(() => {
    const fetchFiltreVracInfo = async () => {
      try {
        const response = await fetch(`/getFiltre/Vrac`);
        if (!response.ok) {
          throw new Error("Failed to fetch Vrac Filtre");
        }
        const vracFiltreData = await response.json();
        setFiltreVracInfo(vracFiltreData.filtreInfo);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFiltreProduitsInfo = async () => {
      try {
        const response = await fetch(`/getFiltre/Produits`);
        if (!response.ok) {
          throw new Error("Failed to fetch Produits Filtre");
        }
        const produitsFiltreData = await response.json();
        setFiltreProduitInfo(produitsFiltreData.filtreInfo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiltreVracInfo();
    fetchFiltreProduitsInfo();
  }, []);

  return (
    <AllFiltreContext.Provider value={{ filtreVracInfo, filtreProduitInfo }}>
      {children}
    </AllFiltreContext.Provider>
  );
};

export default AllFiltreProvider;