import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Deconnexion } from "@services/services";
import "@style/NavBar.css";

import NavBarLinks from "@components/NavBarLinks";
import NavBarForm from "@components/NavBarForm";
import logo from "@assets/logo-STC.png";
import ExportContext from "../contexts/Context";

function NavBar({ isLinkVisible, showLink, isFormVisible, showForm }) {
  const { infoUser, setInfoUser } = useContext(ExportContext.Context);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLogInVisible, setIsLogInVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (infoUser.email !== undefined && infoUser.email !== null) {
      setIsLogInVisible(true);
    } else {
      setIsLogInVisible(false);
    }
  }, [infoUser]);

  const handleisMenuVisible = (isVisible) => {
    setIsMenuVisible(isVisible);
  };

  const backOfficeAccess = () => {
    if (isLogInVisible) {
      return (
        <div
          role="button"
          tabIndex={0}
          className="navbar-button"
          onClick={() => {
            handleisMenuVisible(false);
            showLink(false);
          }}
        >
          <img
            src="https://img.icons8.com/sf-ultralight/344/home-automation.png"
            alt=""
            className="navbar-icon"
          />
          <h2 onClick={() => navigate("/back_office")}>Tableau de bord</h2>
        </div>
      );
    }
    return "";
  };

  return (
    <div className="fixed">
      <nav className={`${isMenuVisible ? "navbar-visible" : "navbar-hidden"}`}>
        <div className="navbar-div_logo">
          <img
            className="navbar-logo"
            src={logo}
            alt="logo de la Social Team Consulting"
            onClick={() => navigate("/")}
          />
        </div>
        <h1 className="title">Social Team Consulting</h1>
        <div
          className="navbar-burger"
          role="button"
          onClick={() => {
            handleisMenuVisible(!isMenuVisible);
          }}
          tabIndex={0}
        >
          <span className="navbar-bar" />
        </div>
        <div className="navbar-inline">
          <ul className="navbar-list-landing">
            {isLogInVisible ? <li>{backOfficeAccess()}</li> : ""}
            <li
              className={`${isLinkVisible ? "navbar-li_highlight" : ""}`}
              onClick={() => {
                showLink(!isLinkVisible);
                showForm(false);
              }}
            >
              <h2>Nous rejoindre</h2>
              <div
                className={`${
                  isLinkVisible
                    ? "navbar-navbarlink-visible"
                    : "navbar-navbarlink-hidden"
                }`}
              >
                <NavBarLinks
                  navigate={navigate}
                  isLogInVisible={isLogInVisible}
                  handleisMenuVisible={handleisMenuVisible}
                  showLink={showLink}
                />
              </div>
            </li>
            <li
              className={`${isFormVisible ? "navbar-li_highlight" : ""}`}
              onClick={() => {
                showLink(false);
              }}
            >
              <div
                role="button"
                tabIndex={0}
                className="navbar-button"
                onClick={() => {
                  handleisMenuVisible(false);
                  showLink(false);
                }}
              >
                {infoUser.email !== undefined && infoUser.email !== null ? (
                  <h2 onClick={() => Deconnexion(navigate, setInfoUser)}>
                    Déconnexion
                  </h2>
                ) : (
                  <h2
                    onClick={() => {
                      showForm(!isFormVisible);
                    }}
                  >
                    <img
                      src="https://www.svgrepo.com/show/347992/user.svg"
                      alt=""
                      className="navbar-log-icon"
                    />
                    Connexion
                  </h2>
                )}
              </div>
              <div
                className={`${
                  isFormVisible
                    ? "navbar-navbarform-visible"
                    : "navbar-navbarform-hidden"
                } ${isLogInVisible ? "navbar-navbarform-visible-login" : ""}`}
              >
                {isFormVisible ? (
                  <NavBarForm
                    handleisMenuVisible={handleisMenuVisible}
                    showForm={showForm}
                  />
                ) : (
                  ""
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className="navbar-menu_wrapper">
          {isLogInVisible ? <hr className="navbar-hr" /> : ""}
          {backOfficeAccess()}
          <hr className="navbar-hr" />

          <NavBarLinks
            navigate={navigate}
            isLogInVisible={isLogInVisible}
            handleisMenuVisible={handleisMenuVisible}
            showLink={showLink}
          />
          <hr className="navbar-hr" />
          {isMenuVisible ? <NavBarForm /> : ""}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
