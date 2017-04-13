'use strict'
/* eslint-env mocha */
/**
 * Tests resource
 * @module tests
 */

/**
 * Module dependencies.
 */
require('should')
var OO = require('../lib/main')
require('./apiMocks')()

var options = {
  username: 'admin',
  password: 'admin',
  baseUrl: 'http://my-oo-host.com:8050/oo/rest/v1'
}

describe('Operations Orchestration API - Test Suite', function () {
  describe('API Setup', function () {
    it('API credentials and baseUrl should be set and returned back correctly', function () {
      var result = OO.setClient(options)
      result.should.be.instanceof(Object)
      result.should.have.property('username')
      result.username.should.be.equal(options.username)
      result.should.have.property('password')
      result.password.should.be.equal(options.password)
      result.should.have.property('baseUrl')
      result.baseUrl.should.be.equal(options.baseUrl)
    })

    it('API credentials without username should return an error', function () {
      var result = OO.setClient({
        'password': 'admin',
        'baseUrl': 'http://www.example.com'
      })

      result.should.be.instanceof(Object)
      result.should.have.property('message')
      result.message.should.be.equal('no username or password settings provided in options object')
    })

    it('API credentials with empty username should return an error', function () {
      var result = OO.setClient({
        'username': '',
        'password': 'admin',
        'baseUrl': 'http://www.example.com'
      })

      result.should.be.instanceof(Object)
      result.should.have.property('message')
      result.message.should.be.equal('no username or password settings provided in options object')
    })

    it('API credentials without password should return an error', function () {
      var result = OO.setClient({
        'username': 'admin',
        'baseUrl': 'http://www.example.com'
      })

      result.should.be.instanceof(Object)
      result.should.have.property('message')
      result.message.should.be.equal('no username or password settings provided in options object')
    })

    it('API credentials with empty password should return an error', function () {
      var result = OO.setClient({
        'username': 'admin',
        'password': '',
        'baseUrl': 'http://www.example.com'
      })

      result.should.be.instanceof(Object)
      result.should.have.property('message')
      result.message.should.be.equal('no username or password settings provided in options object')
    })

    it('API credentials without baseUrl should return an error', function () {
      var result = OO.setClient({
        'username': 'admin',
        'password': 'admin'
      })

      result.should.be.instanceof(Object)
      result.should.have.property('message')
      result.message.should.be.equal('no baseUrl setting provided in options object')
    })

    it('API credentials with empty baseUrl should return an error', function () {
      var result = OO.setClient({
        'username': 'admin',
        'password': 'admin',
        'baseUrl': ''
      })

      result.should.be.instanceof(Object)
      result.should.have.property('message')
      result.message.should.be.equal('no baseUrl setting provided in options object')
    })
  })

  describe('Dashboard API', function () {
    it('dashboard.statistics API should return a valid statistics object', function (done) {
      OO.setClient(options)

      OO.dashboard
      .statistics()
      .then(function (body) {
        body.should.be.instanceof(Array)

        var stat = body[0]

        stat.flowUuid.should.be.instanceof(String).and.not.empty()
        stat.flowPath.should.be.instanceof(String).and.not.empty()
        stat.flowRoi.should.be.instanceof(Number).and.be.ok()
        stat.numberOfExecutions.should.be.instanceof(Number).and.be.ok()
        stat.averageExecutionTime.should.be.instanceof(Number).and.be.ok()
        stat.resultsDistribution.should.be.instanceof(Array)

        return done()
      })
    })
  })

  describe('Executions API', function () {
    it('executions.executeFlow API should return an object for successful flow execution', function (done) {
      OO.setClient(options)

      var flow = {
        uuid: '06fe8531-868b-4e79-aa7a-13a5e30a66ec',
        inputs: {
          min: '0',
          max: '10'
        }
      }

      OO.executions
      .executeFlow(flow)
      .then(function (body) {
        body.should.be.instanceof(Object)

        body.feedUrl.should.be.instanceof(String).and.not.empty()
        body.executionId.should.be.instanceof(String).and.not.empty()
        body.errorCode.should.be.instanceof(String).and.not.empty()

        return done()
      })
    })
  })

  describe('Schedules API', function () {
    it('schedules.scheduleFlow API should create a scheduled flow and return an object for successful scheduling', function (done) {
      OO.setClient(options)

      var flow = {
        'flowUuid': '0a8f3175-d71e-4426-b578-1ace1fe1d898',
        'flowScheduleName': 'Scheduled Flow Created By REST 2',
        'triggerExpression': '* 10 10 * * *',
        'runLogLevel': 'DEBUG',
        'startDate': '1314079869000',
        'username': 'admin',
        'inputPromptUseBlank': true,
        'timeZone': 'Asia/Amman',
        'inputs': {
          'host': '127.0.0.1',
          'port': '22',
          'username': 'root',
          'password': 'root',
          'protocol': 'ssh',
          'command': 'ps'
        }
      }

      OO.schedules
      .scheduleFlow(flow)
      .then(function (body) {
        body.should.be.instanceof(Object)

        body.id.should.be.instanceof(String).and.not.empty()
        body.flowUuid.should.be.instanceof(String).and.not.empty()
        body.triggerExpression.should.be.instanceof(String).and.not.empty()

        return done()
      })
    })
  })

  describe('Configurations API', function () {
    it('config.getAllItems API should return an array with config items objects', function (done) {
      OO.setClient(options)

      OO.config
      .getAllItems()
      .then(function (body) {
        body.should.be.instanceof(Array)
        body.should.have.lengthOf(2)

        var configItem = body[0]

        configItem.type.should.be.instanceof(String).and.not.empty()
        configItem.path.should.be.instanceof(String).and.not.empty()
        configItem.name.should.be.instanceof(String).and.not.empty()
        configItem.value.should.be.instanceof(String)
        configItem.defaultValue.should.be.instanceof(String)
        configItem.customValue.should.be.instanceof(String)
        configItem.fullPath.should.be.instanceof(String).and.not.empty()
        configItem.uuid.should.be.instanceof(String).and.not.empty()

        return done()
      })
    })

    it('config.setItemAPI should return a config object after successfully setting its value', function (done) {
      OO.setClient(options)

      var configItem = {
        'type': 'group-aliases',
        'path': 'RAS_Operator_Path',
        'name': 'RAS_Operator_Path',
        'value': 'RAS_Operator_Path',
        'defaultValue': null,
        'customValue': 'RAS_Operator_Path',
        'fullPath': 'Configuration/Group Aliases/RAS_Operator_Path.xml',
        'uuid': '5233030c-af46-432b-a682-b326ca6bf2ae'
      }

      OO.config
      .setItem(configItem)
      .then(function (body) {
        body.should.be.instanceof(Object)

        body.type.should.be.instanceof(String).and.not.empty()
        body.path.should.be.instanceof(String).and.not.empty()
        body.name.should.be.instanceof(String).and.not.empty()
        body.value.should.be.instanceof(String).and.not.empty()
        body.customValue.should.be.instanceof(String)
        body.fullPath.should.be.instanceof(String).and.not.empty()
        body.uuid.should.be.instanceof(String).and.not.empty()

        return done()
      })
    })
  })
})
