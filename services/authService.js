const axios = require('axios');
require('dotenv').config();

const AUTH_TOKEN_URL = process.env.AUTH_TOKEN_URL;
const AUTH_CLIENT_ID = process.env.AUTH_CLIENT_ID;
const AUTH_CLIENT_SECRET = process.env.AUTH_CLIENT_SECRET;
let ACCESS_TOKEN = process.env.ACCESS_TOKEN;
let ACCESS_TOKEN_EXPIRY_TIME = process.env.ACCESS_TOKEN_EXPIRY_TIME;

// Validate environment variables
const requiredEnvVars = ['AUTH_TOKEN_URL', 'AUTH_CLIENT_ID', 'AUTH_CLIENT_SECRET'];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is missing.`);
  }
});

const getAccessToken = async () => {
  const currentTime = new Date().getTime();
  if (ACCESS_TOKEN && currentTime < ACCESS_TOKEN_EXPIRY_TIME) {
    return ACCESS_TOKEN;
  }

  try {
    const response = await axios.post(AUTH_TOKEN_URL, null, {
      params: {
        grant_type: 'client_credentials',
        client_id: AUTH_CLIENT_ID,
        client_secret: AUTH_CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    ACCESS_TOKEN = response.data.access_token;
    ACCESS_TOKEN_EXPIRY_TIME = new Date().getTime() + (response.data.expires_in - 60) * 1000; // Add buffer
    return ACCESS_TOKEN;
  } catch (error) {
    console.error('Error fetching access token:', error.message);
    throw new Error('Failed to fetch access token');
  }
};

module.exports = { getAccessToken };