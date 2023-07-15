const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

const {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} = require('@aws-sdk/client-s3');


const s3Client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// const multerS3Config = multerS3({
//   s3: s3Client,
//   bucket: 'ocd-diva-project', // Replace with your S3 bucket name
//   metadata: function (req, file, cb) {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: function (req, file, cb) {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerS3Config,
//   limits: {
//     fileSize: 10485760, // 10MB file size limit (adjust as needed)
//   },
// });

// https://ocd-diva-project.s3.us-east-2.amazonaws.com/images/Nollie.JPG

router.post("/upload", async (req, res) => {
  try {
    console.log(req.query)
    const { imageName, imageType, inquiryId } = req.query;
    const imageData = req.files.image.data;
    
    console.log('imageName', imageName)
    console.log('imageType', imageType)
    console.log('inquiry_id', inquiryId)
    console.log(imageData);

    const imageKey = `images/${imageName}`; // folder/file
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: imageKey,
        Body: imageData,
    });

    const response = await s3Client.send(command);
    // `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`
    
    const url = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`
    
    // const urlCommand = new GetObjectCommand({
    //   Bucket: process.env.AWS_BUCKET,
    //   Key: imageKey,
    //   Body: imageData,
    // })
    // const urlResponse = await s3Client.send(urlCommand);
    // console.log('URL Response', urlResponse);
    // const imageUrl = req.file.location;
    
    console.log(`The Url ${url} for inquiry #${inquiryId}`)
    const queryText = `INSERT INTO "user_media" ("url", "inquiry_id")
                      VALUES ($1, $2)`;

    await pool.query(queryText, [url, inquiryId]);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// const {
//   GetObjectCommand,
//   PutObjectCommand,
//   S3Client,
// } = require('@aws-sdk/client-s3');

// router.get('/', async (req, res) => {
//   // GET route code here
//   try {

//   } catch {

//   }

// });

// router.post("/", upload.single("file"), (req, res) => {
//   // POST route code here
//   try {
//     console.log('small fry', req.file);

//     // const { imageProps } = req.query;
//     // const imageData = req.files.image.data;
//     // const inquiryId = req.body.inquiry_id;
//     // console.log('Checking image', imageProps);
//     // console.log('Checking inquiry ID', inquiryId)
//     // console.log('Check the image data', imageData);
//     // const s3Res = await s3Client.upload({
//     //     Bucket: 'ocd-diva-project',
//     //     Key: `photos/${imageProps}/${inquiryId}`,
//     //     Body: imageData,
//     //     // ACL: 'public-read',
//     // }).promise()
//     // console.log(s3Res.Location);
//     // const queryText = `INSERT INTO "user_media" ("url", "inquiry_id")
//     // VALUES ($1, $2)`;

//     // await pool.query(queryText, [s3Res.Location, inquiryId])
//     // res.sendStatus(201)
//   } catch (error) {
//     console.log(error)
//     res.sendStatus(500);
//   }
// });

router.put('/', async (req, res) => {
  // PUT route code here
  console.log(`In PUT for photos`);
  if (req.isAuthenticated()) {
    try {
      const { imageName } = req.query;
      console.log('Check imageProps', imageName)
      const imageData = req.files.image.data;
      const inquiryId = req.params.id;
      console.log('Checking inquiry ID', inquiryId)
      console.log('Check the image data', imageData);
      const s3Res = await s3Client.upload({
        Bucket: 'ocd-diva-project',
        Key: `photos/${inquiryId}/${imageName}`,
        Body: imageData,
        // ACL: 'public-read',
      }).promise()
      console.log(s3Res.Location);
      const queryText = `UPDATE "user_media" SET "url" = $1 WHERE inquiry_id =$2`;
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