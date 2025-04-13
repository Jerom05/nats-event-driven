const stan = require('node-nats-streaming')

class NatsWrapper {
  #client

  async connect(clusterId, clientId, url) {
    this.#client = stan.connect(clusterId, clientId, { url })

    return new Promise((resolve, reject) => {
      this.#client.on('connect', () => {
        console.log('✅ Connected to NATS')
        resolve()
      })

      this.#client.on('error', (err) => {
        console.error('❌ NATS connection error:', err)
        reject(err)
      })
    })
  }

  get client() {
    if (!this.#client) {
      throw new Error('❌ Cannot access NATS client before connecting')
    }
    return this.#client
  }
}

module.exports = new NatsWrapper()