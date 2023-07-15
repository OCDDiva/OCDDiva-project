const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
var upload = multer();

const s3Client = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

router.get('/photos', (req, res) => {
    // GET route code here
});

router.post('/', upload.array('uploadedImages', 5), async (req, res) => {
    // POST route code here
    // TODO Add route here for POST to S3 bucket? Not sure if we need POST or PUT since the field is NULL in the table already
    try {
      const imageProps = req.query;
      const imageData = req.files.image.data;
      console.log(imageData);
      const s3Res = await s3Client.upload({
          Bucket: 'ocd-diva-project',
          Key: imageProps.name,
          Body: imageData,
          // ACL: 'public-read',
      }).promise()
      console.log(s3Res.Location);
      const queryText = `INSERT INTO "photos" ("url")
      VALUES ($1)`;
      await pool.query(queryText, [s3Res.Location])
      res.sendStatus(201)
  } catch (error) {
      console.log(error)
      res.sendStatus(500);
  }
});

router.put('/photos', (req, res) => {
    // PUT route code here
    console.log(`In PUT for photos`);
  if (req.isAuthenticated()) {
    const queryValues = [req.body.url, req.body.inquiry_id];
    const queryText = `UPDATE "user_media" SET "url" = $1 WHERE "inquiry_id" = $2;`;
    console.log(queryValues);
    pool.query(queryText, queryValues).then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`Error in PUT for userComments: ${error}`);
      res.sendStatus(500);
    })
  }
});

router.delete('/', (req, res) => {
    // DELETE route code goes here
});

module.exports = router;