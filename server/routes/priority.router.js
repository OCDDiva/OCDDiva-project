const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/priorities', (req, res) => {
    // GET route code here
    console.log('In GET for priority status');
    const queryText = `SELECT * FROM priority;`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`ERROR in SELECT all priority statuses ${error}`);
        res.sendStatus(500);
    })
});

router.put('/priorities', (req, res) => {
    // PUT route code goes here
    console.log('In PUT for priority status');
    const queryText = `UPDATE priority SET description WHERE id = $1;`;
    pool.query(queryText).then((res) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in UPDATE for priority status ${error}`);
        res.sendStatus(500);
    })
});

module.exports = router;