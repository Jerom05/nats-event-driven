const router = require('express').Router();
const publisher = require('../events/publisher')

router.get('/', (req, res) => {
  res.send('🚀 Service C');
});

let post_id = 0

router.post('/', (req, res) => {
  // Publish an event to NATS 
  post_id = post_id + 1
  publisher.publish('service-c:created', { id: post_id , name: req.body?.name || 'Service C' })

  res.send('🚀 Service C received a post request!');
})

router.put('/', (req, res) => {
  // Publish an event to NATS
  publisher.publish('service-c:updated', { id: post_id , name: req.body?.name || 'Service C' })
  res.send('🚀 Service C received a put request!');
})

router.delete('/', (req, res) => {
  // Publish an event to NATS
  publisher.publish('service-c:deleted', { id: post_id , name: req.body?.name || 'Service C' })
  res.send('🚀 Service C received a delete request!');
})

module.exports = router;