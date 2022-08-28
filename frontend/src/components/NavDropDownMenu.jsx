import React, { useContext, useState } from "react";
import mission from "@assets/icons/mission.png";

import { NavLink } from "react-router-dom";
import MissionsData from "@services/linksMissions.json";
import ExportContext from "../contexts/Context";

function NavDropDownMenu({ handleisMenuVisible }) {
  const { isOpen, setIsOpen } = useState(false);
  const { isVisible, setIsVisible, infoUser } = useContext(
    ExportContext.Context
  );
  const handleChangeNav = () => {
    setIsVisible(false);
    setIsOpen(!isOpen);
  };
  return (
    <li>
      <details className="back-office-nav-drop-menu" open={handleChangeNav}>
        <summary
          onClick={() => setIsVisible(true)}
          className="back-office-nav-drop-menu-box"
        >
          <img src={mission} alt="" className="navbar-links-icons" />
          <h2>Mission</h2>
        </summary>
        {isVisible ? (
          <div className="back-office-nav-container">
            {MissionsData.filter((r) => r[infoUser.role]).map((e) => {
              return (
                <NavLink to={e.link} onClick={() => handleChangeNav}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setIsVisible(false);
                    }}
                  >
                    <h2
                      className="back-office-nav-links"
                      onClick={() => {
                        handleisMenuVisible(false);
                      }}
                    >
                      {e.section}
                    </h2>
                  </div>
                </NavLink>
              );
            })}
          </div>
        ) : null}
      </details>
    </li>
  );
}

export default NavDropDownMenu;
