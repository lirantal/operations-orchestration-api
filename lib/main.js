'use strict'

var _		= require('lodash');
var request	= require('request');

var baseUrl = '';

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
 */
OO.setClient = function(options) {

	if (!options.username || !options.password) {
		return new Error("no username or password settings provided in options object");
	}

	this.username = options.username;
	this.password = options.password;

	this.r = request.defaults({
		baseUrl: baseUrl,
		proxy: '',
		headers: {
			'Authorization': 'Basic ' + new Buffer(this.username + ":" + this.password).toString('base64')
		}
	});

	// Return the options that were set
	return {
		username: this.username,
		password: this.password
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
		} else if (response.statusCode === 200) {
			return options.callback(null, response.body);
		} else {
			return options.callback(new Error(response.body), body);
		}
	});

};

OO['dashboard'] = _.extend(OO, dashboard);


module.exports = OO;