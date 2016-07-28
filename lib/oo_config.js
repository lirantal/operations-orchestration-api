'use strict';
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
};

/**
 * set a configuration item
 * 
 * @method	setItem
 * @param 	{object}	object.type and object.path properties must be set. object.data should be JSON string, or empty for re-setting the key.
 * @param 	{function}	callback function
 * @return	{object}	response object
 */
config.setItem = function(data, cb) {

	if (!data.type || !data.name) {
		return cb(new Error('type and name properties must be provided'), null);
	}

	if (!data.value) {
		data.value = 'null';
	}

	return this._request({
		actionUrl: actionUrl.config + '/' + data.type + '/' + data.name,
		method: 'PUT',
		payload: data.value,
		callback: cb
	});
};

module.exports = config;