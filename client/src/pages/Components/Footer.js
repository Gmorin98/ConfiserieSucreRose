// Necessary Import
import styled from "styled-components";
import React, { useEffect } from 'react';

// Components and Other Import
import { Loader } from "@googlemaps/js-api-loader";

const Footer = () => {

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
  
  return (
    <Wrapper>
      <section className="logo">
        <img src="images/Logo_Nom.svg" width="400px"/>
        <a href="https://www.facebook.com/profile.php?id=100085415413271" className="socials"><img src="images/Facebook_Icon.svg" width="40px"/></a>
        <a href="https://www.instagram.com/confiserie_sucre_rose/" className="socials"><img src="images/Instagram_Icon.svg" width="40px"/></a>
      </section>
      <img src="images/Seperator.svg" height="250px"/>
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
      <img src="images/Seperator.svg" height="250px"/>
      <section className="emplacement">
        <div id="map" style={{ height: "150px", width: "50%" }} />
        <p>Addresse : 2918 Ch Sainte-Marie, Mascouche, QC J7K 1N7</p>
        <p>Téléphone : (514) 730-0259</p>
        <p>Email : confiseriesucrerose@gmail.com</p>
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
    align-content: space-around;
    img:first-of-type {
      width: 100%; // This cause the logo to take 100% of the space available!! NEED TO CHANGE
    }
    .socials {
      margin: 1.5em;
      height: fit-content;
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

  .credit {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3em;
    width: 100%;
  }
`