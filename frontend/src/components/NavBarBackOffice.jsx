import React, { useContext, useEffect, useState } from "react";

import logo from "@assets/logo-STC.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Deconnexion, api } from "@services/services";

import NavBarBackOfficeLinks from "@components/NavBarBackOfficeLinks";

// import genericavatar from "@assets/genericavatar.png";

import DataLinks from "@services/links.json";

import ExportContext from "../contexts/Context";

import "@style/BackOffice.css";
import "@style/NavBar.css";
import NavDropDownMenu from "./NavDropDownMenu";

function NavBarBackOffice() {
  const { infoUser, setInfoUser } = useContext(ExportContext.Context);
  const [names, setNames] = useState({ nom: "", prenom: "" });
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const handleisMenuVisible = (isVisible) => {
    setIsMenuVisible(isVisible);
  };
  const navigate = useNavigate();

  if (infoUser.role === undefined) {
    return <div>Accès interdit !</div>;
  }

  useEffect(() => {
    const ENDPOINT = `/${infoUser.role}s/bymail/${infoUser.email}`;

    api
      .get(ENDPOINT)
      .then((user) => {
        setNames({ nom: user.data[0].nom, prenom: user.data[0].prenom });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="navbar-desktop-backoffice">
        {/* <div className="nav-part-one">
          <div className="navbar-desk-logo">
            <img
              className="navbar-logo"
              src={logo}
              alt="logo de la Social Team Consulting"
              onClick={() => navigate("/")}
            />
            <h1>Social Team Consulting</h1>
          </div>
          <div className="navbar-desk-img-profile">
            <img src={genericavatar} alt="profile" />
          </div>
          <div className="navbar-desk-name">
            <h1>
              {names.prenom} {names.nom}
            </h1>
          </div>
        </div> */}
        <div className="nav-part-one">
          <div className="navbar-desk-logo">
            <img
              className="navbar-logo"
              src={logo}
              alt="logo de la Social Team Consulting"
              onClick={() => navigate("/")}
            />
            <h1>Social Team Consulting</h1>
          </div>
          <div className="navbar-desk-avatar-container">
            <div className="navbar-desk-img-profile">
              <div className="navbar-desk-border-profile" />
            </div>
          </div>
          <div className="navbar-desk-name">
            <h1>
              {names.prenom} {names.nom}
            </h1>
          </div>
        </div>
        <div className="nav-part-two">
          <ul className="navbar-list">
            {infoUser.etat === "pré-inscrit" &&
            infoUser.role !== "administrateur" ? (
              <>
                <NavLink to="/back_office/mon_profil">
                  <li className="navbar-li_highlight">
                    <img
                      src="https://img.icons8.com/sf-ultralight/344/admin-settings-male.png"
                      alt=""
                      className="navbar-links-icons"
                    />
                    <h2>Profil</h2>
                  </li>
                </NavLink>
                <NavLink to="/back_office/mon_profil">
                  <li
                    className="navbar-li_highlight"
                    onClick={() => Deconnexion(navigate, setInfoUser)}
                  >
                    <img
                      src="https://img.icons8.com/sf-ultralight/344/exit.png"
                      alt=""
                      className="navbar-links-icons"
                    />
                    <h2>Déconnexion</h2>
                  </li>
                </NavLink>
              </>
            ) : (
              <>
                <NavDropDownMenu />
                {DataLinks.filter((r) => r[infoUser.role]).map((el) => {
                  if (el.section === "Déconnexion") {
                    return (
                      <div role="button" tabIndex={0} className="navbar-button">
                        <li
                          className="navbar-li_highlight"
                          onClick={() => Deconnexion(navigate, setInfoUser)}
                        >
                          <img
                            src={`${el.icon}`}
                            alt=""
                            className="navbar-links-icons"
                          />
                          <h2>{el.section}</h2>
                        </li>
                      </div>
                    );
                  }

                  return (
                    <NavLink to={el.link}>
                      <div role="button" tabIndex={0} className="navbar-button">
                        <li className="navbar-li_highlight">
                          <img
                            src={`${el.icon}`}
                            alt=""
                            className="navbar-links-icons"
                          />
                          <h2>{el.section}</h2>
                        </li>
                      </div>
                    </NavLink>
                  );
                })}
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="navbar-mobile-backoffice">
        <div className="fixed">
          <nav
            className={`${isMenuVisible ? "navbar-visible" : "navbar-hidden"}`}
          >
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

            <div className="navbar-menu_wrapper">
              <hr className="navbar-hr" />
              <NavDropDownMenu handleisMenuVisible={handleisMenuVisible} />
              <NavBarBackOfficeLinks
                handleisMenuVisible={handleisMenuVisible}
                handleDeconnexion={() => Deconnexion(navigate, setInfoUser)}
              />
            </div>
          </nav>
          <hr className="navbar-bottom-hr" />
          <div className="navbar-header">
            <hr className="navbar-bottom-hr" />
            <div className="profile-desc">
              <div className="profile-desc-picture">
                <img
                  className="avatarprofilimg"
                  src="https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="profile"
                />
              </div>
              <div className="profile-desc-name">
                <h2>
                  {names.prenom} {names.nom}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBarBackOffice;
