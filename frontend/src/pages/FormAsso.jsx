import React, { useState } from "react";

import { notifySuccess, notifyError, api } from "@services/services";
import "react-toastify/dist/ReactToastify.css";
import "@style/Form.css";

export default function FormAsso() {
  const [buttonText, setButtonText] = useState("Envoyer ma pré-inscription");

  const [association, setAssociation] = useState({
    password: "",
    passCheck: "",
  });
  function handleChange(e) {
    setAssociation({
      ...association,
      [e.target.name]: e.target.value,
    });
  }

  const ENDPOINT = "/associations";
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post(ENDPOINT, association)
      .then(() => {
        if (association.password === association.passCheck) {
          setButtonText(
            "Merci, votre pré-inscription a bien été prise en compte"
          );

          notifySuccess(
            "Votre pré-inscription a été enregistrée. Un administrateur vous contactera bientôt pour vous informer de l'avancement de votre dossier"
          );
        } else {
          notifyError(
            "Votre pré-inscription n'a pas pu aboutir. Veuillez vérifier les champs à remplir avant de soumettre à nouveau votre pré-inscription"
          );
        }
      })
      .catch(() => {
        setButtonText(
          "Erreur, vérifier si toutes vos informations sont correctes"
        );
        notifyError(
          "Votre pré-inscription n'a pas pu aboutir. Veuillez vérifier les champs à remplir avant de soumettre à nouveau votre pré-inscription"
        );
      });
  };

  return (
    <div className="register">
      <div className="back">
        <form action="#" onSubmit={handleSubmit} method="post">
          <div className="register_form">
            <h1>Demande d'inscription pour les associations</h1>
            <div className="box_form">
              <div className="form-group">
                <input
                  type="text"
                  id="form_asso_name"
                  required
                  onChange={handleChange}
                  name="nom"
                  className="form-control"
                />
                <label
                  htmlFor="form_asso_name"
                  className="form-control-placeholder"
                >
                  Nom de votre association{" "}
                </label>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="form_asso_email"
                  required
                  onChange={handleChange}
                  name="email"
                  className="form-control"
                />
                <label
                  htmlFor="form_asso_email"
                  className="form-control-placeholder"
                >
                  Email
                </label>
              </div>
            </div>
            <div className="box_form">
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  id="form_asso_mdp"
                  required
                  onChange={handleChange}
                  autoComplete="off"
                  value={association.password}
                  className="form-control"
                />
                <label
                  htmlFor="form_asso_mdp"
                  className="form-control-placeholder"
                >
                  Choisir un mot de passe{" "}
                </label>
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="passCheck"
                  id="form_asso_mdp2"
                  required
                  autoComplete="off"
                  value={association.passCheck}
                  onChange={handleChange}
                  className="form-control"
                />
                <label
                  htmlFor="form_asso_mdp2"
                  className="form-control-placeholder"
                >
                  Retapez votre mot de passe{" "}
                </label>
              </div>
            </div>
            <div className="box_form">
              <div className="form-group">
                <input
                  type="text"
                  id="form_asso_adresse"
                  required
                  onChange={handleChange}
                  name="adresse"
                  className="form-control"
                />
                <label
                  htmlFor="form_asso_adresse"
                  className="form-control-placeholder"
                >
                  Adresse{" "}
                </label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="form_asso_code_postale"
                  required
                  onChange={handleChange}
                  name="code_postal"
                  className="form-control"
                />
                <label
                  htmlFor="form_asso_code_postale"
                  className="form-control-placeholder"
                >
                  Code Postal
                </label>
              </div>
            </div>
            <div className="box_form">
              <div className="form-group">
                <input
                  type="text"
                  id="form_asso_ville"
                  required
                  onChange={handleChange}
                  name="ville"
                  className="form-control"
                />
                <label
                  htmlFor="form_asso_ville"
                  className="form-control-placeholder"
                >
                  Ville{" "}
                </label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="form_asso_tel"
                  required
                  onChange={handleChange}
                  name="telephone"
                  className="form-control"
                />
                <label
                  htmlFor="form_asso_tel"
                  className="form-control-placeholder"
                >
                  Téléphone{" "}
                </label>
              </div>
            </div>
            <div className="form_textarea">
              <textarea
                id="form_message"
                name="pre_inscription_message"
                required
                onChange={handleChange}
              />
              <label htmlFor="form_message">Votre message </label>
            </div>
            <div className="submit_button">
              <button type="submit" className="button-blue">
                {buttonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
