const express =require('express');
const {getCryptoDataController}= require('../controllers/cryptoController');

const router= express.Router();

router.get('/crypto',getCryptoDataController);

module.exports= router;