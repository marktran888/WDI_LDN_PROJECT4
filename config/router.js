const router = require('express').Router();
const rekognition = require('../controllers/rekognition');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const main = require('../controllers/main');

router.route('/rekognition')
  .post(secureRoute, rekognition.getText);

router.route('/main/:id')
  .get(main.show)
  .put(secureRoute, main.update);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));


module.exports = router;
