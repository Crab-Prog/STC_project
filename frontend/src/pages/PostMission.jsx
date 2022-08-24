import React, { useEffect, useState, useContext } from "react";
import metiers from "@services/metiers.json";
import { notifySuccess, notifyError, api } from "@services/services";
import "../style/PostMission.css";
import ExportContext from "../contexts/Context";

function PostMission() {
  const { infoUser } = useContext(ExportContext.Context);
  const [mission, setMissions] = useState({});
  const [assoID, setAssoID] = useState("");

  const ENDPOINTASSOCIATION = "/associations";
  useEffect(() => {
    /*
     ** UseEffect to load the id of the association
     ** id is needed to api.post "/missions"
     */
    api
      .get(ENDPOINTASSOCIATION)
      .then((res) => {
        setAssoID(
          res.data.filter((thisUser) => thisUser.email === infoUser.email)[0].id
        );
      })
      .catch((err) => {
        console.error(console.error(err));
      });
  }, []);

  function handleChange(e) {
    setMissions({
      ...mission,
      [e.target.name]: e.target.value,
      associations_id: assoID,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const ENDPOINT = "/missions";
    api
      .post(ENDPOINT, mission)
      .then(() => {
        notifySuccess("Votre mission été postée.");
        e.target.reset();
      })
      .catch(() => {
        notifyError(
          "L'envoie de votre mission n'a pas pu aboutir. Veuillez vérifier les champs à remplir avant de soumettre à nouveau votre mission."
        );
      });
  };

  return (
    <div>
      <form action="#" method="post" onSubmit={handleSubmit}>
        <div className="post-mission-container">
          <h1>Créer une mission</h1>
          <div>
            <div className="backoffice-bloc">
              <div className="form-group">
                <input
                  type="text"
                  id="post_mission_intitule"
                  required
                  name="intitule"
                  onChange={handleChange}
                  className="form-control"
                />
                <label
                  htmlFor="post_mission_intitule"
                  className="form-control-placeholder"
                >
                  <p>Nom de la mission</p>{" "}
                </label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="post_mission_adresse"
                  required
                  name="adresse"
                  onChange={handleChange}
                  className="form-control"
                />
                <label
                  htmlFor="post_mission_adresse"
                  className="form-control-placeholder"
                >
                  Adresse
                </label>
              </div>
            </div>
            <div className="backoffice-bloc">
              <div className="form-group">
                <input
                  type="text"
                  id="post_mission_c-postal"
                  required
                  name="code_postal"
                  onChange={handleChange}
                  className="form-control"
                />
                <label
                  htmlFor="post_mission_c-postal"
                  className="form-control-placeholder"
                >
                  <p>Code postal</p>
                </label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="post_mission_ville"
                  required
                  name="ville"
                  onChange={handleChange}
                  className="form-control"
                />
                <label
                  htmlFor="post_mission_ville"
                  className="form-control-placeholder"
                >
                  <p>Ville</p>
                </label>
              </div>
            </div>
            <div className="backoffice-bloc">
              <div className="form-group">
                <label htmlFor="post_mission_date-deb" className="">
                  <p>Date debut</p>
                </label>
                <input
                  type="date"
                  id="post_mission_date-deb"
                  required
                  name="date_debut"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="post_mission_date-fin" className="">
                  <p>Date fin</p>
                </label>
                <input
                  type="date"
                  id="post_mission_date-fin"
                  required
                  name="date_fin"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="backoffice-bloc">
              <div className="form-group">
                <label htmlFor="post_mission_horaire_debut" className="">
                  <p>Horaires debut</p>{" "}
                </label>
                <input
                  type="time"
                  id="post_mission_horaire_debut"
                  required
                  name="horaire_debut"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="post_mission_horaire-fin" className="">
                  <p>Horaires fin</p>
                </label>
                <input
                  type="time"
                  id="post_mission_horaire-fin"
                  required
                  placeholder="17h"
                  name="horaire_fin"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="backoffice-bloc">
              <div className="post-mission-job">
                <div className="form-group">
                  <select id="job_select" name="metier" onChange={handleChange}>
                    <option value="">--Choisir un type de travail--</option>
                    {metiers.map((metier) => {
                      return (
                        <option value={metier.metier} name="metier">
                          {`${metier.metier} `}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="post_mission_horaire-totale">
                    <p>Horaires totales travaillées</p>
                    <input
                      type="number"
                      id="post_mission_horaire-totale"
                      required
                      placeholder="ex: 35"
                      name="total_heure"
                      className="backoffice-input-half"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className="form-group">
                <textarea
                  type="text"
                  id="post_mission_desc"
                  required
                  className="form-control"
                  name="description"
                  onChange={handleChange}
                />
                <label
                  htmlFor="post_mission_desc"
                  className="form-control-placeholder"
                >
                  <p>DESCRIPTION</p>
                </label>
              </div>

              <div className="submit_button">
                <button type="submit" className="button-blue">
                  Envoyer la mission
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostMission;
