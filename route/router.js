const { json } = require('body-parser');
const express = require('express');
const Route = express.Router();
const userController = require('../controller/user-controller');
const apiController = require('../controller/api-controller');
const bodyParser = require('body-parser');
const { request } = require('express');
const axios = require('axios');
const tickerController = require('../controller/ticker-controller');
const quotesCotntroller = require('../controller/quotes-cotntroller');
const tickerQuotesController = require('../controller/ticker-quotes-controller');
const { Ticker } = require('../models');
const dataproviderController = require('../controller/dataprovider-controller');


const app = express();

app.get('/ticker/findall', tickerController.getAllTicker);
app.get('/ticker/:id', tickerController.getOne);
app.put('/ticker/:id', tickerController.updateTicker);
app.post('/ticker/:symbol', tickerController.nticker);


module.exports = app;

// module.exports = (app) => {
//   app.get('/ticker/findall', tickerController.getAllTicker);
//   app.get('/list', userController.index);
//   app.get('/ticker/:id', tickerController.getOne);
//   app.put('/ticker/:id', tickerController.updateTicker);
//   //quotes route
//   app.get('/quotes/:id', quotesCotntroller.insertQuotes);
//   app.post('/quotes/:key/:symbol', quotesCotntroller.insertQuotes);

//   //Ticekrs and Quotes Route
//   //intrday
//   app.get('/ticker/quotes/:id', tickerQuotesController.tickerQuotes);
//   //daily, montly, weekly



//   //ticker's quote controller route
//   //insert ticker router
//   app.post('/ticker/:symbol', tickerController.nticker);

//   app.post('/intraday/:symbol/:interval', tickerQuotesController.insertTicekerQuotes);
//   //daily montly weekly
//   app.post('/quotesdata/:symbol/:interval', tickerQuotesController.dwmController);

//   //get router
//   app.get('/ticker/quotes/:symbol/:interval/:id', tickerQuotesController.tickerQuotes);
//   app.get('/ticker/quotes/:symbol/:interval/:id/:startdate/:endate', tickerQuotesController.betweentickerQuotes);


//   //Search Company Symbol Router

//   app.get('/search/:value', apiController.userAPI);

// };

