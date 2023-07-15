const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const aws = require('aws-sdk');
// const multer = require('multer');
// var upload = multer();
// const {
//   GetObjectCommand,
//   PutObjectCommand,
//   S3Client,
// } = require('@aws-sdk/client-s3');

const s3Client = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  // bucket:process.env.AWS_BUCKET,
});

router.get('/', async (req, res) => {
    // GET route code here
    try {

    } catch {

    }

});

router.post('/', async (req, res) => {
    // POST route code here
    // TODO Add route here for POST to S3 bucket? Not sure if we need POST or PUT since the field is NULL in the table already
    try {
      const { imageProps } = req.query;
      const imageData = req.files.image.data;
      const inquiryId = req.params.id;
      console.log('Check the image data', imageData);
      const s3Res = await s3Client.upload({
          Bucket: 'ocd-diva-project',
          Key: `photos/${imageProps}`,
          Body: imageData,
          // ACL: 'public-read',
      }).promise()
      console.log(s3Res.Location);
      const queryText = `INSERT INTO "user_media" ("url", "inquiry_id")
      VALUES ($1, $2)`;
      await pool.query(queryText, [inquiryId, s3Res.Location])
      res.sendStatus(201)
  } catch (error) {
      console.log(error)
      res.sendStatus(500);
  }
});

router.put('/', async (req, res) => {
    // PUT route code here
    console.log(`In PUT for photos`);
  if (req.isAuthenticated()) {
    try {
      const { imageProps } = req.query;
      const imageData = req.files.image.data;
      const inquiryId = req.params.id;
      console.log('Check the image data', imageData);
      const s3Res = await s3Client.upload({
          Bucket: 'ocd-diva-project',
          Key: `photos/${imageProps}`,
          Body: imageData,
          // ACL: 'public-read',
      }).promise()
      console.log(s3Res.Location);
      const queryText = `INSERT INTO "user_media" ("url", "inquiry_id")
      VALUES ($1, $2)`;
      await pool.query(queryText, [inquiryId, s3Res.Location])
      res.sendStatus(201)
  } catch (error) {
      console.log(error)
      res.sendStatus(500);
  }
  }
});

router.delete('/', (req, res) => {
    // DELETE route code goes here
});

module.exports = router;