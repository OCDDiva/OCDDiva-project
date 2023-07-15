const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET INQUIRIES route template
 */
router.get('/inquiries/allUserInfo', async (req, res) => {
  // GET #5 route code here
  if (req.isAuthenticated()) {
    console.log('user', req.user);
    const queryText =  `SELECT * FROM "user_inquiries" WHERE "completion_status" < 5 ORDER BY id DESC;`
    console.log('All User data retrieved successfully.');
    pool.query(queryText).then((result) => {
      console.log('for all inquiries (line13)', result.rows);
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
 * PUT (edit) PRIORITY
 */
router.put('/inquiries/priority', (req, res) => {
  // PUT #2 route code here
  console.log(`In PUT for Priority Level`);
  if (req.isAuthenticated()) {
    const queryValues = [req.body.priority, req.body.id];
    const queryText = `UPDATE "user_inquiries" SET "priority" = $1 WHERE "id" = $2;`;
    console.log(queryValues);
    pool.query(queryText, queryValues).then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`Error in PUT for Priority ${error}`);
      res.sendStatus(500);
    })
  }
});

router.put('/inquiries/completion', (req, res) => {
  // PUT #2 route code here
  console.log(`In PUT for Priority Level`);
  if (req.isAuthenticated()) {
    const queryValues = [req.body.completion_status, req.body.id];
    const queryText = `UPDATE "user_inquiries" SET "completion_status" = $1 WHERE "id" = $2;`;
    console.log(queryValues);
    pool.query(queryText, queryValues).then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`Error in PUT for Completion Status ${error}`);
      res.sendStatus(500);
    })
  }
});

/**
 * GET #3 CUSTOMERS route template
 */
// //! We need to update this now because the user inquiries table is different now
router.get('/customers', async (req, res) => {
  // GET #5 route code here
  if (req.isAuthenticated()) {
    console.log('user', req.user);
    const queryText =  `SELECT * FROM "user_inquiries" WHERE "completion_status" = 5 ORDER BY id DESC;`
    console.log('All User data retrieved successfully.');
    pool.query(queryText).then((result) => {
      console.log('for all inquiries (line13)', result.rows);
      res.send(result.rows);
    }).catch((error) => {
      console.log('HERE', error);
      res.sendStatus(500);
    });
} else {
  res.sendStatus(403);
}
});
// router.get('/customers', (req, res) => {
//   console.log('is Authenticated?', req.isAuthenticated());
//   console.log('HERE /customers')
//   if (req.isAuthenticated()) {
//     console.log('user', req.user);
//     let queryText = `SELECT "customer"."id","user_inquiries"."firstName", "user_inquiries"."lastName","cleaning_questions"."ServiceType", "user_inquiries"."completion_status", "customer"."service_on","customer"."notes" 
//     FROM "customer"
//     JOIN "user_inquiries" ON "customer"."inquiries" = "user_inquiries"."id"
//     JOIN "cleaning_questions" ON "user_inquiries"."id" = "cleaning_questions"."inquiry_id"
//     WHERE "user_inquiries".completion_status = 5`;
//     pool.query(queryText).then((result) => {
//       console.log('results', result.rows);
//       res.send(result.rows);
//     }).catch((error) => {
//       console.log('HERE', error);
//       res.sendStatus(500);
//     });
//   } else {
//     res.sendStatus(403);
//   }
// });




/**
 * GET #4 CUSTOMERS DETAILS (hint: by id) route template
 */
//! We need to update this now because the user inquiries table is different now
router.get('/customers/:id', (req, res) => {
  const customerId = req.params.id;
  console.log('is Authenticated?', req.isAuthenticated());

  if (req.isAuthenticated()) {
    console.log('user', req.user);
    let queryText = `SELECT * FROM "customer"
    JOIN "user_inquiries" ON "customer"."inquiries" = "user_inquiries"."id"
    JOIN "completion" ON "user_inquiries"."completion_status" = "completion"."id"
    JOIN "moving_questions" ON "moving_questions"."inquiry_id" = "customer"."inquiries"
    JOIN "cleaning_questions" ON "cleaning_questions"."inquiry_id" = "customer"."inquiries"
    JOIN "organizing_questions" ON "organizing_questions"."inquiry_id" = "customer"."inquiries"
    JOIN "decluttering_questions" ON  "decluttering_questions"."inquiry_id" = "customer"."inquiries"
    JOIN "user_media" ON "user_media"."inquiry_id" = "customer"."inquiries"
    WHERE "customer"."inquiries" = $1;
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
    res.send({ contact: queryResult.rows[0], customer: customerQueryResult.rows[0], cleaning: cleaningResult.rows[0], moving: movingResult.rows[0], organize: orgResult.rows[0], declutt: decluttResult.rows[0], media: mediaResult.rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error retreiving data', error);
    res.status(500).send('Failed to insert data.');
  } finally {
    client.release();
  }
});

/**
 * GET #5 notes route template
 */
router.put('/notes', (req, res) => {
  // PUT #5 route code here
  console.log(`In PUT for notes`);
  if (req.isAuthenticated()) {
    const queryValues = [req.body.notes, req.body.inquiry_id];
    const queryText = `UPDATE "customer" SET "notes" = $1 WHERE "inquiries" = $2;`;
    console.log(queryValues);
    pool.query(queryText, queryValues).then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`Error in PUT for notes: ${error}`);
      res.sendStatus(500);
    })
  }
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
      req.body.user_id,
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
    const userMediaQuery = `INSERT INTO "user_media" ("inquiry_id") VALUES ($1);`;
    await client.query(userMediaQuery, [inquiryId])
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
    req.body.numberOfDoors,
    req.body.numberOfWindows,
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
      "Doors" = $6,
      "Windows" = $7,
      "HasPets" = $8,
      "HazardousConditions" = $9
      WHERE "inquiry_id" = $10
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
  // PUT #5 route code here
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

router.put('/dateRequest', (req, res) => {
  // PUT #6 route code here
  console.log(`In PUT for dateRequest`);
  if (req.isAuthenticated()) {
    const queryValues = [req.body.date_requested, req.body.inquiry_id];
    const queryText = `UPDATE "user_inquiries" SET "date_requested" = $1 WHERE "id" = $2;`;
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
router.delete('/customers/:id', (req, res) => {
  const customerId = req.params.id;
  console.log('hello', req.params.id)
  const query = 'DELETE FROM "user_inquiries" WHERE "id" = $1';
  const values = [customerId];
  
  pool.query(query, values)
    .then(() => {
      res.sendStatus(204); // Send a 204 No Content response if successful
    })
    .catch((error) => {
      console.log(`Error in DELETE /forms/customers/${customerId}:`, error);
      res.sendStatus(500);
    });
});


module.exports = router;
