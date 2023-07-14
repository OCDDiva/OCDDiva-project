import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import customerReducer from './customer.reducer';
import inquiryDetails from './inquiryDetails.reducer';
import history from './history.reducer';
import cleaningQuestionsReducer from './cleaning.reducer.js';
import movingQuestions from './history.reducer';
import organizingQuestions from './organizing.reducer';
import declutteringQuestions from './decluttering.reducer';
import fetchInquiries from './fetchInquiries.reducer';
import defaultQuestionsReducer from './default.reducer';
import allUserInfo from './allUserInfo.reducer';
import userComments from './userComments.reducer';
import requestedDate from './requestedDate.reducer';
import photosToUpload from './photos.reducer';
import priorityList from './priorityList.reducer';
import completionStatus from './completionStatus.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  customerReducer,
  movingQuestions, 
  inquiryDetails,
  fetchInquiries, // will have an id and username if someone is logged in
  history,
  cleaningQuestionsReducer,
  organizingQuestions,
  declutteringQuestions, // will have an id and username if someone is logged in
  defaultQuestionsReducer,
  allUserInfo,
  userComments,
  requestedDate,
  photosToUpload,
  priorityList,
  completionStatus,
});

export default rootReducer;