import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* cleaningQuestions(action) {
    try{
        const cleaningQuestions = action.payload
        console.log(cleaningQuestions); 
        yield axios.put('/api/forms/cleaning', cleaningQuestions);
        yield put({type : 'SET_CLEANING_QUESTIONS'});
    } catch (error){
        console.log('Error in cleaning questions saga', error);
    }
}

function* cleaningSaga() {
    yield takeLatest('ADD_CLEANING_QUESTIONS', cleaningQuestions);
}

export default cleaningSaga;