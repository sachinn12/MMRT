const { json } = require('body-parser');
const { Quotes, Sequelize } = require('../models');
const { Ticker } = require('../models');
const apiController = require('./api-controller');
const { Op } = require("sequelize");

module.exports = tickerQuotesController = {


    betweentickerQuotes: async (req, res) => {
        try {
            const tickerId = req.params.symbol.toUpperCase();
            const interval = req.params.interval.toUpperCase();
            const id = req.params.id;
            const startDate = req.params.startdate;
            const endDate = req.params.endate;

            const tickerandquotesResult = await Ticker.findAll({
                include: [{
                    model: Quotes,
                    as: 'quotes',
                    where: { Interval: interval, DateTime: { [Op.between]: [startDate, endDate] } },
                }],
                where: { id: id, ticker: tickerId }
            })
            if (!tickerandquotesResult[0]) {
                res.status(200).json("No Data Found");
            } else {
                res.status(200).json(tickerandquotesResult);
            }
        } catch {
            res.status(400).send({
                status: 'Error',
                message: 'Invalid Request'
            })
        }
    },


    //get all quotes with respect with ticker id
    tickerQuotes: async (req, res) => {
        try {
            const tickerId = req.params.symbol.toUpperCase();
            const interval = req.params.interval.toUpperCase();
            const id = req.params.id;

            const tickerandquotesResult = await Ticker.findAll({
                include: [{
                    model: Quotes,
                    as: 'quotes',
                    where: { Interval: interval }
                }],
                where: { id: id, ticker: tickerId }
            })

            if (!tickerandquotesResult[0]) {
                res.status(200).json("No Data Found");
            } else {
                res.status(200).json(tickerandquotesResult);
            }
        } catch {
            res.status(400).send({
                status: 'Error',
                message: 'Invalid Request'
            })
        }
    },
    insertTicekerQuotes: async (req, res) => {

        // try {
            const symbol = req.params.symbol.toUpperCase();
            const interval = req.params.interval;
            // const tickerID = req.params.tickerid;
            // const dataprovider = req.params.id;convertToInt(data)
            // console.log(dataprovider);
            // return;
            const newInterval =interval.toUpperCase();

            //convert string to integer
            function convertToInt(data) {
                // return JSON.stringify(data).match(/\d/g).join("");
                return JSON.stringify(data, (key, value) =>
                    typeof value === 'bigint'
                        ? value.toString()
                        : value // return everything else unchanged
                ).match(/\d/g).join("");
            }



            //find time series function

            function Time(val) {
                return `Time Series (${val})`
            }
            //add ticker function
            async function addTicker(data) {
                const tickerData = await apiController.tickerApi(data);
                // if (!tickerData) {
                //     return res.json(`Invalid Ticker=${data} API call. Please retry`)
                // }
                {
                    const ntickers = await Ticker.create({
                        ticker: tickerData.Symbol,
                        fullname: tickerData.Name,
                        description: tickerData.Description,
                        assetclass: tickerData.AssetType,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    })
                    return res.json({
                        message: 'Tickers data',
                        data: ntickers
                    })
                    // return ntickers
                }

            }
            const intervalData = await apiController.intraday(symbol, interval);
            if (!intervalData[Time(interval)] || intervalData[Time(interval)] === false || intervalData[Time(interval)] === undefined) {
                return res.json(`Invalid Quotes  Symbol=${symbol} Time Series=${Time(interval)} API call. Please retry`)
            }

            //add quotes function
            async function addQuotes(symbol, interval) {

                const tid = await Ticker.findOne({
                    attributes: [Sequelize.col('id')],
                    where: { ticker: symbol },
                    raw: true
                })

                //find last date from table
                const lastDate = await Quotes.findOne({
                    attributes: [[Sequelize.fn('max', Sequelize.col('DateTime')), 'LatestDate']],
                    where: { tickerid: convertToInt(tid), Interval: interval.toUpperCase() },
                    raw: true
                })
                // const ld =convertToInt(lastDate)
                // return console.log(lastDate)
                const quotesdata = Object.entries(intervalData[Time(interval)]).map((ele, index) => {
                    return {
                        Open: ele[1]['1. open'],
                        High: ele[1]['2. high'],
                        Low: ele[1]['3. low'],
                        Close: ele[1]['4. close'],
                        Volume: ele[1]['5. volume'],
                        Interval: interval.toUpperCase(),
                        DateTime: convertToInt(ele[0]),
                        tickerid: convertToInt(tid),
                        dataproid: 836196307386269697n,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }
                })
                const filterdata = quotesdata.filter(index => {
                    // return console.log(index.DateTime)
                // return console(interval)

                    switch (lastDate['LatestDate'] !== null) {
                        
                        case index.DateTime > lastDate['LatestDate']:
                            return index.DateTime > convertToInt( lastDate['LatestDate'] ) && index.tickerid === convertToInt(tid) && index.Interval== newInterval;
                            break;
                    }
                    if (lastDate['LatestDate'] === null) {
                        return index;
                    }
                })
                if (!filterdata[0]) {
                    return res.json("No New Data Found, Please refresh")
                }

                const insertQuote = await Quotes.bulkCreate(filterdata);
                return res.json({
                    message: 'Quotes data',
                    data: insertQuote
                })

            }
            //check if ticker is there in ticker tables 
            const checkTicekrId = await Ticker.count({
                // attributes: [Sequelize.col('ticker')],
                where: { ticker: symbol }
            })

            if (checkTicekrId !== 0) {

                //add quotes
                await addQuotes(symbol, interval);

            }
           
          
        // } catch (err) {
        //     if (err) {
        //         return res.status(404).send({
        //             status: 'ERROR',
        //         })
        //     }
        // }
    },
    dwmController: async (req, res) => {

        try {
            const symbol = req.params.symbol.toUpperCase();
            const interval = req.params.interval.toUpperCase();
            // const interval = req.params.interval;
            //convert string to integer
            function convertToInt(data) {
                return JSON.stringify(data).match(/\d/g).join("");
            }
            //find time series function
            function Time(val) {
                switch (val) {
                    case 'DAILY':
                        return "Time Series (Daily)";
                        break;
                    case 'WEEKLY':
                        return 'Weekly Time Series';
                        break;
                    case 'MONTHLY':
                        return 'Monthly Time Series';
                        break;
                }
            }

            const intervalData = await apiController.dwmApi(symbol, interval);
            if (!intervalData[Time(interval)]) {
                return res.json(`Invalid Request: Symbol=${symbol} Time Series=${Time(interval)} API call. Please retry`)
            }

            //add quotes function
            async function addQuotes(symbol, interval) {
                const tid = await Ticker.findOne({
                    attributes: [Sequelize.col('id')],
                    where: { ticker: symbol },
                    raw: true
                })
                //find last date from table
                const lastDate = await Quotes.findOne({
                    attributes: [[Sequelize.fn('max', Sequelize.col('DateTime')), 'LatestDate']],
                    where: { tickerid: convertToInt(tid), Interval: interval },
                    raw: true
                })
                // return res.json(intervalData)
                const quotesdata = Object.entries(intervalData[Time(interval)]).map((ele, index) => {
                    return {
                        Open: ele[1]['1. open'],
                        High: ele[1]['2. high'],
                        Low: ele[1]['3. low'],
                        Close: ele[1]['4. close'],
                        Volume: ele[1]['5. volume'],
                        Interval: interval.toUpperCase(),
                        DateTime: convertToInt(ele[0]),
                        tickerid: convertToInt(tid),
                        dataproid: 836196307386269697n,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }
                })
                const filterdata = quotesdata.filter(index => {
                    switch (lastDate['LatestDate'] !== null) {
                        case index.DateTime > lastDate['LatestDate']:
                            return index.DateTime > lastDate['LatestDate'] && index.tickerid == convertToInt(tid) && index.Interval == interval;
                            break;
                    }
                    if (lastDate['LatestDate'] === null) {
                        return index;
                    }
                })
                if (!filterdata[0]) {
                    return res.json({
                        status: 'sucess',
                        message: 'No New Data found, Please Refresh Again'
                    })
                }
                const insertQuote = await Quotes.bulkCreate(filterdata);
                // return json([insertQuote]);
                return res.json({
                    message: 'Quotes data',
                    data: insertQuote
                })
            }
            //check if ticker is there in ticker tables 
            const checkTicekrId = await Ticker.count({
                attributes: [Sequelize.col('ticker')],
                group: 'ticker',
                where: { ticker: symbol }
            })
            // return console.log(checkTicekrId)

            if (checkTicekrId !== 0) {

                //add quotes
                await addQuotes(symbol, interval);

            }

        } catch (err) {
            if (err) {
                return res.status(404).send({
                    status: 'ERROR',
                    message: 'please check the code'
                })
            }
        }
    }


}
