'use strict'
/**
 * Tests resource
 * @module tests
 */

/**
 * Module dependencies.
 */
var should 		= require('should');
var OO 			= require('../index');
var apiMocks 	= require('./apiMocks')();

var options = {
	username: 'admin',
	password: 'admin',
	baseUrl: 'http://my-oo-host.com:8050/oo/rest/v1'
};

describe('Operations Orchestration API - Test Suite', function() {

	describe('API Setup', function () {

		it('API credentials and baseUrl should be set and returned back correctly', function() {

			var result = OO.setClient(options);
			result.should.be.instanceof(Object);
			result.should.have.property('username');
			result.username.should.be.equal(options.username);
			result.should.have.property('password');
			result.password.should.be.equal(options.password);
			result.should.have.property('baseUrl');
			result.baseUrl.should.be.equal(options.baseUrl);

		});

		it('API credentials without username should return an error', function() {

			var result = OO.setClient({
				'password': 'admin',
				'baseUrl': 'http://www.example.com'
			});

			result.should.be.instanceof(Object);
			result.should.have.property('message');
			result.message.should.be.equal('no username or password settings provided in options object');

		});

		it('API credentials with empty username should return an error', function() {

			var result = OO.setClient({
				'username': '',
				'password': 'admin',
				'baseUrl': 'http://www.example.com'
			});

			result.should.be.instanceof(Object);
			result.should.have.property('message');
			result.message.should.be.equal('no username or password settings provided in options object');

		});

		it('API credentials without password should return an error', function() {

			var result = OO.setClient({
				'username': 'admin',
				'baseUrl': 'http://www.example.com'
			});

			result.should.be.instanceof(Object);
			result.should.have.property('message');
			result.message.should.be.equal('no username or password settings provided in options object');

		});

		it('API credentials with empty password should return an error', function() {

			var result = OO.setClient({
				'username': 'admin',
				'password': '',
				'baseUrl': 'http://www.example.com'
			});

			result.should.be.instanceof(Object);
			result.should.have.property('message');
			result.message.should.be.equal('no username or password settings provided in options object');

		});

		it('API credentials without baseUrl should return an error', function() {

			var result = OO.setClient({
				'username': 'admin',
				'password': 'admin'
			});

			result.should.be.instanceof(Object);
			result.should.have.property('message');
			result.message.should.be.equal('no baseUrl setting provided in options object');

		});

		it('API credentials with empty baseUrl should return an error', function() {

			var result = OO.setClient({
				'username': 'admin',
				'password': 'admin',
				'baseUrl': ''
			});

			result.should.be.instanceof(Object);
			result.should.have.property('message');
			result.message.should.be.equal('no baseUrl setting provided in options object');

		});

	});

	describe('Dashboard API', function () {

		it('dashboard.statistics API should return a valid statistics object', function(done) {

			OO.setClient(options);

			OO.dashboard.statistics(function(err, body) {
				should.not.exist(err);
				body.should.be.instanceof(Array);

				var stat = body[0];

				stat.flowUuid.should.be.instanceof(String).and.not.empty();
				stat.flowPath.should.be.instanceof(String).and.not.empty();
				stat.flowRoi.should.be.instanceof(Number).and.be.ok();
				stat.numberOfExecutions.should.be.instanceof(Number).and.be.ok();
				stat.averageExecutionTime.should.be.instanceof(Number).and.be.ok();
				stat.resultsDistribution.should.be.instanceof(Array);

				return done();
			});

		});

	});

});

