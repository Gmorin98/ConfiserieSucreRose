// Necessary Import
import styled from "styled-components";

const listSac = [
  {nom: "Petit Cône 125g", img: "images/Vrac/Sacs/Petit_Cone_Crop.png"},
  {nom: "Sac 175g", img: "images/Vrac/Sacs/Sac_Crop.png"},
  {nom: "Grand Cône 225g", img: "images/Vrac/Sacs/Grand_Cone_Crop.png"},
  {nom: "Verre en vitre avec Paille 325g", img: "images/Vrac/Sacs/Verre_Pascale_Crop.png"},
  {nom: "Plateau 1000g", img: "images/Vrac/Sacs/Plateau_Crop.png"}, 
  {nom: "Plateau 1300g", img: "images/Vrac/Sacs/Plateau_Crop.png"}
]

const SelectionSac = () => {
  return (
    <Wrapper>
      {listSac.map((sac, id) => {
        return (
          <div key={id} >
            <img src={sac.img} alt={sac.nom} loading="lazy"/>
            <div>
              <p>{sac.nom}</p>
            </div>
          </div>
        )
      })}
    </Wrapper>
  )
}

export default SelectionSac;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > div {
    display: flex;
    color: var(--primary-color);
    font-family: var(--font-primary);
    width: 20%;
    min-width: 250px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 35px;
    background-color: #ffffff;
    margin: 1em 1.5em;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px,
                rgba(0, 0, 0, 0.09) 0px 4px 2px,
                rgba(0, 0, 0, 0.09) 0px 8px 4px,
                rgba(0, 0, 0, 0.09) 0px 16px 8px,
                rgba(0, 0, 0, 0.09) 0px 32px 16px;

    img {
      max-height: 150px;
      padding: 1em;
    }

    > div {
      text-align: center;
      background-color: var(--background-color);
      width: 100%;
      border-radius: 0px 0px 15px 15px;
      padding: 0.5em;
    }
  }
`