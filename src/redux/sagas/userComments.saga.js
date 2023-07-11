import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* setUserComments(action) {
    try {
        yield axios.put('/api/forms/userComments', action.payload);
        console.log('Update userComments', action.payload);
        yield put({ type: 'SET_USER_COMMENTS' });
    } catch (error) {
        console.log(`Error in updating user comments ${error}`);
        alert('Something went wrong!')
    }
}

function* userCommentsSaga() {
    yield takeEvery('UPDATE_COMMENTS', setUserComments);
}

export default userCommentsSaga;