const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const fileUpload = require('express-fileupload');

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router'); // person logging in
// const customerRouter = require('./routes/customer.router.js'); // previous customers, admin looking at list of previous customers
// const userInquiries = require('./routes/userInquiries.router')
const notesRouter = require('./routes/notes.router');
const completeRouter = require('./routes/completion.router.js');
const priorityRouter = require('./routes/priority.router.js');
const formRouter = require('./routes/form.router');
const historyRouter = require('./routes/userHistory.router');
const inquiryDetailsRouter = require('./routes/inquirydetails.router');
const photosRouter = require('./routes/photos.router')

// Photo Upload Only
app.use(fileUpload());

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));
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
app.use('/api/inquirydetails', inquiryDetailsRouter);
app.use('/api/notes', notesRouter);
app.use('/api/complete', completeRouter);
app.use('/api/priority', priorityRouter);
app.use('/api/forms', formRouter);
app.use('/api/history', historyRouter);
app.use('/api/photos', photosRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5009;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
