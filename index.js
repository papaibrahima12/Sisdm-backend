const express = require('express');
const dotenv  = require('dotenv')

dotenv.config({path:'./config/config.env'})
require('./config/conn');
const app = express();
const route = require('./routes/Routes')
const cookieParser = require('cookie-parser')
const dossierController = require('./controllers/DossierController')
app.use(express.json());
app.use(cookieParser()); 


app.use('/api',route)

app.listen(process.env.PORT,()=>{
    console.log('listening on port '+process.env.PORT);
})