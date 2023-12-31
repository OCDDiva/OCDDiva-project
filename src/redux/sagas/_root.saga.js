import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import inquiriesSaga from './inquiries.saga';
import customerSaga from './customer.saga';
import historySaga from './history.saga';
import cleaningSaga from './cleaning.saga';
import movingSaga from './moving.saga';
import organizingSaga from './organizing.saga';
import declutteringSaga from './decluttering.saga';
import defaultSaga from './default.saga';
import allUserInfoSaga from './allUserInfo.saga';
import userCommentsSaga from './userComments.saga';
import requestedDateSaga from './requestedDate.saga';
import photosSaga from './photos.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    inquiriesSaga(),
    customerSaga(),
    cleaningSaga(),
    historySaga(),
    movingSaga(),
    organizingSaga(),
    declutteringSaga(),
    defaultSaga(),
    allUserInfoSaga(),
    userCommentsSaga(),
    requestedDateSaga(),
    photosSaga(),
  ]);
}