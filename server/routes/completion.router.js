const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/completion', (req, res) => {
    // GET route code here
    console.log('In GET for completion status');
    const queryText = `SELECT * FROM completion;`;
    pool.query(queryText).then((result) => {
        console.log('Success!');
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error in SELECT all completion statuses ${error}`);
        res.sendStatus(500);
    })
});

router.put('/', (req, res) => {
    // PUT route code goes here
    console.log('In PUT for completion status');
    const queryText = `UPDATE completion SET description WEHRE id = $1;`;
    pool.query(queryText).then((response) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
        console.log(`Error in PUT for completion status ${error}`);
    })
});

module.exports = router;