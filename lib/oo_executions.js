'use strict';
/**
 * Executions resource
 * @module executions
 */

var actionUrl = {
	executions: '/executions'
};

var executions = {};

/**
 * executes an OO flow
 * 
 * @method	executeFlow
 * @param 	{object}	options.data for the data payload to be sent in the POST request
 * @param 	{function}	callback function
 * @return	{object}	response object
 */
executions.executeFlow = function(data, cb) {

	if (!data) {
		return cb(new Error('missing data object for the payload'), null);
	}

	if (!data.uuid) {
		return cb(new Error('flow uuid parameter is missing in options object'), null);
	}

	return this._request({
		actionUrl: actionUrl.executions,
		method: 'POST',
		payload: data,
		callback: cb
	});
};

module.exports = executions;