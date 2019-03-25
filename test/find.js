'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('find function test', () => {
    it('should return false no txid', async () => {
        var result = await index.find();
        expect(result).to.eql({
            success: false,
            message: "field required"
        });
    });

    it('should return true with latest posts for an address', async () => {
        var result = await index.find({
            address: "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz"
        });
        expect(result.success).to.equal(true);
        expect(result.data.length > 0).to.equal(true);

    });
    it('should return true with last few text/markdown', async () => {
        var result = await index.find({
            address: "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
            contentType: "text/markdown",
            limit: 5,
        });
        expect(result.data.length).to.eql(5);
        /*
        {
            success: true,
            data: [
                {
                    txid: '821a1cf59160b08a5e2805c33d19381a0124ea8291808ad23e306b4f9e7782bd',
                    url: 'https://media.bitcoinfiles.org/821a1cf59160b08a5e2805c33d19381a0124ea8291808ad23e306b4f9e7782bd'
                },
                {
                    "txid": "05ad1708371a03e17688859211e6460c10a87bfc01127ae9d33dd0c93f3db444",
                    "url": "https://media.bitcoinfiles.org/05ad1708371a03e17688859211e6460c10a87bfc01127ae9d33dd0c93f3db444"
                },
                {
                    "txid": "e1ac85aaec68947b41270ba3f1ef68e7782533855eb102e561fde3b0181fac57",
                    "url": "https://media.bitcoinfiles.org/e1ac85aaec68947b41270ba3f1ef68e7782533855eb102e561fde3b0181fac57"
                },
                {
                    "txid": "8657f139afbce31c038b852c8d6fb602b71f265d44421e357e02d602f0e4b8a3",
                    "url": "https://media.bitcoinfiles.org/8657f139afbce31c038b852c8d6fb602b71f265d44421e357e02d602f0e4b8a3"
                }
            ]
        }
        */
    });
})

