const pool = require('../db/db');

const getCryptoData= async()=>{
    const result = await pool.query('SELECT * FROM crypto_data');
    return result.rows;
};

const insertCryptoData= async(crypto)=>{
    const {name, last, buy, sell, volume, base_unit} =crypto;
    await pool.query(
        'INSERT INTO crypto_data (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
        [name, last, buy, sell, volume, base_unit]
    );
};

module.exports = {getCryptoData, insertCryptoData};