import React, { useState, useEffect, useContext } from "react";
import { notifySuccess, notifyError, api } from "@services/services";
import ExportContext from "../contexts/Context";

import "../style/ModifProfil.css";
import "../style/Form.css";

function ModifProfil() {
  const { infoUser } = useContext(ExportContext.Context);
  const [user, setUser] = useState({});

  useEffect(() => {
    /*
     ** UseEffect to load the correct route depending of the type of user
     */

    let ENDPOINT = "";
    const ENDPOINTADMINISTRATEUR = `/administrateurs/bymail/${infoUser.email}`;
    const ENDPOINTASSOCIATION = `/associations/bymail/${infoUser.email}`;
    const ENDPOINTINTERVENANT = `/intervenants/bymail/${infoUser.email}`;
    if (infoUser.role === "association") {
      ENDPOINT = ENDPOINTASSOCIATION;
    }
    if (infoUser.role === "intervenant") {
      ENDPOINT = ENDPOINTINTERVENANT;
    }
    if (infoUser.role === "administrateur") {
      ENDPOINT = ENDPOINTADMINISTRATEUR;
    }
    api
      .get(ENDPOINT)
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  // const [isPasswordVisilbe, setIsPasswordVisilbe] = useState({
  //   oldPassword: false,
  //   newPassword: false,
  //   newPasswordConfirm: false,
  // });
  const [isPasswordVisilbe, setIsPasswordVisilbe] = useState(false);
  const [newPass, setNewPass] = useState();

  // const handleShowPassword = (e, inputChoice) => {
  //   e.preventDefault();
  //   setIsPasswordVisilbe({
  //     ...isPasswordVisilbe,
  //     [inputChoice]: !isPasswordVisilbe[inputChoice],
  //   });
  // };

  function handleChange(e) {
    setNewPass({
      ...newPass,
      [e.target.name]: e.target.value,
    });
  }

  const changeMPD = (e) => {
    e.preventDefault();
    let ENDPOINTMDP = "";
    const ENDPOINTMDPINTER = `/intervenants/mpd/${user.id}`;
    const ENDPOINTMDPADMIN = `/administrateurs/mpd/${user.id}`;
    const ENDPOINTMDPASSO = `/associations/mpd/${user.id}`;
    const password = newPass.oldPassword;
    const { newPassword } = newPass;

    if (infoUser.role === "association") {
      ENDPOINTMDP = ENDPOINTMDPASSO;
    }
    if (infoUser.role === "intervenant") {
      ENDPOINTMDP = ENDPOINTMDPINTER;
    }
    if (infoUser.role === "administrateur") {
      ENDPOINTMDP = ENDPOINTMDPADMIN;
    }
    api
      .put(ENDPOINTMDP, { password, newPassword })
      .then(() => {
        notifySuccess("Votre nouveau mot de passe a été enregistré.");
      })
      .catch(() => {
        notifyError("Votre changement de mot de passe n'a pas pu aboutir.");
      });
  };

  const handleShow = () => {
    setIsPasswordVisilbe(!isPasswordVisilbe);
  };
  return (
    <div className="modifProfil">
      <h1>
        {user.nom} {user.prenom}
      </h1>
      <p>{user.adresse}</p>
      <p>
        {user.code_postal} {user.ville}
      </p>
      <p>{user.email}</p>
      <p>{user.telephone}</p>
      <div className="modifProfil-card-container">
        <h2 className="modifProfil-h2">Changer mon mot de passe</h2>
        <form method="PUT" action="#" className="modifProfil-form">
          <div className="modifProfil-container">
            <div className="form-group">
              <input
                className="form-control"
                type={isPasswordVisilbe ? "text" : "password"}
                name="oldPassword"
                onChange={handleChange}
                id="passOld"
                required
              />
              <label htmlFor="passOld" className="form-control-placeholder">
                Mot de passe actuel
              </label>
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type={isPasswordVisilbe ? "text" : "password"}
                name="newPassword"
                onChange={handleChange}
                id="passNew"
                required
              />
              <label className="form-control-placeholder" htmlFor="passNew">
                Nouveau mot de passe
              </label>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type={isPasswordVisilbe ? "text" : "password"}
                name="newPasswordConfirm"
                onChange={handleChange}
                id="passNewTry"
                required
              />
              <label className="form-control-placeholder" htmlFor="passNewTry">
                Confirmer le nouveau mot de passe
              </label>
            </div>
          </div>
          <div className="modif-profil-show-password-check">
            <input
              type="checkbox"
              id="show-password"
              onClick={() => handleShow()}
            />
            <label htmlFor="show-password">Montrer le mot de passe</label>
          </div>
          <button
            id="button_preinscription"
            className="button-blue"
            type="submit"
            onClick={(e) => changeMPD(e)}
            required
          >
            Valider mon nouveau mot de passe
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModifProfil;
