'use strict'
/**
 * Configuration resource
 * @module config
 */

var actionUrl = {
	config: '/config-items'
};

var config = {};

/**
 * get all configuration items
 * 
 * @method	getAllItems
 * @param 	{function}	callback function
 * @return	{object}	response object
 */
config.getAllItems = function(cb) {

	return this._request({
		actionUrl: actionUrl.config,
		method: 'GET',
		callback: cb
	});
}

/**
 * set a configuration item
 * 
 * @method	setItem
 * @param 	{object}	object.type and object.path properties must be set. object.data should be JSON string, or empty for re-setting the key.
 * @param 	{function}	callback function
 * @return	{object}	response object
 */
config.setItem = function(data, cb) {

	if (!data.type || !data.path) {
		return cb(new Error('type and path properties must be provided'), null);
	}

	if (!data.value) {
		data.value = 'null';
	}

	// if (!_.has(options.data, 'uuid')) {
	// 	return cb(new Error('flowUUID parameter is missing in options object'), null);
	// }

	return this._request({
		actionUrl: actionUrl.config + '/' + data.type + '/' + data.path,
		method: 'PUT',
		payload: data.value,
		callback: cb
	});
}

module.exports = config;