
class Schedules {
  constructor (requestManager) {
    this.schedulesActionUrl = '/schedules'
    this.requestManager = requestManager
  }

  async scheduleFlow (data, cb) {
    if (!data) {
      throw new Error('missing data object for the payload')
    }

    if (!data.flowUuid) {
      throw new Error('flow uuid parameter is missing in options object')
    }

    if (!data.triggerExpression) {
      throw new Error('flow triggerExpression parameter is missing in options object')
    }

    const result = await this.requestManager.request({
      actionUrl: this.schedulesActionUrl,
      method: 'POST',
      payload: data
    })

    return result
  };
}

module.exports = Schedules
