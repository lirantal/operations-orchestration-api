'use strict'

const request = require('request')
const RequestManager = require('./RequestManager')
const Dashboard = require('./Dashboard')
const Executions = require('./Executions')
const Schedules = require('./Schedules')
const Config = require('./Config')

class OO {
  injectRequestManager (requestManager) {
    this.dashboard = new Dashboard(requestManager)
    this.executions = new Executions(requestManager)
    this.schedules = new Schedules(requestManager)
    this.config = new Config(requestManager)
  }

  setClient (options) {
    if (!options.username || !options.password) {
      return new Error('no username or password settings provided in options object')
    }

    this.username = options.username
    this.password = options.password

    if (!options.baseUrl) {
      return new Error('no baseUrl setting provided in options object')
    }

    this.baseUrl = options.baseUrl

    this.r = request.defaults({
      baseUrl: options.baseUrl,
      proxy: '',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64')
      },
      strictSSL: options.validSSL || false
    })

    this.injectRequestManager(new RequestManager(this.r))

    // Return the options that were set
    return {
      username: this.username,
      password: this.password,
      baseUrl: this.baseUrl
    }
  }
}

const OOInstance = new OO()

module.exports = OOInstance
