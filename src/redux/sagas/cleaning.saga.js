import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* cleaningQuestions(action) {
    try{
        const { cleaningQuestions } = action.payload
        yield axios.post('/api/c')
        yield put({type : 'SET_CLEANING_QUESTIONS', payload: cleaningQuestions });
        
    } catch (error){
        console.log('Error in cleaning questions saga', error);
    }
}

function* cleaningSaga() {
    yield takeLatest('ADD_CLEANING_QUESTIONS', cleaningQuestions);
}

export default cleaningSaga