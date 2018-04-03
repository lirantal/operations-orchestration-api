
class Executions {
  constructor (requestManager) {
    this.executionsActionUrl = `/executions`
    this.requestManager = requestManager
  }

  async executeFlow (data, cb) {
    if (!data) {
      throw new Error('missing data object for the payload')
    }

    if (!data.flowUuid) {
      throw new Error('flow uuid parameter is missing in options object')
    }

    const result = await this.requestManager.request({
      actionUrl: this.executionsActionUrl,
      method: 'POST',
      payload: data
    })

    return result
  };

	async executionSummary (flowid, cb) {
		if (!flowid) {
			throw new Error('missing data object for the payload')
		}
	
		const result = await this.requestManager.request({
			actionUrl: this.executionsActionUrl + '/' + flowid + '/summary',
			method: 'GET'
		})

		return result
	}

}

module.exports = Executions
