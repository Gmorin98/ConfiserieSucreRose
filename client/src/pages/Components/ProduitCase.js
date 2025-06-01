import styled from "styled-components";

// Component and Other Import
import BanniereNouveaute from "./BanniereNouveaute";

const ProduitCase = ({children}) => {
  children.sort((a, b) => a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" }))

  return (
    <>
      {children.length === 0 ? (
        <NoResult>
          <p className="noResult">Aucun produit trouvé</p>
        </NoResult>
      ) : (
        children
          .filter(produit => produit.actif) // Filter out inactive products
          .map((produit, id) => (
            <Wrapper key={id}>
              {produit.nouveau && <BanniereNouveaute />}
              <div className="imgContainer">
                <img src={produit.img} alt={produit.nom} loading="lazy"/>
              </div>
              <div className="info">
                <p>{produit.nom}</p>
                <p>{`${produit.prix}$`}</p>
              </div>
            </Wrapper>
          ))
      )}
    </>
  );
  
}

export default ProduitCase;

const NoResult = styled.div`
  p {
    color: var(--primary-color);
    font-size: 2em;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  background-color: #ffffff;
  width: 250px;
  height: fit-content;
  border-radius: 15px;
  margin: 0em 1.5em 3em;
  font-family: var(--font-primary);
  color: var(--primary-color);
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px,
              rgba(0, 0, 0, 0.09) 0px 4px 2px,
              rgba(0, 0, 0, 0.09) 0px 8px 4px,
              rgba(0, 0, 0, 0.09) 0px 16px 8px,
              rgba(0, 0, 0, 0.09) 0px 32px 16px;

  .imgContainer {
    display: flex;
    align-items: center;
    min-height: 150px;
    > img {
      max-height: 150px;
      padding: 0.5em;
    }
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5em;
    background-color: var(--background-color);
    border-radius: 0px 0px 15px 15px;

    p {
      margin: 0;
    }

    p:first-of-type {
      width: 70%;
    }
  }

  .banniere {
    color: #ffffff;
    position: absolute;
    top: 10px;
    right: -10px;
  }

  @media screen and (max-width: 900px) {
    width: 175px;
    margin: 0em 0 3em;;
    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      > p:first-of-type {
        width: 100%;
      }
    }
  }
`