'use strict'
/**
 * Tests API Mocks resource
 * @module tests api mocks
 */

/**
 * Module dependencies.
 */
var nock	= require('nock');

var apiMocks = function() {
	nock('http://my-oo-host.com:8050/oo/rest/v1')
		.get('/executions/statistics')
		.reply(200, [{
			flowUuid: '06fe8531-868b-4e79-aa7a-13a5e30a66ec',
	    	flowPath: 'Library/Utility Operations/Samples/Generate Random Number.xml',
	    	flowRoi: 1,
	    	numberOfExecutions: 1,
	    	averageExecutionTime: 281,
	    	resultsDistribution: []
		}]);
};


module.exports = apiMocks;