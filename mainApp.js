const { callAPI } = require('./services/apiService');
const fs = require('fs');
const csv = require('csv-parser');

// Function to process CSV and call APIs
const processCSV = async (filePath, apiName) => {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        try {
          const response = await callAPI(apiName, row);
          results.push({ ...row, response });
        } catch (error) {
          results.push({ ...row, error: error.message });
        }
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

(async () => {
  try {
    // Get user inputs for filename and API name
    const [filename, apiName] = process.argv.slice(2);

    if (!filename || !apiName) {
      console.error('Usage: node mainApp.js <filename> <apiName>');
      process.exit(1);
    }

    const csvFilePath = `./testData/${filename}`;
    const results = await processCSV(csvFilePath, apiName);

    const outputFileName = `./result/result_${filename.split('.')[0]}.json`;
    fs.writeFileSync(outputFileName, JSON.stringify(results, null, 2));

    console.log(`Results saved to ${outputFileName}`);
  } catch (error) {
    console.error('Error processing file:', error.message);
  }
})();
