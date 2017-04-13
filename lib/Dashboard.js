
class Dashboard {
  constructor (requestManager) {
    this.statisticsActionUrl = `/executions/statistics`
    this.requestManager = requestManager
  }

  async statistics () {
    const result = await this.requestManager.request({
      actionUrl: this.statisticsActionUrl,
      method: 'GET'
    })

    return result
  }
}

module.exports = Dashboard
