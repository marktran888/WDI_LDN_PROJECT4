const router = require('express').Router();
const rekognition = require('../controllers/rekognition');

router.route('/rekognition')
  .post(rekognition.getText);

module.exports = router;
