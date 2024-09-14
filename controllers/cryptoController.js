const axios = require('axios');
const { insertCryptoData, getCryptoData } = require('../models/cryptoModel');

const fetchAndStoreCryptoData = async () => {
    try {
        // Fetching data from WazirX API
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = Object.entries(response.data).slice(0, 10);  // Get top 10 tickers

        // Looping through the tickers and inserting into DB
        for (const [name, ticker] of tickers) {
            const crypto = {
                name: name,                  // The key of the ticker (e.g., 'btcinr', 'ethinr')
                last: parseFloat(ticker.last),  // Converting to float for database storage
                buy: parseFloat(ticker.buy),
                sell: parseFloat(ticker.sell),
                volume: parseFloat(ticker.volume),
                base_unit: ticker.base_unit
            };

            // Insert crypto data into the database
            await insertCryptoData(crypto);
        }

        console.log('Crypto data fetched and stored successfully.');
    } catch (error) {
        console.error('Error fetching data from WazirX API:', error);
    }
};

// Controller to fetch crypto data from database and send it to the frontend
const getCryptoDataController = async (req, res) => {
    try {
        const data = await getCryptoData();  // Fetch data from database
        res.json(data);                      // Send it as a JSON response
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from database' });
    }
};

module.exports = { fetchAndStoreCryptoData, getCryptoDataController };
