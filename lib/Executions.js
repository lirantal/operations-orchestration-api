class Executions {
  constructor (requestManager) {
    this.executionsActionUrl = `/executions`;
    this.requestManager = requestManager;
  }

  async executeFlow (data, cb) {
    if (!data) {
      throw new Error('missing data object for the payload');
    }

    if (!data.uuid) {
      throw new Error('flow uuid parameter is missing in options object');
    }

    const result = await this.requestManager.request({
      actionUrl: this.executionsActionUrl,
      method: 'POST',
      payload: data
    });

    return result;
  };

  
  /**
   * Returns a list of executions summary, with filtering.
   *
   * @returns {Promise.<Execution[]>} The returned objects include the execution summary, 
   *                                  detailed objects with data about the execution.
   */
  async getExecutions() {
    return await this.requestManager.request({
      actionUrl: this.executionsActionUrl + '?pageSize=1000&pageNum=1',
      method: 'GET'
    });
  }

}

module.exports = Executions;


/**
 * @typedef {Object} Execution
 * 
 * @property {string} executionId
 * @property {*} branchId
 * @property {number} startTime
 * @property {number} endTime
 * @property {string} status - 'CANCELLED'|...
 * @property {*} resultStatusType
 * @property {*} resultStatusName
 * @property {string} pauseReason 'INPUT_REQUIRED'|...
 * @property {string} cancelReason 'MANUAL'|...
 * @property {string} owner
 * @property {string} ownerDomain - 'Corporation'
 * @property {string} triggeredBy - 'Corporation\user1'
 * @property {string} flowUuid
 * @property {string} flowPath
 * @property {string} executionName
 * @property {string} triggeringSource
 * @property {*} roi
 */