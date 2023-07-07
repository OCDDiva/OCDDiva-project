import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* defaultQuestions (action) {
    try{
        const defaultQuestions = action.payload
        console.log(defaultQuestions); 
        yield axios.post('/api/forms', defaultQuestions);
        yield put({type : 'SET_DEFAULT_QUESTIONS'});
    } catch (error){
        console.log('Error in default questions saga', error);
    }
}

function* defaultSaga() {
    yield takeLatest('ADD_DEFAULT_QUESTIONS', defaultQuestions);
}

export default defaultSaga;