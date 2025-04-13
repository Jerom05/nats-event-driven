const router = require('express').Router();
const publisher = require('../events/publisher')

router.get('/', (req, res) => {
  res.send('🚀 Service A');
});

let post_id = 0

router.post('/', (req, res) => {
  // Publish an event to NATS 
  post_id = post_id + 1
  publisher.publish('service-a:created', { id: post_id , name: req.body?.name || 'Service A' })

  res.send('🚀 Service A received a post request!');
})

router.put('/', (req, res) => {
  // Publish an event to NATS
  publisher.publish('service-a:updated', { id: post_id , name: req.body?.name || 'Service A' })
  res.send('🚀 Service A received a put request!');
})

router.delete('/', (req, res) => {
  // Publish an event to NATS
  publisher.publish('service-a:deleted', { id: post_id , name: req.body?.name || 'Service A' })
  res.send('🚀 Service A received a delete request!');
})

module.exports = router;