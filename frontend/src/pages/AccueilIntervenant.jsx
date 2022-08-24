import React from "react";
import { NavLink } from "react-router-dom";

import "@style/App.css";
import "@style/AccueilAsso.css";

export default function AccueilIntervenant() {
  return (
    <div>
      <header>
        <div className="landing-background">
          <h1>Intervenant</h1>
        </div>
      </header>
      <div className="presentationText">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
          molestias quisquam eum laboriosam mollitia voluptates! Accusantium
          pariatur ipsum accusamus laboriosam quam aspernatur, perferendis
          magniquod non qui unde eligendi ipsa.
        </p>
      </div>
      <div className="data">
        <img
          src="https://img.icons8.com/bubbles/344/bullish.png"
          alt=""
          className="home-inter-icons"
        />
        <img
          src="https://img.icons8.com/bubbles/344/help.png"
          alt=""
          className="home-inter-icons"
        />
        <img
          src="https://img.icons8.com/bubbles/344/test-passed.png"
          alt=""
          className="home-inter-icons"
        />
      </div>
      <div className="contactUsjoinUs">
        <div>
          <NavLink to="/formulaire_intervenant">
            <input
              id="button_preinscription"
              className="button-blue"
              value="Nous rejoindre"
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
