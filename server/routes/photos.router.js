const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/photos', (req, res) => {
    // GET route code here
});

router.post('/photos', (req, res) => {
    // POST route code here
});

router.put('/photos', (req, res) => {
    // PUT route code here
    console.log(`In PUT for photos`);
  if (req.isAuthenticated()) {
    const queryValues = [req.body.date_requested, req.body.inquiry_id];
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