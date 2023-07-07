const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET INQUIRIES route template
 */
router.get('/inquiries', (req, res) => {
  // GET route code here
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
//! We need to update this now because the user inquiries table is different now
router.get('/inquiries/:id', (req, res) => {
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
//! We need to update this now because the user inquiries table is different now
router.get('/customers', (req, res) => {
  console.log('is Authenticated?', req.isAuthenticated());

  if (req.isAuthenticated()) {
    console.log('user', req.user);
    let queryText = `SELECT
                         "customer"."id",
                         "customer"."firstName", 
                         "customer"."lastName", 
                         "services"."description" AS "services_id", 
                         "customer"."completion_status", 
                         "customer"."service_on" 
                     FROM "customer"
                     JOIN "services" ON "customer"."services_id" = "services"."id";`;
    pool.query(queryText).then((result) => {
      console.log('results', result.rows);
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
 * GET #4 CUSTOMERS DETAILS (hint: by id) route template
 */
//! We need to update this now because the user inquiries table is different now
router.get('/customers/:id', (req, res) => {
  const customerId = req.params.id;
  console.log('is Authenticated?', req.isAuthenticated());

  if (req.isAuthenticated()) {
    console.log('user', req.user);
    let queryText = `SELECT
                           "customer"."firstName", 
                           "customer"."lastName", 
                           "services"."description" AS "services_id", 
                           "customer"."completion_status", 
                           "customer"."service_on" 
                       FROM "customer"
                       JOIN "services" ON "customer"."services_id" = "services"."id"
                       WHERE "customer"."id" = $1;`; // Use the customer ID parameter in the query
    pool.query(queryText, [customerId]).then((result) => {
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
 * GET #5 USER HISTORY route template
 */
router.get('/', (req, res) => {
  // GET #5 route code here
});

/**
 * POST ESSENTIAL CUSTOMER INFO(default) route template
 */
router.post('/', async (req, res) => {
  // POST route code here
  console.log('default data is:', req.body);
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.street1,
      req.body.street2,
      req.body.city,
      req.body.state,
      req.body.zip,
      req.body.phone_number,
      req.body.email,
    ];
    console.log(values);
    const queryText = `
      INSERT INTO "user_inquiries" 
      ("firstName", "lastName", "street1", "street2", "city", "state", "zip", "phone_number", "email") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "id";
    `;
    let inquiryResult = await client.query(queryText, values);
    let inquiryId = inquiryResult.rows[0].id;
    // INSERT INTO other tables
    const cleaningQuery = `INSERT INTO "cleaning_questions" ("inquiry_id") 
                           VALUES ($1);`;
    await client.query(cleaningQuery, [inquiryId]);
    const movingQuery = ` INSERT INTO "moving_questions" ("inquiry_id") 
                          VALUES ($1);`;
    await client.query(movingQuery, [inquiryId]);
    const organizingQuery = `INSERT INTO "organizing_questions" ("inquiry_id") 
                             VALUES ($1);`;
    await client.query(organizingQuery, [inquiryId]);
    const delcuttQuery = `INSERT INTO "decluttering_questions" ("inquiry_id") 
                          VALUES ($1);`;
    await client.query(delcuttQuery, [inquiryId]);
    await client.query('COMMIT');
    console.log('Data inserted successfully');
    res.sendStatus(200);
  } catch (e) {
    await client.query('ROLLBACK');
    console.log('Error inserting data', e);
    res.status(500).send('Failed to insert data.');
  } finally {
    client.release();
  }
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
    req.body.inquiry_id,
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
      WHERE "inquiry_id" = $9
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
    const queryValues = [req.body.moving, req.body.moving_to, req.body.moving_from, req.body.large_items, req.body.inquiry_id];
    console.log(req.inquiryId);
    const queryText = `UPDATE "moving_questions" SET "moving" = $1, "moving_to" = $2, "moving_from" = $3, "large_items" = $4 WHERE "inquiry_id" = $5;`;
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
 * PUT #3 ORGANIZE route template
 */
router.put('/organizing', (req, res) => {
  // PUT #3 route code here
  console.log(`In PUT for Organizing Questions`);
  if (req.isAuthenticated()) {
    const queryValues = [req.body.Organizing, req.body.Bedrooms, req.body.Bathrooms, req.body.AdditionalRooms, req.body.Donation, req.body.inquiry_id];
    console.log(req.inquiryId.id);
    const queryText = `UPDATE "organizing_questions" SET "Organizing" = $1, "Bedrooms" = $2, "Bathrooms" = $3, "AdditionalRooms" = $4, "Donation" = $5 WHERE "inquiry_id" = $6;`;
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
    const queryValues = [req.body.Declutter, req.body.Bedrooms, req.body.Bathrooms, req.body.AdditionalRooms, req.body.Donation, req.body.inquiry_id];
    const queryText = `UPDATE "decluttering_questions" SET "Declutter" = $1, "Bedrooms" = $2, "Bathrooms" = $3, "AdditionalRooms" = $4, "Donation" = $5 WHERE "inquiry_id" = $6;`;
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
