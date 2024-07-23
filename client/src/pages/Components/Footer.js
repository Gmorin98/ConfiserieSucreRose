// Necessary Import
import styled from "styled-components";
import React from 'react';

// Components and Other Import

const Footer = () => {
  return (
    <Wrapper>
      <section className="logo">
        <img src="images/Logo_Nom.svg" width="400px"/>
        <a href="https://www.facebook.com/profile.php?id=100085415413271"><img src="images/Facebook_Icon.svg" width="40px"/></a>
        <a href="https://www.instagram.com/confiserie_sucre_rose/"><img src="images/Instagram_Icon.svg" width="40px"/></a>
      </section>
      <section className="horaire">
        <h3>Heures d'Ouverture</h3>
        <div>
          <p>Lundi</p>
          <p>Fermé</p>
        </div>
        <div>
          <p>Mardi</p>
          <p>10h00 - 18h00</p>
        </div>
        <div>
          <p>Mercredi</p>
          <p>10h00 - 18h00</p>
        </div>
        <div>
          <p>Jeudi</p>
          <p>10h00 - 18h00</p>
        </div>
        <div>
          <p>Vendredi</p>
          <p>10h00 - 19h00</p>
        </div>
        <div>
          <p>Samedi</p>
          <p>10h00 - 17h00</p>
        </div>
        <div>
          <p>Dimanche</p>
          <p>10h00 - 16h00</p>
        </div>
      </section>
      <section className="emplacement">

      </section>
    </Wrapper>
  )
}

export default Footer;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  color: var(--primary-color);
  background-color: var(--background-color);
  border-radius: 35px 35px 0px 0px;
  font-family: var(--font-primary);
  padding: 50px 15px;

  h3 {
    font-family: var(--font-secondary);
    font-size: 2em;
  }

  section {
    width: 25%;
  }

  .logo {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    img:first-of-type {
      width: 100%; // This cause the logo to take 100% of the space available!! NEED TO CHANGE
    }

    img:not(:first-of-type) {
      margin: 45px 25px 0px 25px;
    }
  }

  .horaire > div{
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px var(--primary-color);
  }
`