'use strict'

var actionUrl = {
	statistics: '/executions/statistics'
};

var dashboard = {};

dashboard.statistics = function(cb) {

	return this._request({
		actionUrl: actionUrl.statistics,
		method: 'GET',
		callback: cb
	});
}

module.exports = dashboard;