'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('getPost function test', () => {
    it('should return true with a specific tx', async () => {
        var result = await index.getPost('504c5bb543125df49e2a410b927ff7a94faa0fcc68f809df31950d3f83ab7f09');
        expect(result).to.eql({
            success: true,
            data: [
                {
                    txid: '504c5bb543125df49e2a410b927ff7a94faa0fcc68f809df31950d3f83ab7f09',
                    url: 'https://media.bitcoinfiles.org/504c5bb543125df49e2a410b927ff7a94faa0fcc68f809df31950d3f83ab7f09'
                }
            ]
        });
    });
})
