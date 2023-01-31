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





module.exports = (app) => {



  app.get('/list', userController.index);

  //ticker routes
  // app.get('/quotes/:id', apiController.quotesApi);
  app.post('/insert/:name', tickerController.nticker);

  // app.post(' /ticker/:id' , tickerController.addTicker);
  app.get('/ticker/findall', tickerController.getAllTicker);
  app.get('/ticker/:id', tickerController.getOne);
  app.put('/ticker/:id', tickerController.updateTicker);
  //quotes route
  app.get('/quotes/:id', quotesCotntroller.insertQuotes);
  app.post('/quotes/:key/:symbol', quotesCotntroller.insertQuotes);

  //Ticekrs and Quotes Route
  app.get('/ticker/quotes/:id', tickerQuotesController.tickerQuotes);
  app.get('/interval/:id', apiController.intraday);

  app.post('/intraday/:symbol/:interval', tickerQuotesController.insertTicekerQuotes);
  app.get('/timeseries/:symbol/:interval', apiController.monthlyApi);
  

  // app.get('/:id', (req, res) => {
  //   try {
  //     // console.log(request.params);
  //     // return;
  //     axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${req.params.id}&apikey=8BOWDBXH4MKMIX2K`)
  //             .then(result => {

  //                   // console.log(result);
  //                   // return;
  //           res.status(200).json(result.data);
  //            })
  //   } catch (error) {
  //     console.log(error);
  //     res.flash('error_msg', 'something went wrong' + error);
  //   }
  // })



  /**
   * Routes for handling errors
   */
  // // 403 error
  // app.get('/403', function (req, res) {
  //   res.render('errors/error-403', {
  //     layout: false,
  //   });
  // });

  // // 500 error
  // app.get('/500', function (req, res) {
  //   res.render('errors/error-500', {
  //     layout: false,
  //   });
  // });

  // // 404 error
  // app.get('*', function (req, res) {
  //   res.render('errors/error-404', {
  //     layout: false,
  //   });
  // });
};

