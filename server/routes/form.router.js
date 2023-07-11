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
router.get('/allUserInfo/:id', async (req, res) => {
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
    console.log('All User data retrieved successfully.');
    res.send({queryResult, customerQueryResult, cleaningResult,movingResult, orgResult, decluttResult, mediaResult});
  } catch (error) {
    console.log('Error inserting data', error);
    res.status(500).send('Failed to insert data.');
  }
});

/**
 * GET #3 CUSTOMERS route template
 */
//! We need to update this now because the user inquiries table is different now
router.get('/customers', (req, res) => {
  console.log('is Authenticated?', req.isAuthenticated());
  console.log('HERE /customers')
  if (req.isAuthenticated()) {
    console.log('user', req.user);
    let queryText = `SELECT
    "customer"."id",
    "user_inquiries"."firstName", 
    "user_inquiries"."lastName", 
    "services"."description" AS "services_id", 
    "user_inquiries"."completion_status", 
    "customer"."service_on",
    "customer"."notes"
    FROM "customer"
    JOIN "user_inquiries" ON "customer"."inquiries" = "user_inquiries"."id"
    JOIN "services" ON "customer"."services_id" = "services"."id";`;
    pool.query(queryText).then((result) => {
      console.log('results', result.rows);
      res.send(result.rows);
    }).catch((error) => {
      console.log('HERE', error);
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
    let queryText = `
      SELECT
        "customer"."id",
        "user_inquiries"."firstName", 
        "user_inquiries"."lastName", 
        "services"."description" AS "services_id", 
        "user_inquiries"."completion_status", 
        "customer"."service_on",
        "customer"."notes"
      FROM "customer"
      JOIN "user_inquiries" ON "customer"."inquiries" = "user_inquiries"."id"
      JOIN "services" ON "customer"."services_id" = "services"."id"
      WHERE "customer"."id" = $1;
    `; // Use the customer ID parameter in the query
    pool.query(queryText, [customerId])
      .then((result) => {
        console.log(result.rows);
        res.send(result.rows);
      })
      .catch((error) => {
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
router.get('/allUserInfo', async (req, res) => {
  // GET #5 route code here
  const client = await pool.connect();
  try { 
    await client.query('BEGIN');
    const queryText =  `SELECT * FROM "user_inquiries";`
    const queryResult = await client.query(queryText)
    const primaryTableId = queryResult.rows[0].id;
    console.log('Checking the primaryTableId', primaryTableId)
    const customerQuery =  `SELECT * FROM "customer" WHERE inquiries = $1;`;
    const customerQueryResult = await client.query(customerQuery, [primaryTableId]);
    const cleaningQuestions = `SELECT * FROM "cleaning_questions" WHERE "inquiry_id" = $1;`;
    const cleaningResult = await client.query(cleaningQuestions, [primaryTableId]);
    const movingQuestions = `SELECT * FROM "moving_questions" WHERE "inquiry_id" = $1;`;
    const movingResult = await client.query(movingQuestions, [primaryTableId]);
    const organizingQuestions = `SELECT * FROM "organizing_questions" WHERE "inquiry_id" = $1;`;
    const orgResult = await client.query(organizingQuestions, [primaryTableId]);
    const declutteringQuestions = `SELECT * FROM "decluttering_questions" WHERE "inquiry_id" = $1;`;
    const decluttResult = await client.query(declutteringQuestions,[primaryTableId]);
    const userMedia = `SELECT * FROM "user_media" WHERE "inquiry_id" = $1;`;
    const mediaResult = await client.query(userMedia, [primaryTableId]);
    await client.query('COMMIT');
    console.log('All User data retrieved successfully.');
    res.send({queryResult, customerQueryResult, cleaningResult,movingResult, orgResult, decluttResult, mediaResult});
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error inserting data', error);
    res.status(500).send('Failed to insert data.');
  } finally {
    client.release();
  }
});

/**
 * GET #5 USER HISTORY route template
 */
// router.get('/allUserInfo', async (req, res) => {
//   // GET #5 route code here
//   const client = await pool.connect();
//   try { 
//     await client.query('BEGIN');
//     const queryText =  `SELECT * FROM "user_inquiries";`
//     const queryResult = await client.query(queryText)
//     console.log(queryResult);
//     const primaryTableId = queryResult.rows[0].id;
//     console.log('Checking the primaryTableId', primaryTableId)
//     const customerQuery =  `SELECT * FROM "customer";`;
//     await client.query(customerQuery);
//     const cleaningQuestions = `SELECT * FROM "cleaning_questions";`;
//     await client.query(cleaningQuestions);
//     const movingQuestions = `SELECT * FROM "moving_questions";`;
//     await client.query(movingQuestions);
//     const organizingQuestions = `SELECT * FROM "organizing_questions";`;
//     await client.query(organizingQuestions);
//     const declutteringQuestions = `SELECT * FROM "decluttering_questions";`;
//     await client.query(declutteringQuestions);
//     const userMedia = `SELECT * FROM "user_media";`;
//     await client.query(userMedia);
//     await client.query('COMMIT');
//     console.log('All User data retrieved successfully.');
//     // TODO Finish this so we can retrieve all data from the tables as a single object and parse through it
//     // res.send(result.rows)
//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.log('Error inserting data', error);
//     res.status(500).send('Failed to insert data.');
//   } finally {
//     client.release();
//   }
// });


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
      req.body.user_id,
    ];
    console.log(values);
    const queryText = `
      INSERT INTO "user_inquiries" 
      ("firstName", "lastName", "street1", "street2", "city", "state", "zip", "phone_number", "email", "user_id") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING "id";
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
    const customerQuery = `INSERT INTO "customer" ("inquiries") VALUES ($1);`;
    await client.query(customerQuery, [inquiryId]);
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
