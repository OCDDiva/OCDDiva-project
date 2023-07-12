import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* setRequestedDate(action) {
    try {
        yield axios.put('/api/forms/dateRequest', action.payload);
        console.log('Update requested Date', action.payload);
        yield put({ type: 'SET_DATE_REQ '});
    } catch (error) {
        console.log(`Error in updating requested date ${error}`);
        alert('Something went wrong!');
    }
}

function* requestedDateSaga() {
    yield takeEvery('UPDATE_DATES', setRequestedDate)
}

export default requestedDateSaga;