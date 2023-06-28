import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Inquiries from '../../components/Inquiries/Inquiries';

function* fetchInquiries() {
    try {
        const inquiries = yield axios.get('/api/forms');
        yield put({ type: 'SET_INQUIRIES', payload: inquiries.data});
    } catch (error) {
        console.log(`Error in fetchInquiries: ${error}`);
        alert('Something went wrong!')
    }
}

function* inquiriesSaga() {
    yield takeEvery('FETCH_INQUIRIES', fetchInquiries);
}

export default inquiriesSaga;