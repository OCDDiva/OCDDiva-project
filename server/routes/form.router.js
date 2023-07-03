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
    let queryText = `SELECT *,
    "user_inquiries"."id" AS "inquiries",
    "completion"."description" AS "completion_status"
    FROM "customer"
    JOIN "user_inquiries" ON "customer"."inquiries" = "user_inquiries"."id"
    JOIN "cleaning_questions" ON "user_inquiries"."id" = "user_inquiries"."cleaning"
    JOIN "moving_questions" ON "user_inquiries"."id" = "user_inquiries"."moving"
    JOIN "organizing_questions" ON "user_inquiries"."id" = "user_inquiries"."organizing"
    JOIN "decluttering_questions" ON "user_inquiries"."id" = "user_inquiries"."declutting"
    JOIN "completion" ON "customer"."completion_status" = "completion"."id";`;
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
router.get('/:id', (req, res) => {
  // GET #2 route code here
  if (req.isAuthenticated()) {
    console.log(req.body)
    let queryText = `SELECT *,
    "user_inquiries"."id" AS "inquiries",
    "completion"."description" AS "completion_status"
    FROM "customer"
    JOIN "user_inquiries" ON "customer"."inquiries" = "user_inquiries"."id"
    JOIN "cleaning_questions" ON "user_inquiries"."id" = "user_inquiries"."cleaning"
    JOIN "moving_questions" ON "user_inquiries"."id" = "user_inquiries"."moving"
    JOIN "organizing_questions" ON "user_inquiries"."id" = "user_inquiries"."organizing"
    JOIN "decluttering_questions" ON "user_inquiries"."id" = "user_inquiries"."declutting"
    JOIN "completion" ON "customer"."completion_status" = "completion"."id"
    WHERE "customer"."user_id" = $1`;
    pool.query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(`Error in specific inquiry ${error}`)
      res.sendStatus(500);
    })
  }
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
      "ServiceType" = $2,
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
router.put('/moving', (req, res) => {
  // PUT #2 route code here
  console.log(`In PUT for Moving Questions`);
  if (req.isAuthenticated()) {
    const queryValues = [req.body.moving, req.body.moving_to, req.body.moving_from, req.body.large_items, req.user.id];
    const queryText = `UPDATE "moving_questions" SET "moving" = $1, "moving_to" = $2, "moving_from" = $3, "large_items" = $4 WHERE "user_id" = $5;`;
    console.log(queryValues);
    pool.query(queryText, queryValues).then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`Error in PUT for moving questions ${error}`);
      res.sendStatus(500);
    })
  }
});

// ! This is the new route possibly for adding in the user inquiries ID
// router.put('/moving', (req, res) => {
//   // PUT #2 route code here
//   console.log(`In PUT for Moving Questions`);
//   if (req.isAuthenticated()) {
//     const queryValues = [req.body.moving, req.body.moving_to, req.body.moving_from, req.body.large_items, req.params.id, req.user.id];
//     const queryText = `UPDATE "moving_questions" SET "moving" = $1, "moving_to" = $2, "moving_from" = $3, "large_items" = $4 WHERE "inquiries_id" = $5 and "user_id" =$6;`;
//     console.log(queryValues);
//     pool.query(queryText, queryValues).then((result) => {
//       res.sendStatus(200);
//     }).catch((error) => {
//       console.log(`Error in PUT for moving questions ${error}`);
//       res.sendStatus(500);
//     })
//   }
// });

/**
 * PUT #3 ORGANIZE route template
 */
router.put('/organizing', (req, res) => {
  // PUT #3 route code here
  console.log(`In PUT for Organizing Questions`);
  if (req.isAuthenticated()) {
    const queryValues = [req.body.Organizing, req.body.Bedrooms, req.body.Bathrooms, req.body.AdditionalRooms, req.body.Donation, req.user.id];
    const queryText = `UPDATE "organizing_questions" SET "Organizing" = $1, "Bedrooms" = $2, "Bathrooms" = $3, "AdditionalRooms" = $4, "Donation" = $5 WHERE "id" = $6;`;
    console.log(queryValues);
    pool.query(queryText, queryValues).then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`Error in PUT for moving questions ${error}`);
      res.sendStatus(500);
    })
  }
});

/**
 * PUT #4 DECLUTTER route template
 */
router.put('/decluttering', (req, res) => {
  // PUT #4 route code here
  console.log(`In PUT for Decluttering Questions`);
  if (req.isAuthenticated()) {
    const queryValues = [req.body.Declutter, req.body.Bedrooms, req.body.Bathrooms, req.body.AdditionalRooms, req.body.Donation, req.user.id];
    const queryText = `UPDATE "decluttering_questions" SET "Declutter" = $1, "Bedrooms" = $2, "Bathrooms" = $3, "AdditionalRooms" = $4, "Donation" = $5 WHERE "id" = $6;`;
    console.log(queryValues);
    pool.query(queryText, queryValues).then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`Error in PUT for moving questions ${error}`);
      res.sendStatus(500);
    })
  }
});

/**
 * DELETE BY ID route template
 */
router.delete('/', (req, res) => {
  // DELETE route code here
});

module.exports = router;
