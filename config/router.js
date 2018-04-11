const router = require('express').Router();
const rekognition = require('../controllers/rekognition');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');

router.route('/rekognition')
  .post(secureRoute, rekognition.getText);

router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));


module.exports = router;
