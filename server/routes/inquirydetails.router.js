const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/inquirydetails/allUserInfo/:id', async (req, res) => {
    // GET #2 route code here
    try { 
      const queryText =  `SELECT * FROM "user_inquiries" WHERE "id"=$1;`
      const queryResult = await pool.query(queryText, [req.params.id])
      // const primaryTableId = queryResult.rows[0].id;
      console.log('Checking the primaryTableId', req.params.id)
      const customerQuery =  `SELECT * FROM "customer" WHERE inquiries = $1;`;
      const customerQueryResult = await pool.query(customerQuery, [req.params.id]);
      const cleaningQuestions = `SELECT * FROM "cleaning_questions" WHERE "inquiry_id" = $1;`;
      const cleaningResult = await pool.query(cleaningQuestions, [req.params.id]);
      const movingQuestions = `SELECT * FROM "moving_questions" WHERE "inquiry_id" = $1;`;
      const movingResult = await pool.query(movingQuestions, [req.params.id]);
      const organizingQuestions = `SELECT * FROM "organizing_questions" WHERE "inquiry_id" = $1;`;
      const orgResult = await pool.query(organizingQuestions, [req.params.id]);
      const declutteringQuestions = `SELECT * FROM "decluttering_questions" WHERE "inquiry_id" = $1;`;
      const decluttResult = await pool.query(declutteringQuestions, [req.params.id]);
      const userMedia = `SELECT * FROM "user_media" WHERE "inquiry_id" = $1;`;
      const mediaResult = await pool.query(userMedia, [req.params.id]);
      // await client.query('COMMIT');
      console.log('Checking shit out:', queryResult.rows)
      console.log('All User data retrieved successfully.');
      res.send({ contact: queryResult.rows, customer: customerQueryResult.rows, cleaning: cleaningResult.rows, moving: movingResult.rows, organize: orgResult.rows, declutt: decluttResult.rows, media: mediaResult.rows });  } catch (error) {
      console.log('Error inserting data', error);
      res.status(500).send('Failed to insert data.');
    }
  });

  module.exports = router;