// Necessary Import
import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const PanierCheckout = () => {
  const [itemCount, setItemCount] = useState(0);

  const updateItemCount = () => {
    const panierData = localStorage.getItem("panier");
    const items = panierData ? JSON.parse(panierData) : [];
    setItemCount(items.length);
  }

  useEffect(() => {
    updateItemCount();
    const intervalId = setInterval(updateItemCount, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Wrapper>
      <img src="images/Shopping_Bag_Lolli.svg" alt="sacPanier" />
      {itemCount > 0 && (
        <Badge>{itemCount}</Badge>
      )}
    </Wrapper>
  )
}

export default PanierCheckout;

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  img {
    width: 60px;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #B63643;
  color: white;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
`;