
class Flows {
  constructor (requestManager) {
    this.requestManager = requestManager
  }

  /**
   * @returns {Promise.<FlowItem[]>}
   */
  async getFlowsLibrary () {
    return this.requestManager.request({
      actionUrl: `/flows/library`,
      method: 'GET'
    })
  }

  /**
   * @param {FlowItem[]} flowLibrary
   * @returns {FlowItem[]}
   */
  filterRunnables (flowLibrary) {
    return flowLibrary.filter((/* FlowItem */ flowLibraryItem) => {
      return flowLibraryItem.runnable
    })
  }

  /**
   * @param {string} flowId - Flow item uuid
   * @returns {Promise.<FlowItemDetails>}
   */
  async getFlowDetails (flowId) {
    return this.requestManager.request({
      actionUrl: `/flows/${flowId}`,
      method: 'GET'
    })
  }

  /**
   * @param {string} flowId - Flow item uuid
   * @returns {Promise.<FlowItemInput[]>}
   */
  async getFlowInputs (flowId) {
    return this.requestManager.request({
      actionUrl: `/flows/${flowId}/inputs`,
      method: 'GET'
    })
  }

  /**
   * @param {string} flowId - Flow item uuid
   * @returns {Promise.<FlowItemOutput[]>}
   */
  async getFlowOutputs (flowId) {
    return this.requestManager.request({
      actionUrl: `/flows/${flowId}/outputs`,
      method: 'GET'
    })
  }
}

module.exports = Flows

/**
 * @typedef {Object} FlowItem
 *
 * @property {string} id
 * @property {string|null} parentId
 * @property {boolean} leaf
 * @property {string} path
 * @property {string} name
 * @property {*|null} type
 * @property {string|null} icon - icon filename (png file)
 * @property {boolean} runnable
 * @property {boolean} graphicRepresentationCapable
 * @property {string[]} childrenIds
 */

 /**
  * @typedef {Object} FlowItemDetails
  *
  * @property {string} id
  * @property {string} name
  * @property {string} path
  * @property {string} description
  * @property {string} cpName
  * @property {string} version
  * @property {{LogLevelInfo: {LogLevel: string, LogLevelSource: string}, flowTimeout: *|null}} flowSettings
  */

/**
 * @typedef {Object} FlowItemInput
 *
 * @property {string} uuid
 * @property {string} name
 * @property {string} valueDelimiter
 * @property {string} description
 * @property {boolean} encrypted
 * @property {boolean} multiValue
 * @property {boolean} mandatory
 * @property {*|null} sources
 * @property {string} type
 * @property {string|null} validationId
 * @property {*} defaultValue
 */

 /**
  * @typedef {Object} FlowItemOutput
  *
  * @property {string} name
  */
