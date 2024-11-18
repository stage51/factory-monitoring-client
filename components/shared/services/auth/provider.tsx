import React, { createContext, useContext, useState, useEffect } from 'react';
import keycloak from './keycloak';

const KeycloakContext = createContext();

export const useKeycloak = () => useContext(KeycloakContext);

export const KeycloakProvider = ({ children }) => {
  const [keycloakInstance, setKeycloakInstance] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
      .then(authenticated => {
        setKeycloakInstance(keycloak);
        setAuthenticated(authenticated);
      })
      .catch(() => {
        console.error("Keycloak initialization failed");
      });
  }, []);

  return (
    <KeycloakContext.Provider value={{ keycloakInstance, authenticated }}>
      {children}
    </KeycloakContext.Provider>
  );
};
