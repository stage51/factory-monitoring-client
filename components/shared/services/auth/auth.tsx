import axios from "axios";

// URL для получения токена
const tokenUrl = "http://localhost:9098/realms/factory-monitoring/protocol/openid-connect/token";

// Функция для получения access token
async function getAccessToken() {
  const response = await axios.post(tokenUrl, new URLSearchParams({
    client_id: 'factory-monitoring-api',
    client_secret: 'XA5xr5VZr7oyuEbRqn6358qV2FZKQz2U',
    grant_type: 'client_credentials',
  }), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return response.data.access_token;
}

const createUserUrl = "http://localhost:9098/admin/realms/factory-monitoring/users";

// Функция для создания пользователя
export async function createUser(userData: { email: string, username: string, firstName: string, lastName: string, password: string }) {
  const token = await getAccessToken();

  const response = await axios.post(createUserUrl, {
    username: userData.username,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    enabled: true,
    credentials: [{ type: "password", value: userData.password }],
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}
