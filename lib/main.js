'use strict'

var _		= require('lodash');
var request	= require('request');

var dashboard = require('./oo_dashboard');

/**
 * OO Object declaration
 *
 */
var OO = {};

/** 
 * OO Object
 *
 * @param {object} options
 * 		required:
 *	 		username - username for OO that is allowed to use the API
 *			password - the password for the username
 *			baseUrl  - the base url of the REST endpoint for an OO server, for example: http://localhost:8050/oo/rest/v1
 */
OO.setClient = function(options) {

	if (!options.username || !options.password) {
		return new Error("no username or password settings provided in options object");
	}

	this.username = options.username;
	this.password = options.password;

	this.r = request.defaults({
		baseUrl: options.baseUrl,
		proxy: '',
		headers: {
			'Authorization': 'Basic ' + new Buffer(this.username + ":" + this.password).toString('base64')
		}
	});

	// Return the options that were set
	return {
		username: this.username,
		password: this.password,
		baseUrl: this.baseUrl
	};
}

OO._request = function(options) {

	var self = this;

	this.r({
		uri: options.actionUrl,
		method: options.method,
		json: true
	}, function(error, response, body) {
		if (error) {
			return options.callback(new Error(error), body);
		} else if ( (response.statusCode === 200) || (response.statusCode === 201) ) {
			return options.callback(null, response.body);
		} else {
			return options.callback(new Error(response.body), body);
		}
	});

};

OO['dashboard'] = _.extend(OO, dashboard);


module.exports = OO;