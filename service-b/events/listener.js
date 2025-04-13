const natsWrapper = require('../nats-wrapper')

class Lisetener {
  listen(subject, queueGroupName) {

    const options =  natsWrapper.client
    .subscriptionOptions()
    .setDeliverAllAvailable()
    .setManualAckMode(true)
    .setDurableName(queueGroupName)

    const subscription = natsWrapper.client.subscribe(subject, queueGroupName, options)
  
    subscription.on('message', (msg) => {
      const data = JSON.parse(msg.getData())
      console.log('📩 Event received:', data)
      msg.ack()
    })
  }
}

module.exports = new Lisetener()
