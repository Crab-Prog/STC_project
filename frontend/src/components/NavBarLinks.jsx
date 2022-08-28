import React from "react";
import { NavLink } from "react-router-dom";

function NavBarLinks({ handleisMenuVisible, showLink }) {
  return (
    <>
      <NavLink to="/accueil_intervenant">
        <div
          role="button"
          tabIndex={0}
          className="navbar-button desktop-back"
          onClick={() => {
            handleisMenuVisible(false);
            showLink(false);
          }}
        >
          <img
            src="https://img.icons8.com/sf-ultralight/344/user-group-man-woman.png"
            alt=""
            className="navbar-icon"
          />
          <h2>Vous êtes un intervenant</h2>
        </div>
      </NavLink>
      <hr className="navbar-hr" />
      <NavLink to="/accueil_association">
        <div
          role="button"
          tabIndex={0}
          className="navbar-button desktop-back"
          onClick={() => {
            handleisMenuVisible(false);
            showLink(false);
          }}
        >
          <img
            src="https://img.icons8.com/sf-ultralight/344/handshake.png"
            alt=""
            className="navbar-icon"
          />
          <h2>Vous êtes une association</h2>
        </div>
      </NavLink>
    </>
  );
}

export default NavBarLinks;
