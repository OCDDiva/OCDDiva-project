import { put, take, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Inquiries from '../../components/Inquiries/Inquiries';

function* fetchInquiries() {
    try {
        const inquiries = yield axios.get('/api/forms/inquiries/allUserInfo');
        yield put({ type: 'SET_INQUIRIES', payload: inquiries.data });
        console.log(inquiries);
    } catch (error) {
        console.log(`Error in fetchInquiries: ${error}`);
        alert('Something went wrong!')
    }
}

function* fetchInquiryDetails(action) {
    try {
        const inquiryDetails = yield axios.get(`/api/inquirydetails/inquirydetails/allUserInfo/${action.payload}`);
        yield put({ type: 'SET_INQUIRY_DETAILS', payload: inquiryDetails.data });
        console.log(inquiryDetails);
    } catch (error) {
        console.log(`Error in fetchInquiryDetails: ${error}`);
        alert('Something went wrong!')
    }
}

function* fetchPriority() {
    try {
        const priorities = yield axios.get('/api/priority/priorities');
        yield put({ type: 'SET_PRIORITY', payload: priorities.data });
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

function* fetchCompletionStatus() {
    try {
        const statuses = yield axios.get('/api/complete/completion')
        yield put({ type: 'SET_COMPLETION_STATUS', payload: statuses.data });
        console.log('Checking Statuses', statuses);
    } catch (error) {
        console.log(`Error in fetchCompletionStatus ${error}`);
        alert('Something went wrong!');
    }
}

function* editStatus(action) {
    try {
        yield axios.put('/api/forms/inquiries/completion', action.payload)
        console.log('Updating completion status', action.payload)
    } catch (error) {
        console.log(`Error in editStatus ${error}`);
        alert('Something went wrong!');
    }
}

function* fetchNotes() {
    try {
        const notes = yield axios.get('/api/notes/')
        yield put({ type: 'SET_NOTES', payload: notes.data})
        console.log('notes saga', notes)
    } catch (error) {
        console.log('Error in fetchNotes', error)
        alert('something went wrong')
    }
}

function* editNotes(action) {
    try {
        yield axios.put('/api/forms/notes', action.payload)
        console.log('Updated Notes:', action.payload)
    } catch (error) {
        console.log(`Error in Edit Notes: ${error}`)
        alert('Something Went Wrong!')
    }
}



function* inquiriesSaga() {
    yield takeEvery('FETCH_INQUIRIES', fetchInquiries);
    yield takeEvery('FETCH_INQUIRY_DETAILS', fetchInquiryDetails);
    yield takeEvery('EDIT_PRIORITY', editPriority);
    yield takeEvery('FETCH_PRIORITIES', fetchPriority);
    yield takeEvery('FETCH_STATUS', fetchCompletionStatus);
    yield takeEvery('EDIT_STATUS', editStatus);
    yield takeEvery('FETCH_NOTES', fetchNotes);
    yield takeEvery('EDIT_NOTE', editNotes);
}

export default inquiriesSaga;