'use strict'

var _		= require('lodash');
var request	= require('request');

var dashboard = require('./oo_dashboard');
var executions = require('./oo_executions');
var schedules = require('./oo_schedules');
var config = require('./oo_config');

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
 *			validSSL - true or false whether to require a valid SSL certificate or allow self-signed certs
 *			baseUrl  - the base url of the REST endpoint for an OO server, for example: http://localhost:8050/oo/rest/v1
 */
OO.setClient = function(options) {

	if (!options.username || !options.password) {
		return new Error("no username or password settings provided in options object");
	}

	this.username = options.username;
	this.password = options.password;

	if (!options.baseUrl) {
		return new Error("no baseUrl setting provided in options object");
	}

	this.baseUrl = options.baseUrl;

	this.r = request.defaults({
		baseUrl: options.baseUrl,
		proxy: '',
		headers: {
			'Authorization': 'Basic ' + new Buffer(this.username + ":" + this.password).toString('base64')
		},
		strictSSL: options.validSSL || false
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
		body: options.payload,
		json: true
	}, function(error, response, body) {
		//console.log(error);
		console.log(response);
		//console.log(body);
		if (error) {
			return options.callback(new Error(error), body);
		} else if ( (response.statusCode === 200) || (response.statusCode === 201) ) {
			return options.callback(null, response.body);
		} else {
			return options.callback(new Error('finished with status code: ' + response.statusCode + ' and message of: ' + response.statusMessage), body);
		}
	});

};

OO['dashboard'] = _.extend(OO, dashboard);
OO['executions'] = _.extend(OO, executions);
OO['schedules'] = _.extend(OO, schedules);
OO['config'] = _.extend(OO, config);

module.exports = OO;