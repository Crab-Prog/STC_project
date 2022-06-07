import React from "react";
import "@style/App.css";
import "@style/AccueilAsso.css";

export default function AccueilAsso() {
  return (
    <div>
      <div className="imgAsso">
        <img
          src="https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="association"
        />
        <div className="assoTitle">
          <h1>ASSOCIATION</h1>
        </div>
      </div>
      <div className="presentationText">
        <p>
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
          molestias quisquam eum laboriosam mollitia voluptates! Accusantium
          pariatur ipsum accusamus laboriosam quam aspernatur, perferendis magni
          quod non qui unde eligendi ipsa.
        </p>
      </div>
      <div className="data">
        <div className="keyData" />
        <div className="keyData" />
        <div className="keyData" />
      </div>
      <div className="joinUs">
        <button type="button" className="button-blue">
          <p>Nous rejoindre</p>
        </button>
      </div>
    </div>
  );
}