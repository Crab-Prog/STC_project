import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ExportContext from "../contexts/Context";

import "@style/NotFound.css";

export default function NotFound() {
  const { infoUser } = useContext(ExportContext.Context);

  return (
    <div style={{ margin: "1rem 0px 3rem 0px" }}>
      <h1>Oops! Vous semblez perdu.</h1>
      <h2>Retournez sur des pages accessibles:</h2>
      {infoUser.role !== null ? (
        <div className="not-found-link-container">
          <Link to="/" className="not-found-link">
            Page d'accueil
          </Link>
          <Link to="/back_office" className="not-found-link">
            Mon tableau de bord
          </Link>
          <Link to="/back_office/mon_profil" className="not-found-link">
            Mon profil
          </Link>
        </div>
      ) : (
        <div className="not-found-link-container">
          <Link to="/" className="not-found-link">
            Page d'accueil
          </Link>
          <Link to="/formulaire_association" className="not-found-link">
            Inscription association
          </Link>
          <Link to="/formulaire_intervenant" className="not-found-link">
            Inscription intervenant
          </Link>
        </div>
      )}
    </div>
  );
}
