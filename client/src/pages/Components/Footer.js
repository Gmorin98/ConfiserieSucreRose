// Necessary Import
import styled from "styled-components";
import React, { useEffect, useState } from 'react';

// Components and Other Import
import { Loader } from "@googlemaps/js-api-loader";

const Footer = () => {
  const [isHoraireVisible, setIsHoraireVisible] = useState(false);
  const [isEmplacementVisible, setIsEmplacementVisible] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      
      version: "weekly",
    });

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 45.748571, lng: -73.603838 },
        zoom: 18,
      });

      new google.maps.Marker({
        position: { lat: 45.748571, lng: -73.603838 },
        map: map,
      });
    });
  }, []);

  const toggleVisibilityHoraire = () => {
    setIsHoraireVisible(!isHoraireVisible);
  }

  const toggleVisibilityEmplacement = () => {
    setIsEmplacementVisible(!isEmplacementVisible);
  }
  
  return (
    <Wrapper>
      <section className="logo">
        <img src="images/Logo_Nom.svg" width="400px"/>
        <div className="socials">
          <a href="https://www.facebook.com/profile.php?id=100085415413271" className="socials"><img src="images/Facebook_Icon.svg" width="40px"/></a>
          <a href="https://www.instagram.com/confiserie_sucre_rose/" className="socials"><img src="images/Instagram_Icon.svg" width="40px"/></a>
        </div>
      </section>
      <img src="images/Seperator.svg" height="250px" className="separateur"/>
      <section className="horaire">
        <div className="intro">
          <h3>Heures d'Ouverture</h3>
          <button onClick={() => {toggleVisibilityHoraire()}}>V</button>
        </div>
        <div className={isHoraireVisible ? "" : "hidden"}>
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
        </div>
      </section>
      <img src="images/Seperator.svg" height="250px" className="separateur"/>
      <section className="emplacement">
        <div className="intro">
          <h3>Contactez-nous</h3>
          <button onClick={() => toggleVisibilityEmplacement()}>V</button>
        </div>
        <div className={isEmplacementVisible ? "" : "hidden"}>
          <div id="map" className="map" />
          <p>Addresse : 2918 Ch Sainte-Marie, Mascouche, QC J7K 1N7</p>
          <p>Téléphone : (514) 730-0259</p>
          <p>Email : confiseriesucrerose@gmail.com</p>
        </div>
      </section>
      <div className="credit">
        <p>Site web fait par Gabriel</p>
      </div>
    </Wrapper>
  )
}

export default Footer;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  color: var(--primary-color);
  background-color: var(--background-color);
  border-radius: 35px 35px 0px 0px;
  font-family: var(--font-primary);
  padding: 50px 15px;
  
  button {
    cursor: pointer;
  }

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
    flex-direction: column;
    align-items: center;
    img:first-of-type {
      width: 350px;
      max-width: 100%; // This cause the logo to take 100% of the space available!! NEED TO CHANGE
    }
    .socials {
      display: flex;
      width: 100%;
      justify-content: center;
      > a {
        width: 50px;
        margin: 2em 1em 0 1em;
      }
    }

    img:not(:first-of-type) {
      margin: 45px 25px 0px 25px;
    }
  }

  .horaire > div > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px var(--primary-color);
  }

  .intro > button {
      display: none;
    } 

  .map {
    width: 50%;
    height: 150px;
  }

  .credit {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3em;
    width: 100%;
  }

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;

    > section {
      width: 80%;
      margin-bottom: 2em;
    }

    .intro {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      button {
        display: block;
        border: none;
        background-color: transparent;
        color: var(--primary-color);
        font-weight: bold;
      }
    }

    .separateur {
      display: none;
    }

    .hidden {
      display: none;
    }

    .map {
      width: 100%;
    }
  }
`