const { getSubscriber } = require('./getSubscriber');
const { getFamilyGroup } = require('./getFamilyGroup');
// Add new APIs here when required

const apiHandlers = {
  getSubscriber,
  getFamilyGroup,
  // Add more handlers here dynamically
};

/**
//  * Generic function to call an API dynamically by name.
//  * @param {string} apiName
//  * @param {object} params
//  * @returns {Promise<any>} 
 */
const callAPI = async (apiName, params) => {
  const apiFunction = apiHandlers[apiName];
  if (!apiFunction) {
    throw new Error(`API handler not found for: ${apiName}`);
  }
  if (typeof params !== 'object' || params === null) {
    throw new Error(`Invalid parameters provided for API: ${apiName}`);
  }
  return await apiFunction(params);
};

module.exports = { callAPI };