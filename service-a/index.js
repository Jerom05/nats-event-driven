const express = require('express')
const routes = require('./routes')
const natsWrapper = require('./nats-wrapper')
const listener = require('./events/listener')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 


app.use('/service-a', routes)

const start = async() => {
  await natsWrapper.connect('test-cluster', 'service-a', 'http://localhost:4222')
  
  listener.listen('service-b:created', 'service-a-group')
  listener.listen('service-b:updated', 'service-a-group')
  listener.listen('service-b:deleted', 'service-a-group')
  listener.listen('service-c:created', 'service-a-group')
  listener.listen('service-c:updated', 'service-a-group')
  listener.listen('service-c:deleted', 'service-a-group')

  process.on('SIGINT', () => natsWrapper.client.close())
  process.on('SIGTERM', () => natsWrapper.client.close())
  
  app.listen(3000, ()=> {
    console.log('🚀 Service A running on port 3000')
  })
}

start()
