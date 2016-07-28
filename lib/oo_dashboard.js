'use strict';
/**
 * Executions resource
 * @module executions
 */

var actionUrl = {
	statistics: '/executions/statistics'
};

var dashboard = {};

/**
 * shows statistics information
 * 
 * @method	statistics
 * @param 	{function}	callback function
 * @return	{object}	response object
 */
dashboard.statistics = function(cb) {

	return this._request({
		actionUrl: actionUrl.statistics,
		method: 'GET',
		callback: cb
	});
};

module.exports = dashboard;