const axios = require('axios');
const { getAccessToken } = require('./authService');

const getFamilyGroup = async ({ msisdn }) => {
  const token = await getAccessToken();
  const ACCOUNT_BASE_URL = process.env.ACCOUNT_BASE_URL;

  const url = `${ACCOUNT_BASE_URL}/v1/family-group/${msisdn}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
      },
    });
    return response.data;
  } catch (error) {
    console.error('❌ getFamilyGroup Error:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { getFamilyGroup };
