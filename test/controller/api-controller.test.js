const apiController = require('../../controller/api-controller.js')
const axios = require('axios');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
describe('apiController', () => {

    describe('tickerApi', () => {
        it('should return a data object when passed a valid symbol', async () => {
            const result = await apiController.tickerApi('AAPL');
            result.should.be.an('object');
            result.should.have.property('Symbol').that.equals('AAPL');
        });
        it('should return false when passed an invalid symbol', async () => {
            const result = await apiController.tickerApi('INVALID');
            result.should.be.false;
        });
    });

    describe('intraday', () => {
        it('should return a data object when passed valid parameters', async () => {
            const result = await apiController.intraday('AAPL', '15min');
            result.should.be.an('object');
            result.should.have.property('Meta Data').that.is.an('object');
        });
        it('should return false when result is empty', async () => {
            const data = await apiController.intraday('INVALID', 'INVALID');
            const result = !data;
            result.should.be.false;
        });

    });

    // describe('dwmApi', () => {
    //     it('should return a data object when passed valid parameters', async () => {
    //         const result = await apiController.intraday('AAPL', 'WEEKLY');
    //         result.should.be.an('object');
    //         result.should.have.property('Meta Data').that.is.an('object');
    //     });
    //     it('should return false when passed invalid parameters', async () => {
    //         const result = await apiController.dwmApi('INVALID', 'INVALID');
    //         result.should.be.false;
    //     });
    // });

    describe('userAPI', () => {
        it('should return a data object when passed a valid search expression', async () => {
            const result = await apiController.userAPI({ params: { value: 'AAPL' } }, { json: (data) => data });
            result.should.be.an('object');
            result.should.have.property('bestMatches').that.is.an('array').with.length.greaterThan(0);
        });
        it('should return "No Best Matches Found" when passed an invalid search expression', async () => {
            const data = await apiController.userAPI({ params: { value: 'INVALID' } }, { json: (data) => data });
            const result = !data;
            result.should.be.false;
        });
    });

});
