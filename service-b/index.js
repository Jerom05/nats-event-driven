const express = require('express')
const routes = require('./routes')
const natsWrapper = require('./nats-wrapper')
const listener = require('./events/listener')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 


app.use('/service-b', routes)

const start = async() => {
  await natsWrapper.connect('test-cluster', 'service-b', 'http://localhost:4222')
  
  listener.listen('service-a:created', 'service-b-group')
  listener.listen('service-a:updated', 'service-b-group')
  listener.listen('service-a:deleted', 'service-b-group')
  listener.listen('service-c:created', 'service-b-group')
  listener.listen('service-c:updated', 'service-b-group')
  listener.listen('service-c:deleted', 'service-b-group')

  process.on('SIGINT', () => natsWrapper.client.close())
  process.on('SIGTERM', () => natsWrapper.client.close())
  
  app.listen(4000, ()=> {
    console.log('🚀 Service C running on port 4000')
  })
}

start()
