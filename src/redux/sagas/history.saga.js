import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchHistory(){
    try{
        const history = yield axios.get('/api/history/userHistory/')
        yield put({ type: 'SET_HISTORY', payload: history.data })
    } catch (error) {
        console.log(`Error in fetchHistory ${error}`);
        alert ('Something went wrong.')
    }
}
function* historySaga(){
    yield takeLatest('GET_HISTORY', fetchHistory);
}
export default historySaga;