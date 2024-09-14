const express= require('express');
const path= require('path');
const {fetchAndStoreCryptoData}= require('./controllers/cryptoController');
const cryptoRoutes= require('./routes/cryptoRoutes')

const app= express();
const port= process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'public')));

app.use('/api',cryptoRoutes);

fetchAndStoreCryptoData();

app.listen(port,()=>{
    console.log(`Server is running on Port:${port}`);
})

