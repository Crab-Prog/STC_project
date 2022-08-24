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
            {administrateur.nom}
            <input
              className="rules"
              type="text"
              name="nom"
              placeholder="Tapez un nouveau nom"
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <div className="profil-form-box">
          <label htmlFor="firstname" className="backoffice-input-half">
            {administrateur.prenom}
            <input
              className="rules"
              type="text"
              name="prenom"
              placeholder="Tapez un nouveau prenom"
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <div className="profil-form-box">
          <label htmlFor="mail" className="backoffice-input-half">
            {administrateur.email}
            <input
              className="rules"
              type="text"
              name="email"
              placeholder="Tapez un nouveau email"
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <div className="profil-form-box">
          <label htmlFor="phone" className="backoffice-input-half">
            {administrateur.telephone}
            <input
              className="rules"
              type="text"
              name="telephone"
              placeholder="Tapez un nouveau téléphone"
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
