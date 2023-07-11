const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/userHistory', (req, res) => {
    console.log('In userHistory Router');
    const queryText = `SELECT 
    "services"."description" AS "service",
    "user_inquiries"."date_received" AS "date_received",
    "completion"."description" AS "status",
    "user_inquiries"."comments" AS "comments"
    FROM "user_inquiries"
    JOIN "services" on "user_inquiries"."services_id" = "services"."id"
    JOIN "completion" on "user_inquiries"."completion_status" = "completion"."id"
    WHERE "user_inquiries"."user_id" = $1`;
    pool
    .query(queryText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(`Error on query ${error}`);
        res.sendStatus(500);
    })
});

router.put('/history', (req, res) => {
    // PUT route code goes here
});

module.exports = router;