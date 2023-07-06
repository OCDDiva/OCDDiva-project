import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* fetchCustomers() {
    try {
        const response = yield axios.get('/api/forms/customers');
        console.log('response', response.data)
        yield put({ type: 'SET_CUSTOMERS_LIST', payload: response.data});
    } catch (error) {
        console.log(`Error in fetchCustomers: ${error}`);
        alert('Something went wrong!')
    }
}



function* customerSaga() {
    yield takeEvery('FETCH_CUSTOMERS', fetchCustomers);
}


export default customerSaga;