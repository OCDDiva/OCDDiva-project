const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  router.get('/userHistory', rejectUnauthenticated, (req, res) => {
    console.log('In userHistory Router');
    const queryText = `SELECT * FROM "user_inquiries"
    JOIN "moving_questions" ON "moving_questions"."inquiry_id" = "user_inquiries"."id"
    JOIN "cleaning_questions" ON "cleaning_questions"."inquiry_id" = "user_inquiries"."id"
    JOIN "organizing_questions" ON "organizing_questions"."inquiry_id" = "user_inquiries"."id"
    JOIN "decluttering_questions" ON  "decluttering_questions"."inquiry_id" = "user_inquiries"."id"
    WHERE "user_inquiries"."user_id" = $1;`;
    pool.query(queryText,[req.user.id]).then((result) => {
        console.log('Checking results', result.rows);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(`Error on query ${error}`);
        res.sendStatus(500);
    })
});

module.exports = router;