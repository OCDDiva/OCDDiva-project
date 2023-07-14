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
        const inquiryDetails = yield axios.get(`/api/inquirydetails/inquirydetails/allUserInfo/${action.payload}`);
        yield put({ type: 'SET_INQUIRY_DETAILS', payload: inquiryDetails.data});
        console.log(inquiryDetails);
    } catch (error) {
        console.log(`Error in fetchInquiryDetails: ${error}`);
        alert('Something went wrong!')
    }
}

function* fetchPriority() {
    try {
        const priorities = yield axios.get('/api/priority/priorities');
        yield put({ type: 'SET_PRIORITY', payload: priorities.data});
        console.log(priorities)
    } catch (error) {
        console.log(`Error in fetchPriority ${error}`)
        alert('Something went wrong!')
    }
}

function* editPriority(action) {
    try {
        yield axios.put(`/api/forms/inquiries/priority`, action.payload);
        console.log('Priority Level in Saga', action.payload)
    } catch (error) {
        console.log(error)
    }
}



function* inquiriesSaga() {
    yield takeEvery('FETCH_INQUIRIES', fetchInquiries);
    yield takeEvery('FETCH_INQUIRY_DETAILS', fetchInquiryDetails);
    yield takeEvery('EDIT_PRIORITY', editPriority);
    yield takeEvery('FETCH_PRIORITIES', fetchPriority);
}

export default inquiriesSaga;