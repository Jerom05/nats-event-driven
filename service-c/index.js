const express = require('express')
const routes = require('./routes')
const natsWrapper = require('./nats-wrapper')
const listener = require('./events/listener')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 


app.use('/service-c', routes)

const start = async() => {
  await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)
  
    listener.listen('service-a:created', 'service-c-group')
    listener.listen('service-a:updated', 'service-c-group')
    listener.listen('service-a:deleted', 'service-c-group')
    listener.listen('service-b:created', 'service-c-group')
    listener.listen('service-b:updated', 'service-c-group')
    listener.listen('service-b:deleted', 'service-c-group')
  
  app.listen(5000, ()=> {
    console.log('🚀 Service C running on port 5000')
  })
}

start()
