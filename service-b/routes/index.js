const router = require('express').Router();
const publisher = require('../events/publisher')

router.get('/', (req, res) => {
  res.send('🚀 Service B');
});

let post_id = 0

router.post('/', (req, res) => {
  // Publish an event to NATS 
  post_id = post_id + 1
  publisher.publish('service-b:created', { id: post_id , name: req.body?.name || 'Service B' })

  res.send('🚀 Service B received a post request!');
})

router.put('/', (req, res) => {
  // Publish an event to NATS
  publisher.publish('service-b:updated', { id: post_id , name: req.body?.name || 'Service B' })
  res.send('🚀 Service B received a put request!');
})

router.delete('/', (req, res) => {
  // Publish an event to NATS
  publisher.publish('service-c:deleted', { id: post_id , name: req.body?.name || 'Service B' })
  res.send('🚀 Service B received a delete request!');
})

module.exports = router;