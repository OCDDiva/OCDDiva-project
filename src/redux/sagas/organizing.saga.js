import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateOrgQuestions(action) {
    try {
        yield axios.put('/api/forms/organizing', action.payload);
        console.log('Update Organizing Questions', action.payload);
        yield put({ type: 'SET_ORG_QUESTIONS' });
    } catch (error) {
        console.log(`Error in updating organizing questions: ${error}`);
        alert('Something went wrong!');
    }
}

function* organizingSaga() {
    yield takeEvery('UPDATE_ORG', updateOrgQuestions);
}

export default organizingSaga;