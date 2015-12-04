[![view on npm](http://img.shields.io/npm/v/operations-orchestration-api.svg)](https://www.npmjs.org/package/operations-orchestration-api)
[![view on npm](http://img.shields.io/npm/l/operations-orchestration-api.svg)](https://www.npmjs.org/package/operations-orchestration-api)
[![npm module downloads](http://img.shields.io/npm/dt/operations-orchestration-api.svg)](https://www.npmjs.org/package/operations-orchestration-api)
[![Dependency Status](https://david-dm.org/lirantal/operations-orchestration-api.svg)](https://david-dm.org/lirantal/operations-orchestration-api)

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
OO.dashboard.statistics(function(err, data) {
	console.log(err);
	console.log(data);
});
```
## Configuration
### Getting all configuration items in OO
The `data` object will contain an array of objects with all the config-items set in OO

```javascript
OO.config.getAllItems(function(err, data) {
	console.log(err);
	console.log(data);
});
```



# Author
Liran Tal <liran.tal@gmail.com>

