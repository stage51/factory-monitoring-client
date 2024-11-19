import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:9098",
  realm: "factory-monitoring",
  clientId: "factory-monitoring-api",
});

export default keycloak;