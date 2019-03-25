'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

// Do not use this to send money!
// You will lose your bitcoin!
// This is here for testing purposes only
const privateKey = '5KLpZB2Sfn4S7QXh6rRynXrVZXXT8zTdQBaj7Ngs3ZHpip5zd8r';

describe('buildPost function test', () => {

    it('should return false missing file', async () => {
        var createRequest = {
            pay: {
                key: "key1",
            },
            identity: {
                key: "key1",
            }
        };

        var result = await index.buildPost(createRequest);
        expect(result).to.eql({
            success: false,
            message: "file required",
        });

    });

    it('should return false missing file callback', async () => {
        var createRequest = {
            pay: {
                key: "key1",
            },
            identity: {
                key: "key1",
            }
        };

        await index.buildPost(createRequest, (result) => {
            expect(result).to.eql({
                success: false,
                message: "file required",
            });
        });
    });

    it('should return false missing file content', async () => {
        var createRequest = {
            file: {

            },
            pay: {
                key: "key1",
            },
            identity: {
                key: "key1",
            }
        };

        var result = await index.buildPost(createRequest);
        expect(result).to.eql({
            success: false,
            message: "content required",
        });

    });

    it('should return false missing file contentType', async () => {
        var createRequest = {
            file: {
                content: 'hello',
            },
            pay: {
                key: "key1",
            },
            identity: {
                key: "key1",
            }
        };

        var result = await index.buildPost(createRequest);
        expect(result).to.eql({
            success: false,
            message: "contentType required",
        });
    });

    it('should return false missing identity', async () => {
        var createRequest = {
            file: {
                content: 'hello',
                contentType: 'text/markdown',
            },
            pay: {
                key: "key1",
            }
        };

        var result = await index.buildPost(createRequest);
        expect(result).to.eql({
            success: false,
            message: "identity key required",
        });
    });

    it('should return success create post', async () => {
        var createRequest = {
            file: {
                title: 'Posted from matter-lib',
                content: 'hello',
                contentType: 'text/markdown',
                postLinkId: 'posted-from-matter-lib'
            },
            pay: {
                key: privateKey
            },
            identity: {
                key: privateKey
            }
        };

        var result = await index.buildPost(createRequest);
        expect(result.success).to.equal(true);
        expect(result.data).to.eql([
            "0x31394878696756345179427633744870515663554551797131707a5a56646f417574",
            "0x68656c6c6f",
            "0x746578742f6d61726b646f776e",
            "0x7574662d38",
            "0x506f737465642066726f6d206d61747465722d6c6962",
            "0x7c",
            "0x3150755161374b36324d694b43747373534c4b79316b683536575755374d74555235",
            "0x534554",
            "0x74797065",
            "0x706f7374",
            "0x706f73745f6964",
            "0x706f737465642d66726f6d2d6d61747465722d6c6962",
            "0x76657273696f6e",
            "0x01",
            "0x7c",
            "0x313550636948473232534e4c514a584d6f5355615756693757537163376843667661",
            "0x424954434f494e5f4543445341",
            "0x31455868536247466945415a4345356565427655785436634256486872705057587a",
            "0x1c0f169a29488f9f7b4ee42ce3da5db5a7e68fff5c8a73bea384cd6de63f3c75d85ea39fbca4983116e6e488850a9ec1498f0bededc3e5b092e301bfdc6c82335d",
            "0x00",
            "0x01",
            "0x02",
            "0x03",
            "0x04",
            "0x05",
            "0x06",
            "0x07",
            "0x08",
            "0x09",
            "0x0a",
            "0x0b",
            "0x0c",
            "0x0d",
            "0x0e",
            "0x0f",
        ]);
    });
});