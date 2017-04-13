
class Config {
  constructor (requestManager) {
    this.configActionUrl = `/config-items`
    this.requestManager = requestManager
  }

  async getAllItems () {
    const result = await this.requestManager.request({
      actionUrl: this.configActionUrl,
      method: 'GET'
    })

    return result
  }

  async setItem (data) {
    if (!data.type || !data.name) {
      throw new Error('type and name properties must be provided')
    }

    if (!data.value) {
      data.value = 'null'
    }

    const result = await this.requestManager.request({
      actionUrl: this.configActionUrl + '/' + data.type + '/' + data.name,
      method: 'PUT',
      payload: data.value
    })

    return result
  }
}

module.exports = Config
