const express = require('express');
const  http = require('http');
const bodyParser = require('body-parser');
// const db  = require('./config/db');
const Route = require('./route/router');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = http.createServer(app);


require('./route/router')(app);
server.listen(3000, (req, res)=>{
    console.log("Server Started");
})




