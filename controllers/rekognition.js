const AWS = require('aws-sdk');
const Promise = require('bluebird');

const rekognition = new AWS.Rekognition({
  accessKeyId: process.env.REKOGNITION_API_KEY,
  secretAccessKey: process.env.REKOGNITION_API_SECRET,
  region: 'eu-west-1'
});

function getText(req, res, next) {
  const imageData = req.body.image.match(/.+base64,(.+)/)[1];
  const buffer = new Buffer(imageData, 'base64');

  // const allergies = getAllergies(req.currentUser._id);
  const allergies = ['milk', 'sesame', 'Milk'];

  return new Promise((resolve, reject) => {
    rekognition.detectText({
      Image: { Bytes: buffer }
    }, (err, data) => {
      if(err) return reject(err);
      return resolve(data);
    });
  })
    .then(data => data.TextDetections.map(detection => detection.DetectedText))
    // rather than sending the text back to the client
    // get the user's allergin array here and check if they appear in the text
    // return an array of matching allergins
    .then(textArray => {
      const text = textArray.join(' ');
      const watchList = [];
      for (let i = 0; i < allergies.length; i++) {
        if(text.search(new RegExp(allergies[i], 'i'))) watchList.push(allergies[i]);
        // if(text.includes(allergies[i])) watchList.push(allergies[i]);
      }
      res.json({ watchList });
    })
    .catch(next);
}

module.exports = {
  getText
};
