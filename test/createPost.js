'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

// Do not use this to send money!
// You will lose your bitcoin!
// This is here for testing purposes only
const privateKey = '5KLpZB2Sfn4S7QXh6rRynXrVZXXT8zTdQBaj7Ngs3ZHpip5zd8r';

describe('createPost function test', () => {
    it('should return false no key', async () => {
        var createRequest = {
            file: {
                content: "test",
                contentType: 'text/plain'
            },
            pay: {
                key: ""
            },
            identity: {
                key: privateKey
            }
        };

        var result = await index.createPost(createRequest);
        expect(result).to.eql({
            success: false,
            message: "key required"
        });

        createRequest = {
            file: {
                content: "test",
                contentType: 'text/plain'
            },
            pay: {
                key: undefined
            },
            identity: {
                key: privateKey
            }
        };

        var result = await index.createPost(createRequest);
        expect(result).to.eql({
            success: false,
            message: "key required"
        });
    });

    it('should return false missing file', async () => {
        var createRequest = {
            pay: {
                key: "key1"
            },
            identity: {
                key: "key1"
            }
        };

        var result = await index.createPost(createRequest);
        expect(result).to.eql({
            success: false,
            message: "file required"
        });

    });

    it('should return false missing file callback', async () => {
        var createRequest = {
            pay: {
                key: "key1"
            },
            identity: {
                key: "key1"
            }
        };

        await index.createPost(createRequest, (result) => {
            expect(result).to.eql({
                success: false,
                message: "file required"
            });
        });
    });

    it('should return false missing file content', async () => {
        var createRequest = {
            file: {

            },
            pay: {
                key: "key1"
            },
            identity: {
                key: "key1"
            }
        };

        var result = await index.createPost(createRequest);
        expect(result).to.eql({
            success: false,
            message: "content required"
        });

    });

    it('should return false missing file contentType', async () => {
        var createRequest = {
            file: {
                content: 'hello',
            },
            pay: {
                key: "key1"
            },
            identity: {
                key: "key1"
            }
        };

        var result = await index.createPost(createRequest);
        expect(result).to.eql({
            success: false,
            message: "contentType required"
        });
    });

    it('should return false missing identity', async () => {
        var createRequest = {
            file: {
                content: 'hello',
            },
            pay: {
                key: "key1"
            }
        };

        var result = await index.createPost(createRequest);
        expect(result).to.eql({
            success: false,
            message: "identity key required"
        });
    });

    // Uncomment this line to send a real transaction
    /*
    it('should return success created file utf-8 default', async () => {
        var createRequest = {
            file: {
                title: 'Posted from matter-lib',
                content: 'hello',
                contentType: 'text/markdown',
            },
            pay: {
                key: privateKey
            },
            identity: {
                key: privateKey
            }
        };

        var result = await index.createPost(createRequest);
        console.log('result', result);
        expect(result.success).to.equal(true);
    });
    */
});