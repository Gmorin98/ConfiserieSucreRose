// Necessary Import
import styled from "styled-components";

// Component and Other Import
import BanniereNouveaute from "./BanniereNouveaute";

const VracCase = ({ vrac }) => {

  return (
    <>
      {vrac.map((produit, id) => (
        produit.actif && (  // Only render if produit.actif is true
          <Wrapper key={id}>
            {produit.nouveau && <BanniereNouveaute />}
            <img src={produit.img} alt={produit.nom} loading="lazy"/>
            <p className="nom">{produit.nom}</p>
          </Wrapper>
        )
      ))}
    </>
  );
};

export default VracCase;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  width: 15%;
  min-width: 200px;
  height: fit-content;
  border-radius: 15px;
  margin: 2em 1.5em;
  font-family: var(--font-primary);
  color: var(--primary-color);
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, 
              rgba(0, 0, 0, 0.09) 0px 4px 2px, 
              rgba(0, 0, 0, 0.09) 0px 8px 4px, 
              rgba(0, 0, 0, 0.09) 0px 16px 8px, 
              rgba(0, 0, 0, 0.09) 0px 32px 16px;

  > img {
    height: 150px;
    padding: 0.5em;
  }

  .nom {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    padding: 0.5em;
  }

  .quantite {
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: space-evenly;
    align-items: center;
    background-color: var(--background-color);
    border-radius: 15px;

    button {
      width: 20%;
      height: fit-content;
      color: var(--primary-color);
      background-color: var(--background-color);
      font-size: 2em;
      border: none;
      cursor: pointer;
    }
    
    p {
      padding: 0.5em;
      cursor: not-allowed;
    }
  }

  @media screen and (max-width: 900px) {
    margin: 10px;
    width: 150px;
    min-width: 175px;
  }
`