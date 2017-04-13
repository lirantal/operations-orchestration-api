
class RequestManager {
  constructor (r) {
    this.r = r
  }

  request (options) {
    return new Promise((resolve, reject) => {
      this.r({
        uri: options.actionUrl,
        method: options.method,
        body: options.payload,
        json: true
      }, (error, response, body) => {
        if (error) {
          reject(new Error(error), body)
        } else if ((response.statusCode === 200) || (response.statusCode === 201)) {
          resolve(response.body)
        } else {
          reject(new Error('finished with status code: ' + response.statusCode + ' and message of: ' + response.statusMessage), body)
        }
      })
    })
  }
}

module.exports = RequestManager
