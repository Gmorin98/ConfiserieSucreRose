import React, { useState, useEffect } from "react";

export const AllProduitsContext = React.createContext();

const AllProduitsProvider = ({ children }) => {
  // Context for "Cree ton Pot" page
  const [allVrac, setAllVrac] = useState([]);
  // Context for "Produits" page
  const [allProduits, setAllProduits] = useState([]);

  // Fetch all the products.
  useEffect(() => {
    const fetchVracInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getAllProduits/Vrac`);
        if (!response.ok) {
          throw new Error("Failed to fetch Vrac");
        }
        const allProduitsData = await response.json();
        setAllVrac(allProduitsData.produitsInfo);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProduitsInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getAllProduits/Produits`);
        if (!response.ok) {
          throw new Error("Failed to fetch Products");
        }
        const allProduitsData = await response.json();
        setAllProduits(allProduitsData.produitsInfo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVracInfo();
    fetchProduitsInfo();
  }, []);

  return (
    <AllProduitsContext.Provider value={{ allProduits, setAllProduits, allVrac, setAllVrac }}>
      {children}
    </AllProduitsContext.Provider>
  );
};

export default AllProduitsProvider;
