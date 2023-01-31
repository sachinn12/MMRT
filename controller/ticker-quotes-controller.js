const { json } = require('body-parser');
const { Quotes, Sequelize } = require('../models');
const { Ticker } = require('../models');
const apiController = require('./api-controller');
const quotesCotntroller = require('./quotes-cotntroller');
const { insertQuotes } = require('./quotes-cotntroller');
const tickerController = require('./ticker-controller');
const { nticker } = require('./ticker-controller');
// const sequelize = require('../models');

module.exports = tickerQuotesController = {
    //get all quotes with respect with ticker id
    tickerQuotes: async (req, res) => {
        try {
            let tickerid = req.params.id;
            const data = await Ticker.findAll({
                include: [{
                    model: Quotes,
                    as: 'quotes'
                }],
                where: { id: tickerid }
            })
            if (data) {
                res.status(200).json(data);
            }
        } catch {
            res.status(400).send({
                status: 'Error',
                message: 'no data found'
            })
        }
    },

    insertTicekerQuotes: async (req, res) => {
        // try {
            const symbol = req.params.symbol;
            const interval = req.params.interval;
            const tickerID = symbol.toUpperCase();

            //check if ticker is there in ticker tables 
            const checkTicekrId = await Ticker.count({ where: { ticker: tickerID } })
            
                if(checkTicekrId!==0){
                    console.log("HELLO")
                }
                else{
                   tickerController.nticker(symbol);
                }
            

            return;
           
            

            //fetch latest date

            const lastDate = await Quotes.findOne({
                attributes: [[Sequelize.fn('max', Sequelize.col('DateTime')), 'LatestDate']],
                where: { tickerid: tickerID, Interval: interval },
                raw: true

            })

            function convertDate(data) {
                return JSON.stringify(data).match(/\d/g).join("");
            }

            // return console.log(lastDate['LatestDate']);
            // if (lastDate['LatestDate'] !== null) {
            //     const ld = convertDate(lastDate);
            // }

            const intervalData = await apiController.intraday(symbol, interval);
            function Time(val) {
                return `Time Series (${val})`
            }
            // return console.log(Time(interval))
            const quotesdata = Object.entries(intervalData[Time(interval)]).map((ele, index) => {
                return {
                    Open: ele[1]['1. open'],
                    High: ele[1]['2. high'],
                    Low: ele[1]['3. low'],
                    Close: ele[1]['4. close'],
                    Volume: ele[1]['5. volume'],
                    Interval: interval,
                    DateTime: convertDate(ele[0]),
                    tickerid: tickerID,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            })

            // return res.json(quotesdata)

            const filterdata = quotesdata.filter(index => {
                switch (lastDate['LatestDate'] !== null) {
                    case index.DateTime > lastDate['LatestDate']:
                        return index.DateTime > lastDate['LatestDate'] && index.tickerid == tickerID && index.Interval == interval;
                        break;
                    // case index.DateTime <= lastDate['LatestDate']:
                        
                    //  return false;
                    //     break;
                }
                if (lastDate['LatestDate'] === null) {
                    return index;
                }
                // if(lastDate['LatestDate'] !==null){
                //     if(index.DateTime > lastDate['LatestDate']){
                //         return index.DateTime > lastDate['LatestDate'] && index.tickerid == tickerID && index.Interval == interval;
                //     }
                //     else if(index.DateTime <= lastDate['LatestDate']){
                //         return  console.log("No Data found")
                //     }else{
                //         return index;
                //     }
                // }

            })
            // return res.status(200).json(filterdata)

            //Insert Data Into  Tables
            const insertQuote = await Quotes.bulkCreate(filterdata);
            res.status(200).json(insertQuote);

        // } catch (err) {
        //     if (err) {
        //         return res.status(404).send({
        //             status: 'ERROR',
        //             message: 'please check the code'
        //         })
        //     }
        // }


    }

}
