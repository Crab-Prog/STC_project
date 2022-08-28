import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@style/Form.css";
import { notifySuccess, notifyError, api } from "@services/services";

function FormAssoContact() {
  const [buttonText, setButtonText] = useState("Envoyer le message");

  const [messageValue, setMessageValue] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    api
      .post("/messages", {
        nom: messageValue.nom,
        email: messageValue.email,
        telephone: messageValue.telephone,
        message: messageValue.message,
      })
      .then(() => {
        setButtonText("Votre message a été envoyé");
        notifySuccess(
          "Votre message a bien été envoyé. Un administrateur vous contactera bientôt."
        );
        navigate("/");
      })
      .catch(() => {
        setButtonText("Erreur lors de l'envoi du message");
        notifyError("Votre message n'a pas pu être envoyé.");
      });
  };

  const handleChangeMessage = (event) => {
    setMessageValue({
      ...messageValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="register_asso">
      <div className="back">
        <form onSubmit={handleSubmitMessage}>
          <div className="register_form">
            <h1>
              Vous êtes une association et vous <br />
              souhaitez nous contacter ?
            </h1>
            <h2>Nous vous invitons à remplir ce formulaire</h2>
            <div className="form-inter-container middle-box">
              <div className="form-group">
                <input
                  type="text"
                  id="asso_name"
                  name="nom"
                  required
                  value={messageValue.nom}
                  onChange={handleChangeMessage}
                  className="form-control"
                />
                <label htmlFor="asso_name" className="form-control-placeholder">
                  <p>Nom de votre association</p>{" "}
                </label>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  required
                  id="asso_email"
                  value={messageValue.email}
                  onChange={handleChangeMessage}
                  className="form-control"
                />
                <label
                  htmlFor="asso_email"
                  className="form-control-placeholder"
                >
                  <p>Email</p>
                </label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="asso_tel"
                  name="telephone"
                  required
                  value={messageValue.telephone}
                  onChange={handleChangeMessage}
                  className="form-control"
                />
                <label htmlFor="asso_tel" className="form-control-placeholder">
                  <p>Téléphone</p>{" "}
                </label>
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  required
                  value={messageValue.message}
                  onChange={handleChangeMessage}
                  className="form-control"
                />
                <label htmlFor="message" className="form-control-placeholder">
                  <p>Votre message</p>
                </label>
              </div>
              <div className="submit_button">
                <input
                  type="submit"
                  className="button-blue"
                  value={buttonText}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormAssoContact;
