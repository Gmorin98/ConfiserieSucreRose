// Necessary Import
import styled from "styled-components";

// Component and Other Import
import VracCase from "../../Components/VracCase";

const VracShowcase = ({vrac}) => {

  return (
    <Wrapper>
      {vrac.length === 0 ? ( 
        <p className="information">Aucun bonbons trouvé</p> 
      ) : (
        <VracCase vrac={vrac.sort((a, b) => a.nom.localeCompare(b.nom))} />
      )}
    </Wrapper>
  )
}

export default VracShowcase;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
  color: var(--primary-color);
  
  .wrapperQuantiteSac {
    height: 0;
    position: sticky;
    top: 10px;
    z-index: 5;
  }
  
  .quantiteSac {
    width: 80px;
    height: fit-content;
    padding: 5px;
    margin-right: -80px;
    font-size: 1.5em;
    text-align: center;
    border-radius: 10px;
    background-color: var(--background-color);
    text-align: center;
    p:first-of-type {
      border-bottom: 1px solid;
    }
  }

  .information {
    margin-top: 1em;
    font-size: 2em;
  }

  @media screen and (max-width: 1200px) {
    .wrapperQuantiteSac {
      top: 125px;
    }
  }
`