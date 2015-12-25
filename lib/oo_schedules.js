'use strict'
/**
 * Schedules resource
 * @module schedules
 */

var actionUrl = {
	schedules: '/schedules'
};

var schedules = {};

/**
 * schedules a flow to be executed at a given time
 * 
 * @method	scheduleFlow
 * @param 	{object}	options.data for the data payload to be sent in the POST request
 * @param 	{function}	callback function
 * @return	{object}	response object
 */
schedules.scheduleFlow = function(data, cb) {

	if (!data) {
		return cb(new Error('missing data object for the payload'), null);
	}

	if (!data.flowUuid) {
		return cb(new Error('flow uuid parameter is missing in options object'), null);
	}

	if (!data.triggerExpression) {
		return cb(new Error('flow triggerExpression parameter is missing in options object'), null);
	}

	return this._request({
		actionUrl: actionUrl.schedules,
		method: 'POST',
		payload: data,
		callback: cb
	});
}

module.exports = schedules;