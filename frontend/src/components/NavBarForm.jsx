import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { authentification, Deconnexion } from "@services/services";
import ExportContext from "../contexts/Context";

function NavBarForm(showForm) {
  const navigate = useNavigate();
  const { infoUser, setInfoUser } = useContext(ExportContext.Context);
  const [isLog, setIsLog] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (isLog) {
      navigate("/back_office");
    } else {
      navigate("/");
    }
  }, [isLog]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authentification(user, setIsLog, setInfoUser);
  };

  return (
    <div
      className={`${
        isLog === false
          ? "navbar-connect-container"
          : "navbar-connect-container-2"
      }`}
    >
      {infoUser.email !== undefined && infoUser.email !== null ? (
        <button
          className="button-blue navbar-input"
          type="button"
          onClick={() => Deconnexion(navigate, setInfoUser)}
        >
          Déconnexion
        </button>
      ) : (
        <form
          action=""
          method="post"
          className="navbar-form_members"
          onSubmit={handleSubmit}
        >
          <legend className="navbar-legend">Déjà membre</legend>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              required
              onClick={() => showForm(true)}
              onChange={handleChange}
              className="form-control "
            />
            <label htmlFor="email" className="form-control-placeholder ">
              Email :{" "}
            </label>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={handleChange}
              className="form-control"
            />
            <label htmlFor="password" className="form-control-placeholder">
              Mot de passe :
            </label>
          </div>
          <div className="form-example ">
            <button className="button-blue navbar-input" type="submit">
              Connexion
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default NavBarForm;
