import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: "http://localhost:9098",  // Адрес вашего Keycloak-сервера
  realm: "factory-monitoring",  // Название вашего Realm
  clientId: "factory-monitoring-api",   // Ваш clientId
});

export default keycloak;
