'use strict'
/**
 * Tests API Mocks resource
 * @module tests api mocks
 */

/**
 * Module dependencies.
 */
var nock = require('nock')

var apiMocks = function () {
  nock('http://my-oo-host.com:8050/oo/rest/v1')
  .get('/executions/statistics')
  .reply(200, [{
    flowUuid: '06fe8531-868b-4e79-aa7a-13a5e30a66ec',
    flowPath: 'Library/Utility Operations/Samples/Generate Random Number.xml',
    flowRoi: 1,
    numberOfExecutions: 1,
    averageExecutionTime: 281,
    resultsDistribution: []
  }])

  nock('http://my-oo-host.com:8050/oo/rest/v1')
  .post('/executions')
  .reply(200, {
    feedUrl: 'http://myd-vm03021.hpswlabs.adapps.hp.com:8050/oo/rest/v1/executions/112600043/steps',
    executionId: '112600043',
    errorCode: 'NO_ERROR'
  })

  nock('http://my-oo-host.com:8050/oo/rest/v1')
  .post('/schedules')
  .reply(201, {
    'id': '1347298851037',
    'flowScheduleName': 'Scheduled Flow Created By REST',
    'flowUuid': 'c34de7d6-14cc-4a1c-b25e-85afbb064359',
    'triggerExpression': '*/60000',
    'startDate': 1314079869000,
    'endDate': 1491302669536,
    'username': 'DavisJ',
    'numOfOccurrences': 5,
    'runLogLevel': 'DEBUG',
    'timeZone': 'Asia/Amman',
    'nextFireTime': null,
    'prevFireTime': null,
    'enabled': false,
    'inputPromptUseBlank': false,
    'inputs': {
      'input1': 'value for input1',
      'input2': 'value for inputn'
    }
  })

  nock('http://my-oo-host.com:8050/oo/rest/v1')
  .get('/config-items')
  .reply(200, [
    {
      type: 'domain-terms',
      path: 'Action',
      name: 'Action',
      value: 'null',
      defaultValue: '',
      customValue: 'null',
      fullPath: 'Configuration/Domain Terms/Action.xml',
      uuid: 'd65c6bfb-fcad-487a-8895-19a5c1cf4307'
    },
    {
      type: 'domain-terms',
      path: 'Alert',
      name: 'Alert',
      value: 'null',
      defaultValue: '',
      customValue: 'null',
      fullPath: 'Configuration/Domain Terms/Alert.xml',
      uuid: 'f73028c9-7fff-4e07-9e73-5d3fa3647f82'
    }
  ])

  nock('http://my-oo-host.com:8050/oo/rest/v1')
  .put('/config-items/group-aliases/RAS_Operator_Path')
  .reply(200, {
    type: 'group-aliases',
    path: 'RAS_Operator_Path',
    name: 'RAS_Operator_Path',
    value: 'RAS_Operator_Path',
    defaultValue: null,
    customValue: 'RAS_Operator_Path',
    fullPath: 'Configuration/Group Aliases/RAS_Operator_Path.xml',
    uuid: '5233030c-af46-432b-a682-b326ca6bf2ae'
  })
}

module.exports = apiMocks
