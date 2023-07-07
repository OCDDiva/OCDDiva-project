const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('In userHistory Router');
    const queryText = `SELECT 
    "services"."description" AS "services_id",
    "dates"."service_date" AS "service_date",
    "users"."username" AS "username",
    "completion"."description" AS "description",
    "notes"."notes" AS "notes"
    FROM "customer"
    JOIN "services" on "customer"."services_id" = "services"."id"
    JOIN "dates" on "customer"."service_on" = "dates"."service_date"
    JOIN "users" on "customer"."user_id" = "users"."id"
    JOIN "completion" on "customer"."completion_status" = "completion"."id"
    JOIN "notes" on "customer"."user_id" = "notes"."user_id"`;
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

router.put('/', (req, res) => {
    // PUT route code goes here
});

module.exports = router;