import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateMovingQuestions(action) {
    try {
        yield axios.put('/api/forms/moving', action.payload);
        console.log('Update Moving Questions', action.payload);
        yield put({ type: 'SET_MOVING_QUESTIONS' });
    } catch (error) {
        console.log(`Error in updating moving questions: ${error}`);
        alert('Something went wrong!');
    }
}

function* movingSaga() {
    yield takeEvery('UPDATE_MOVING', updateMovingQuestions);
}

export default movingSaga;