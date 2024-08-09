// Necessary Import
import styled from "styled-components";
import React, { useState, useEffect } from 'react';

// Component and Other Import

const Checkout = () => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const panierData = localStorage.getItem("panier");
    const items = panierData ? JSON.parse(panierData) : [];
    setItemList(items);
  }, []);
  
  return (
    <Wrapper>
      {itemList.map((item, id) => {
        return (
          <p key={id}>{item.nom}</p>
        )
      })}
    </Wrapper>
  );
}

export default Checkout;

const Wrapper = styled.div`
`;