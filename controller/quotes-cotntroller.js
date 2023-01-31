
const { json } = require('body-parser');
const { Quotes } = require('../models');
const { Ticker } = require('../models');
const apiController = require('./api-controller')


module.exports = quotesController = {
    //get all quotes function 
    getAllQuotes: async (req, res) => {
        const quotes = await Quotes.findAll({})
        if (!quotes) {
            res.status(400).send({
                status: 'error',
                message: 'error in url'
            });
        }
        res.status(200).send(
            {
                status: 'sucess',
                data: quotes
            }
        )
    },

    //get one quotes function

    getOne: async (req, res) => {
        try {
            let id = req.params.id;
            const quotes = await Quotes.findOne({ where: { id: id } })
            // res.status(200).json(quotes);
            if (!quotes) {
                res.status(400).send({
                    status: 'error',
                    'message': 'ticker not found'
                });
            }
            res.status(200).send(
                {
                    status: 'sucess',
                    data: quotes
                }
            )
        }
        catch (error) {
            res.send(error);
        }
    },
    //update quotes function
    updateQuotes: async (req, res) => {
        try {
            const id = req.params.id;
            const { ticker, fullname, description, assetclass } = req.body;
            const findQuotes = await Quotes.findOne({ where: { id: id } })
            if (!findQuotes) {
                res.status(400).send({
                    status: 'error',
                    'message': 'ticker not found'
                });
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
        //insert quotes function
    insertQuotes: async (req, res) => {
        try {
            let key = req.params.key;
            let symbol = req.params.symbol;
            const quotesData = await apiController.quotesApi(symbol);
            const tickers = await Ticker.findOne({ where: { id: key } })
            const tickerid = tickers.id;
            if (tickerid && quotesData) {
                const insertQuote = await Quotes.create({
                    Open: quotesData['Global Quote']['02. open'],
                    High: quotesData['Global Quote']['03. high'],
                    Low: quotesData['Global Quote']['04. low'],
                    Close: quotesData['Global Quote']['04. low'],
                    Volume: quotesData['Global Quote']['06. volume'],
                    tickerid: tickerid,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
                res.status(200).json(insertQuote);
            } else {
                return res.status(400).send({
                    status: 'error',
                    message: 'Wrong URL'
                })
            }
        } catch {
            res.status(400).send({
                status: 'error',
                message: 'No data found'
            })
        }
    }
}
