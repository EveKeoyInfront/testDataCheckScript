const axios = require('axios');
const { getAccessToken } = require('./authServices'); 

const getSubscriber = async ({ msisdn, telco }) => {
  const token = await getAccessToken();

  if (!msisdn || !telco) {
    throw new Error('Missing required parameters: msisdn or telco');
  }

  // Construct the full URL for getSubscriber
  const subscriberParams = new URLSearchParams({ msisdn, telco });
  const subscriberURL = `${BASE_URL}/moli-subscriber/v1/subscriber?${subscriberParams.toString()}`;
  console.log("getSubscriber Full URL: ", subscriberURL);

  try {
    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
      },
    });
    console.log("✅ Subscriber Response: ", subscriberResponse.data);
    return response.data;
  } catch (error) {
    console.error('❌ getSubscriber Error:', error.response?.data || error.message);
    throw new Error(errorMessage);
  }
};

module.exports = { getSubscriber };
