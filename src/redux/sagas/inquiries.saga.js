import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Inquiries from '../../components/Inquiries/Inquiries';

function* fetchInquiries() {
    try {
        const inquiries = yield axios.get('/api/forms/inquiries/allUserInfo');
        yield put({ type: 'SET_INQUIRIES', payload: inquiries.data});
        console.log(inquiries);
    } catch (error) {
        console.log(`Error in fetchInquiries: ${error}`);
        alert('Something went wrong!')
    }
}

function* fetchInquiryDetails(action) {
    try {
        const inquiryDetails = yield axios.get(`/api/forms/inquiries/allUserInfo/${action.payload}`);
        yield put({ type: 'SET_INQUIRY_DETAILS', payload: inquiryDetails.data});
        console.log(inquiryDetails);
    } catch (error) {
        console.log(`Error in fetchInquiryDetails: ${error}`);
        alert('Something went wrong!')
    }
}



function* inquiriesSaga() {
    yield takeEvery('FETCH_INQUIRIES', fetchInquiries);
    yield takeEvery('FETCH_INQUIRY_DETAILS', fetchInquiryDetails);
}

export default inquiriesSaga;