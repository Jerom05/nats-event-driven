const natsWrapper = require('../nats-wrapper')

class Publisher {
  publish(subject, data) {
    return new Promise((resolve, reject) => {
      try {
        natsWrapper.client.publish(subject, JSON.stringify(data), () => {
          console.log(`📤 Published ${subject}`, data)
          resolve()
        })
      } catch (error) {
        console.error('Error publishing event:', error)
        reject(error)
      }
    })
  }
}

module.exports = new Publisher()