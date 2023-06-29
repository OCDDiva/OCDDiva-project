import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateDecluttQuestions(action) {
    try {
        yield axios.put('/api/forms/decluttering', action.payload);
        console.log('Update Decluttering Questions', action.payload);
        yield put({ type: 'SET_DECLUTT_QUESTIONS' });
    } catch (error) {
        console.log(`Error in updating Decluttering questions: ${error}`);
        alert('Something went wrong!');
    }
}

function* declutteringSaga() {
    yield takeEvery('UPDATE_DECLUTT', updateDecluttQuestions);
}

export default declutteringSaga;