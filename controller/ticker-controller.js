
const { Ticker,  Sequelize } = require('../models');
const { Dataprovider } = require('../models');
const apiController = require('./api-controller')

module.exports = tickerController = {
  // addTicker: async (req, res) => {
  //   let tickerData = await apiController.callData();
  //   const tickers = await connect.Ticker.create({
  //     ticker: tickerData.Symbol,
  //     fullname: tickerData.Name,
  //     description: tickerData.Description,
  //     assetclass: tickerData.AssetType,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   })
  //   res.status(200).json(tickers);
  // },
  getAllTicker: async (req, res) => {
    const tickers = await Ticker.findAll({})
    if (!tickers) {
      res.status(400).send({
        status: 'error',
        message: 'No tickers found.'
      });
    }
    res.status(200).send(
      {
        status: 'success',
        data: tickers
      }
    )
  },

  getOne: async (req, res) => {
    try {
      let id = req.params.id;
      const tickers = await Ticker.findOne({ where: { id: id } })
      // res.status(200).json(tickers);
      if (!tickers) {
        res.status(400).send({
          status: 'error',
          'message': 'ticker not found'
        });
      }
      res.status(200).send(
        {
          status: 'sucess',
          data: tickers
        }
      )
    }
    catch (error) {
      res.send(error);
    }
  },
  updateTicker: async (req, res) => {
    try {
      const id = req.params.id;
      const { ticker, fullname, description, assetclass } = req.body;
      const findTicker = await Ticker.findOne({ where: { id: id } })
      if (!findTicker) {
        // res.status(400).send({
        //   status: 'error',
        //   'message': 'ticker not found'
        // });
        res.send("error")

      }

      const update = {
        ticker: ticker ? ticker : null,
        fullname: fullname ? fullname : null,
        description: description ? description : null,
        assetclass: assetclass ? assetclass : null
      };

      const updateTick = await findTicker.update(update);

      if (!updateTick) {
        res.status(400).send({
          status: 'error',
          message: `tickers with ${id} failed to update`
        })
      }
      res.status(200).send(
        {
          status: 'sucess',
          message: `updated ticker with ${id}`
        }
      )
    }
    catch (error) {
      res.send(error)
    }
  },
  nticker: async (req, res) => {
    const symbol= req.params.symbol.toUpperCase();
    const findTicker = await Ticker.findOne({
      attributes: [ Sequelize.col('ticker')],
      where: { ticker:symbol },
      raw: true
    })
    if(findTicker){
      return res.json(`${symbol} Already Exists!`)
    }
    const tickerData = await apiController.tickerApi(symbol);
    if(tickerData===false){
      return res.json('Wrong URL! Plase Enter Correct URL')
    }
    const tickers = await Ticker.create({
      ticker: tickerData.Symbol,
      fullname: tickerData.Name,
      description: tickerData.Description,
      assetclass: tickerData.AssetType,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    res.status(200).json(tickers);
  },
}
