const axios = require('axios').default;
const { request } = require('express');
const router = require('../route/router');
const { json } = require('body-parser');

module.exports = apiController = {
//Ticker API
  tickerApi: async (symbol) => {

    try {
      const result = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=8BOWDBXH4MKMIX2K`);
      if (Object.keys(result.data).length > 0) {
        return result.data;

      } else {
        return false;
      }
    }
    catch {
      console.log("error");
    }
  },
//Quotes API
  // quotesApi: async (symbol) => {
  //   try {
  //     const result = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=8BOWDBXH4MKMIX2K`);
  //     if (Object.keys(result.data['Global Quote']).length > 0) {
  //       return result.data;

  //     } else {
  //       return false;
  //     }
  //   }
  //   catch {
  //     console.log("error");
  //   }

  // },
  //intraday Quotes API
  intraday: async (symbol, interval, res) => {
    try {
      // const symbol = req.symbol;
      // const interval = req.interval;
      // return console.log(symbol, interval)
      const result = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=8BOWDBXH4MKMIX2K`);
      const data = result.data;
      if (data) {
        return data
      } else {
        return false;
      }
    }
    catch {
      console.log("error");
    }
  },
//daily, monthly, weekly API
  dwmApi: async (symbol, interval) => {
    try {
      // return console.log(symbol, interval)
      const result = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_${interval}&symbol=${symbol}&apikey=8BOWDBXH4MKMIX2K`);
      const data = result.data;
      if (data) {
        return data
      } else {
        return false;
      }
    }
    catch {
      console.log("error");
    }
  },
  //Compnay Search API
  userAPI: async (req, res) => {
    try{
      var apiKey = process.env.apiKey_Kristof
      var searchExpression = req.params.value;
      var url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + searchExpression + '&apikey=' + apiKey;
      const result  =await axios.get(url);
      if(Object.keys(result.data['bestMatches']).length > 0){
        return res.json(result.data)
      }
      else{
        return res.json("No Best Matches  Found")
      }
    } catch (err){
      return res.json(er)
    }
    

  }
}

