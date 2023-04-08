const apiController = require('../../controller/api-controller');
const chai = require('chai')
const { expect } = require('chai');
const sinon = require('sinon');
const { Ticker, Quotes } = require('../../models');
const tickerController = require('../../controller/ticker-controller');
const { Op } = require("sequelize");
const app = require('../../route/router.js')

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('tickerController', () => {
  describe('getAllTicker', () => {
    // Test case for successful response
    it('should return all tickers with status code 200', async () => {
      const res = await chai.request(app).get('/ticker/findall', tickerController.getAllTicker);

      expect(res).to.have.status(200);
      expect(res.body.status).to.eql('success');
      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.be.greaterThan(0);
    });

    // Test case for error response
    // it('should return an error with status code 400 if no tickers are found', async () => {
    //   // Delete all tickers from the database to simulate an empty response
    //   await Quotes.destroy({ truncate: true });
    //   await Ticker.destroy({ truncate: true });
    //   const res = await chai.request(app).get('/ticker/findall');
    //   expect(res).to.have.status(400);
    //   expect(res.body.status).to.eql('error');
    //   expect(res.body.message).to.eql('No tickers found.');
    // });


   
  });
  describe('getOne', () => {
    it('should return a ticker when given a valid id', async () => {
      const ticker = { id: 1, name: 'AAPL' };
      const req = { params: { id: 1 } };
      const res = { status: sinon.stub().returnsThis(), send: sinon.stub() };
      sinon.stub(Ticker, 'findOne').returns(Promise.resolve(ticker));
      await tickerController.getOne(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith({ status: 'sucess', data: ticker })).to.be.true;
      Ticker.findOne.restore();
    });

    it('should return an error when given an invalid id', async () => {
      const req = { params: { id: 999 } };
      const res = { status: sinon.stub().returnsThis(), send: sinon.stub() };
      sinon.stub(Ticker, 'findOne').returns(Promise.resolve(null));
      await tickerController.getOne(req, res);
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.send.calledWith({ status: 'error', message: 'ticker not found' })).to.be.true;
      Ticker.findOne.restore();
    });

    it('should return an error when an exception is thrown', async () => {
      const req = { params: { id: 1 } };
      const res = { send: sinon.stub() };
      sinon.stub(Ticker, 'findOne').throws(new Error());
      await tickerController.getOne(req, res);
      expect(res.send.calledOnce).to.be.true;
      Ticker.findOne.restore();
    });
  });

  //update ticker


  
});

