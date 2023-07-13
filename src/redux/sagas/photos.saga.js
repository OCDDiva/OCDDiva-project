import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* setPhotosToUpload(action) {
    try {
        yield axios.put('/api/photos/photos', action.payload)
        console.log('Updating Photos', action.payload);
        yield put({ type: 'SET_PHOTOS' });
    } catch (error) {
        console.log(`Error in updating photos to upload ${error}`);
        alert('Something went wrong!');
    }
}

function* photosSaga() {
    yield takeEvery('UPLOAD_PHOTOS', setPhotosToUpload)
}

export default photosSaga;