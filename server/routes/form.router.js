const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET INQUIRIES route template
 */
router.get('/inquiries/allUserInfo', async (req, res) => {
  // GET #5 route code here
    const queryText =  `SELECT * FROM "user_inquiries" ORDER BY id DESC;`
    console.log('All User data retrieved successfully.');
    pool.query(queryText).then((result) => {
      console.log('results', result.rows);
      res.send(result.rows);
    }).catch((error) => {
      console.log('HERE', error);
      res.sendStatus(500);
    });
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
    res.send({ contact: queryResult.rows, customer: customerQueryResult.rows, cleaning: cleaningResult.rows, moving: movingResult.rows, organize: orgResult.rows, declutt: decluttResult.rows, media: mediaResult.rows });  } catch (error) {
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
 * GET #5 ALL USER INFO route template
 */
router.get('/allUserInfo', async (req, res) => {
  // GET #5 route code here
  const client = await pool.connect();
  try { 
    await client.query('BEGIN');
    const queryText =  `SELECT * FROM "user_inquiries" ORDER BY id DESC;`
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
    res.send({ contact: queryResult.rows, customer: customerQueryResult.rows, cleaning: cleaningResult.rows, moving: movingResult.rows, organize: orgResult.rows, declutt: decluttResult.rows, media: mediaResult.rows });
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error retreiving data', error);
    res.status(500).send('Failed to insert data.');
  } finally {
    client.release();
  }
});

/**
 * GET #5 USER HISTORY route template
 */


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
      // req.body.priority,
      // req.body.completion,
    ];
    console.log(values);
    const queryText = `
      INSERT INTO "user_inquiries" 
      ("date_received", "firstName", "lastName", "street1", "street2", "city", "state", "zip", "phone_number", "email", "user_id") 
      VALUES (NOW(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING "id";
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
 * PUT CLEANING route template
 */
router.put('/cleaning', (req, res) => {
  console.log('Cleaning data is:', req.body);
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
      console.log(`Error in PUT for organizing questions ${error}`);
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
      console.log(`Error in PUT for decluttering questions ${error}`);
      res.sendStatus(500);
    })
  }
});

router.put('/userComments', (req, res) => {
  // PUT #4 route code here
  console.log(`In PUT for UserCommments`);
  if (req.isAuthenticated()) {
    const queryValues = [req.body.comments, req.body.inquiry_id];
    const queryText = `UPDATE "user_inquiries" SET "comments" = $1 WHERE "id" = $2;`;
    console.log(queryValues);
    pool.query(queryText, queryValues).then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`Error in PUT for userComments: ${error}`);
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
