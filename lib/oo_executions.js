'use strict'

var actionUrl = {
	executions: '/executions'
};

var executions = {};

/**
 * executeFlow
 * executes an OO flow
 *
 */
executions.executeFlow = function(options, cb) {

	if (!options.data) {
		return cb(new Error('options object should contain a data object for the payload'), null);
	}

	if (!_.has(options.data, 'uuid')) {
		return cb(new Error('flowUUID parameter is missing in options object'), null);
	}

	return this._request({
		actionUrl: actionUrl.executions,
		method: 'POST',
		payload: options.data
		callback: cb
	});
}

module.exports = executions;