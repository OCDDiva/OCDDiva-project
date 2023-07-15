const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    // GET route code here
    console.log('In GET for priority status');
    const queryText = `SELECT notes FROM customer WHERE inquiries = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`ERROR in SELECT all notes ${error}`);
        res.sendStatus(500);
    })
});



router.put('/notes', (req, res) => {
    // PUT #5 route code here
    console.log(`In PUT for notes`);
    if (req.isAuthenticated()) {
      const queryValues = [req.body.notes, req.body.inquiry_id];
      const queryText = `UPDATE "customer" SET "notes" = $1 WHERE "inquiries = $2;`;
      console.log(queryValues);
      pool.query(queryText, queryValues).then((result) => {
        res.sendStatus(200);
      }).catch((error) => {
        console.log(`Error in PUT for notes: ${error}`);
        res.sendStatus(500);
      })
    }
  });


router.delete('/', (req, res) => {
    // DELETE route code here
});

module.exports = router;