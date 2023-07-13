const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/userHistory', (req, res) => {
    console.log('In userHistory Router');
    const queryText = `SELECT 
    "user_inquiries"."date_received" AS "date_received",
    "completion"."description" AS "status",
    "user_inquiries"."comments" AS "comments"
    FROM "user_inquiries"
    JOIN "completion" on "user_inquiries"."completion_status" = "completion"."id"
    JOIN "moving_questions" ON "moving_questions"."inquiry_id" = "user_inquiries"."id"
    JOIN "cleaning_questions" ON "cleaning_questions"."inquiry_id" = "user_inquiries"."id"
    JOIN "organizing_questions" ON "organizing_questions"."inquiry_id" = "user_inquiries"."id"
    JOIN "decluttering_questions" ON  "decluttering_questions"."inquiry_id" = "user_inquiries"."id"
    WHERE "user_inquiries"."user_id" = 1
    ORDER BY "user_inquiries"."id" DESC;`;
    pool.query(queryText).then((result) => {
        console.log('Checking results', result.rows);
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