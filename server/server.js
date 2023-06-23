const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router'); // person logging in
// const customerRouter = require('./routes/customerRouter'); // previous customers, admin looking at list of previous customers
// const userInquiries = require('./routes/userInquiries.router')
const notesRouter = require('./routes/notes.router');
const completeRouter = require('./routes/completion.router.js');
const priorityRouter = require('./routes/priority.router.js');
const formRouter = require('./routes/form.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
// app.use('/api/customers', customerRouter);
// app.use('/api/user_inquiries', userInquiries);
app.use('/api/notes', notesRouter);
app.use('/api/complete', completeRouter);
app.use('/api/priority', priorityRouter);
app.use('/api/forms', formRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5009;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
