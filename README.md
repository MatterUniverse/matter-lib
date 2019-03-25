# matter-lib
> Matter Javascript SDK
https://www.mttr.app

Social media and blogging on Metanet. Powered by Bitcoin SV.

Protocol Docs:
- https://b.bitdb.network/
- https://github.com/BitcoinFiles/AUTHOR_IDENTITY_PROTOCOL

*Create a post:*
```javascript
  require('matter-lib').createPost({
    file: {
        content: 'Hello world!',
        contentType: 'text/markdown',
    },
    pay: {
        key: "your wif key"
    },
    identity: {
        key: "your identity wif key"
    }
  }, function(result) {
    console.log(result)
  });
  /*
  {
      success: true
      txid: "8657f139afbce31c038b852c8d6fb602b71f265d44421e357e02d602f0e4b8a3"
  }
  */
```

## Installation and Usage

**Installation**
```sh
npm install matter-lib --save
```

**Include**
```javascript
// Include the library
var matter = require('matter-lib');
```

### Create Posts

##### Create a post (markdown)
```javascript
    /*
     Use with promises
    */
    const result = await matter.createPost({
        file: {
            title: "This is my first post",
            content: '*Hello World!*',
            contentType: 'text/markdown',
        },
        pay: {
            key: "your wif key"
        },
        identity: {
            key: "your identity wif key"
        }
    });

    console.log(result);

    /*
     Use with callback
    */
    matter.createPost({
        file: {
            title: "This is my first post",
            content: '*Hello World!*',
            contentType: 'text/markdown',
        },
        pay: {
            key: "your wif key"
        },
        identity: {
            key: "your identity wif key"
        }
    }, function(result) {
        console.log(result)
    });
    /*
    {
        success: true
        txid: "8657f139afbce31c038b852c8d6fb602b71f265d44421e357e02d602f0e4b8a3"
    }
    */

```

### Create a post (full options)

*Create a json file post*

Please note: By default the *encoding* is UTF-8 and if anything other is provided, then it is assumed to be binary data and it is your responsibility to hex-encode the `content` parameter with your binary data.

```javascript
    var result = await matter.createPost({
        file: {
            title: "JSON Snippet Post",
            content: JSON.stringify({ hello: "world"}),
            contentType: 'application/json',
            encoding: 'utf-8',
        },
        pay: {
            key: "your wif key"
        },
        identity: {
            key: "your identity wif key"
        }
    });
    console.log(result);
    /*
    {
        success: true
        txid: "8657f139afbce31c038b852c8d6fb602b71f265d44421e357e02d602f0e4b8a3"
    }
    */
```

### Get Post by Txid

```javascript
  const result = await matter.getPost('0e3bd6077c1da1e564c36dd18c71d4d45c00369cd1badcfa303a88b867809c99');
  console.log(result)
  /*
  {
      success: true,
      data: [
          {
              txid: '0e3bd6077c1da1e564c36dd18c71d4d45c00369cd1badcfa303a88b867809c99',
              url: 'https://media.bitcoinfiles.org/0e3bd6077c1da1e564c36dd18c71d4d45c00369cd1badcfa303a88b867809c99'
          }
      ]
  }
  */

  // With a callback
  matter.getPost('0e3bd6077c1da1e564c36dd18c71d4d45c00369cd1badcfa303a88b867809c99', function(result) {
      console.log(result)
  });

```

### Search Posts

*Find the latest posts created by identity address 1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz*

```javascript
  var result = await matter.find({
      address: "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
  });
  console.log(result);
  /*
  {
      success: true,
      data: [
          {
              txid: '...',
              url: 'url'
          }
      ]
  }
  */

  // With a callback
  matter.find({
      address: "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
  }, function(result) {
      console.log(result);
  });

```

*Find most recent posts by 1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz*

```javascript
  var result = await index.find({
        address: "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
        limit: 10,
        // Additional options
        // contentType: "application/json",
        // skip: 0,
        // sort: -1,
        // Default 'blk.i'
        // sortField: 'blk.i' // Any Planaria field identifier such as out.s1, out.h1, etc are available
  });
  console.log(result);
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

  // With a callback
  matter.find({
      address: "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
      contentType: "application/json",
      limit: 5,
      skip: 1,
      sort: -1
  }, function(result) {
      console.log(result);
  });
```

*Find the most recent file named 'hello.txt' created by 1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz*

```javascript
  var result = await matter.find({
      address: "1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz",
      name: "hello.txt",
      skip: 1,
      sort: -1
  });
  console.log(result);
  /*
  {
      success: true,
      data: [
              {
                  txid: '821a1cf59160b08a5e2805c33d19381a0124ea8291808ad23e306b4f9e7782bd',
                  url: 'https://media.bitcoinfiles.org/821a1cf59160b08a5e2805c33d19381a0124ea8291808ad23e306b4f9e7782bd'
              }
          ]
  }
  */

``` 

### Build Post

*Build a post and return for inspection*

```javascript
    /*
     Use with promises
    */
    const result = await matter.buildPost({
        file: {
            content: '{ "message": "Hello world!" }',
            contentType: 'application/json',
        },
        pay: {
            key: privateKey
        },
        identity: {
            key: privateKey
        }
    
    });

    console.log(result);
    /*
    // Shows the status and 'data' contains the array of the file and signature content
    {
        success: true
        data: [
            '0x31394878696756345179427633744870515663554551797131707a5a56646f417574',
            '0x7b20226d657373616765223a202248656c6c6f20776f726c642122207d',
            '0x6170706c69636174696f6e2f6a736f6e',
            '0x7574662d38',
            '0x00',
            '0x7c',
            '0x313550636948473232534e4c514a584d6f5355615756693757537163376843667661',
            '0x424954434f494e5f4543445341',
            '0x31455868536247466945415a4345356565427655785436634256486872705057587a',
            '0x1b7f1cd9ab8ea94cd8cc2bc0b598aa41b2420faf6b0593fe851478d1c22a42c6d73b3890e0f2743e0d21c4f7fa0023362bf9f15dc9a16511ab57714dce1ae3f35f',
            '0x00',
            '0x01',
            '0x02',
            '0x03',
            '0x04',
            '0x05',
            '0x06'
        ];
    }
    */
```

It can be broadcast via datapay or using the `matter.datapay` wrapper:

```javascript
    // Now create the file from the constructed array using the datapay wrapper
    var result = await matter.datapay({
        data: result.data,  // returned from matter.buildPost(...)
        pay: {
            key: 'your wif key'
        }
    });
    console.log(result);
    /*
    {
        success: true,
        txid: 'tx hash...'
    }
    */
```
 

# Transaction Examples

##### Example 1

File:

https://www.bitcoinfiles.org/9608c460ff715d38d338ac70831a58ddecc8b2637d22d3e4c40a736dfb450b0c
 

## Build and Test

```
npm run build
npm test
```

-----------


 ## Any questions?

 We love to hear from you!
 https://www.mttr.app
 https://twitter.com/MatterApp_


