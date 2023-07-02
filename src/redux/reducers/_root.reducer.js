import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import inquiriesList from './inquiriesList.reducer';
import customerReducer from './customer.reducer';
import inquiryDetails from './inquiryDetails.reducer';
import history from './history.reducer';
import cleaningQuestionsReducer from './cleaning.reducer.js';
import movingQuestions from './history.reducer';
import organizingQuestions from './organizing.reducer';
import declutteringQuestions from './decluttering.reducer';
import inquiriesList from './inquiriesList.reducer';
import customerReducer from './customer.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user,
  inquiriesList, // will have an id and username if someone is logged in
  customerReducer,
  user, // will have an id and username if someone is logged in
  movingQuestions, 
  inquiryDetails, // will have an id and username if someone is logged in
  history,
  cleaningQuestionsReducer,
  organizingQuestions,
  declutteringQuestions,
  inquiriesList, // will have an id and username if someone is logged in
  customerReducer,
});

export default rootReducer;
