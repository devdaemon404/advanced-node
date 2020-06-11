const AWS = require('aws-sdk');
const uuid = require('uuid');
const requireLogin = require('../middlewares/requireLogin');
const { accessKeyId, secretAccessKey } = require('../config/keys');
const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
  region: 'ap-south-1',
});
module.exports = (app) => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid.v1()}.png`;
    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'random-bucket-1234',
        ContentType: 'image/png',
        Expires: 60 * 60,
        Key: key,
      },
      (err, url) =>
        res.json({
          key,
          url,
        })
    );
  });
};
