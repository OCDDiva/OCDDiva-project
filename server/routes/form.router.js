const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET INQUIRIES route template
 */
router.get('/', (req, res) => {
  // GET route code here
  // console.log('is Authenticated?', req.isAuthenticated());
  console.log('is Authenticated?', req.isAuthenticated());

  if (req.isAuthenticated()) {
    console.log('user', req.user);
    let queryText = `SELECT
                          "services"."description" AS "services_id",
                          "dates"."date_submitted" AS "date_received",
                          "moving_questions"."id" AS "moving",
                          "cleaning_questions"."id" AS "cleaning",
                          "organizing_questions"."id" AS "organizing",
                          "decluttering_questions"."id" AS "declutting"
                          FROM "user_inquiries"
                          JOIN "services" ON "user_inquiries"."services_id" = "services"."id"
                          JOIN "dates" ON "user_inquiries"."date_received" = "dates"."id"
                          JOIN "moving_questions" ON "user_inquiries"."moving" = "moving_questions"."id"
                          JOIN "cleaning_questions" ON "user_inquiries"."cleaning" = "cleaning_questions"."id"
                          JOIN "organizing_questions" ON "user_inquiries"."organizing" = "organizing_questions"."id"
                          JOIN "decluttering_questions" ON "user_inquiries"."declutting" = "decluttering_questions"."id";`;
    pool.query(queryText).then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

/**
 * GET #2 INQUIRY DETAILS (hint: by id) route template
 */
router.get('/', (req, res) => {
  // GET #2 route code here
});

/**
 * GET #3 CUSTOMERS route template
 */
router.get('/', (req, res) => {
  // GET #3 route code here
});

/**
 * GET #4 CUSTOMERS DETAILS (hint: by id) route template
 */
router.get('/', (req, res) => {
  // GET #4 route code here
});

/**
 * GET #5 USER HISTORY route template
 */
router.get('/', (req, res) => {
  // GET #5 route code here
});

/**
 * POST ESSENTIAL CUSTOMER INFO(default) route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

/**
 * POST #2 PHOTOS route template
 */
router.post('/', (req, res) => {
  // POST #2 route code here
});

/**
 * PUT CLEANING route template
 */


router.put('/', (req, res) => {
  console.log('router form is:', req.body);
  const values = [
      req.body.cleaningOption, 
      req.body.serviceType,
      req.body.numberOfBedrooms,
      req.body.numberOfBathrooms,
      req.body.numberOfAdditionalRooms, 
      req.body.numberOfDoorsWindows,
      req.body.hasPets,
      req.body.hazardousConditions,
      req.body.userId,
  ];
console.log(values); 
  const queryText = `
    UPDATE "cleaning_questions" 
    SET 
      "Cleaning" = $1,
      "serviceType" = $2,
      "Bedrooms" = $3,
      "Bathrooms" = $4,
      "AdditionalRooms" = $5,
      "DoorsWindows" = $6,
      "HasPets" = $7,
      "HazardousConditions" = $8
      WHERE "id" = $9
  `;
  pool.query(queryText, values)
    .then(() => {
      console.log('Cleaning Questions updated successfully');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error updating cleaning questions', error);
      res.status(500).send('Failed to update cleaning questions.');
    });
});




/**
 * PUT #2 MOVING route template
 */
router.put('/', (req, res) => {
  // PUT #2 route code here
});

/**
 * PUT #3 ORGANIZE route template
 */
router.put('/', (req, res) => {
  // PUT #3 route code here
});

/**
 * PUT #4 DECLUTTER route template
 */
router.put('/', (req, res) => {
  // PUT #4 route code here
});

/**
 * DELETE BY ID route template
 */
router.delete('/', (req, res) => {
  // DELETE route code here
});

module.exports = router;
