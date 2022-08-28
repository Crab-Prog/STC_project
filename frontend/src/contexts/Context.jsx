import React, { createContext, useState } from "react";

const Context = createContext();

function Provider({ children }) {
  const [infoUser, setInfoUser] = useState({
    role: sessionStorage.getItem(`role`),
    email: sessionStorage.getItem(`email`),
    etat: sessionStorage.getItem(`etat`),
  });

  const [isVisible, setIsVisible] = useState(false);

  return (
    <Context.Provider
      value={{
        infoUser,
        setInfoUser,
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </Context.Provider>
  );
}

const ExportContext = {
  Context,
  Provider,
};

export default ExportContext;
