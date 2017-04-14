[![view on npm](http://img.shields.io/npm/v/operations-orchestration-api.svg)](https://www.npmjs.org/package/operations-orchestration-api)
[![view on npm](http://img.shields.io/npm/l/operations-orchestration-api.svg)](https://www.npmjs.org/package/operations-orchestration-api)
[![npm module downloads](http://img.shields.io/npm/dt/operations-orchestration-api.svg)](https://www.npmjs.org/package/operations-orchestration-api)
[![Dependency Status](https://david-dm.org/lirantal/operations-orchestration-api.svg)](https://david-dm.org/lirantal/operations-orchestration-api)
[![Build](https://travis-ci.org/lirantal/operations-orchestration-api.svg?branch=master)](https://travis-ci.org/lirantal/operations-orchestration-api)
[![Coverage Status](https://coveralls.io/repos/lirantal/operations-orchestration-api/badge.svg?branch=master&service=github)](https://coveralls.io/github/lirantal/operations-orchestration-api?branch=master)
[![bitHound Code](https://www.bithound.io/github/lirantal/operations-orchestration-api/badges/code.svg)](https://www.bithound.io/github/lirantal/operations-orchestration-api)
[![bitHound Overall Score](https://www.bithound.io/github/lirantal/operations-orchestration-api/badges/score.svg)](https://www.bithound.io/github/lirantal/operations-orchestration-api)


# operations-orchestration-api
HPE's Operations Orchestration client API module for NodeJS 

# Install
Install the API module as a depdency in your project so you can easily use it to query Operations Orchestration REST API

```javascript
npm install operations-orchestration-api --save
```

# Setup as easy as 1-2-3
1. Require the module

    ```javascript
    var OO = require('operations-orchestration-api');
    ```

2. Create an options object with the `username`, and `password` that are allowed to query the REST API, as well as the `baseUrl` property for the full URL where the OO REST API is available

    ```javascript
    var options = {
    	username: 'admin',
    	password: 'admin',
    	baseUrl: 'http://localhost:8050/oo/rest/v1'
    };
    ```

3. Initialize the OO object with the options

    ```javascript
    OO.setClient(options);
    ```

# Usage
After the OO module is initialized with the correct options, we can begin querying information.

## Statistics
The following example will query for the statistics, and you can inspect the `err` or `data` object for the returned result.
```javascript
try {
    const data = await OO.dashboard.statistics(); // Throws err if Promise got rejected
    console.log(data);
} catch (err) {
    console.log(err);
}
```
## Configuration
### Getting all configuration items in OO
The `data` object will contain an array of objects with all the config-items set in OO

```javascript
try {
    const data = await OO.config.getAllItems(); // Throws err if Promise got rejected
    console.log(data);
} catch (err) {
    console.log(err);
}
```

# Versions and Node.js support

Version 2.x has been updated to employ Promises functionality based on async/await, and as such requires a current Node.js release.

Version compatibility matrix for this library:

| OO API Library version | Node.js support | Comments
| ---------------------- | --------------- | --------
| v1.x | Node.js 4.x, 5.x, 6.x, 7.x        | based on callbacks, for example: `OO.dashboard.statistics(function(err, data) {  console.log(data); });`
| v2.x | Node.js >= 7.8.x |


# References
1. [Operations Orchestration product resources on HPE Live Network](https://hpln.hp.com/group/operations-orchestration)
2. [Operations Orchestration API Guide](https://hpln.hpe.com/node/21991)


# Author
Liran Tal <liran.tal@gmail.com>

