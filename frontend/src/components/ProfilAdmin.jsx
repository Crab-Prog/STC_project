import React, { useEffect, useState } from "react";
import { notifySuccess, notifyError, api } from "@services/services";
import { useLocation } from "react-router-dom";

import "@style/App.css";
import "@style/ProfilInterv.css";

export default function ProfilAdmin() {
  const { state } = useLocation();
  const { email } = state;
  const [administrateur, setAdministrateur] = useState([{}]);

  useEffect(() => {
    const ENDPOINT = `/administrateurs/bymail/${email}`;
    api.get(ENDPOINT).then((result) => {
      setAdministrateur(result.data[0]);
    });
  }, []);
  // On veut mettre a jour les informations d'un intervenant

  const updateAdministrateur = (e) => {
    e.preventDefault();
    const ENDPOINTUPDATEADMIN = `/administrateurs/${administrateur.id}`;
    api
      .put(ENDPOINTUPDATEADMIN, administrateur)
      .then(() => {
        notifySuccess("Le profil de l'administrateur a été modifié.");
      })
      .catch(() => {
        notifyError("Une erreur est survenue lors de la mise à jour.");
      });
  };

  // changement de valeur
  function handleChange(event) {
    setAdministrateur({
      ...administrateur,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <form
      className="backoffice_profil"
      method="PUT"
      onSubmit={updateAdministrateur}
    >
      <div>
        <div className="profil-form-box">
          <label htmlFor="name" className="backoffice-input-half">
            Nom
            <input
              className="rules"
              type="text"
              name="nom"
              placeholder={`${administrateur.nom}`}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <div className="profil-form-box">
          <label htmlFor="firstname" className="backoffice-input-half">
            Prénom
            <input
              className="rules"
              type="text"
              name="prenom"
              placeholder={`${administrateur.prenom}`}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <div className="profil-form-box">
          <label htmlFor="mail" className="backoffice-input-half">
            Email
            <input
              className="rules"
              type="text"
              name="email"
              placeholder={`${administrateur.email}`}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <div className="profil-form-box">
          <label htmlFor="phone" className="backoffice-input-half">
            Téléphone
            <input
              className="rules"
              type="text"
              name="telephone"
              placeholder={`${administrateur.telephone}`}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
      </div>
      <div className="backoffice_profilinterv_submit_button">
        <button className="button-blue" type="submit">
          Modifier le profil de l'administrateur
        </button>
      </div>
    </form>
  );
}
