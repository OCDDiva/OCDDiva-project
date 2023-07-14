import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* setPhotosToUpload(action) {
    try {
        const selectedFile= action.payload.photosToUpload
        const inquiryId= action.payload.inquiry_id
        const fileName = encodeURIComponent(selectedFile.name);
        const formData = new FormData();
        formData.append('image', selectedFile);
        yield axios.post(`/api/photos/photos?name=${fileName}&inquiryId=${inquiryId}`, action.payload)
        console.log('Updating Photos', action.payload);
        yield put({ type: 'SET_PHOTOS' });
    } catch (error) {
        console.log(`Error in posting photos to upload ${error}`);
        alert('Something went wrong!');
    }
}

function* photosSaga() {
    yield takeEvery('UPLOAD_PHOTOS', setPhotosToUpload)
}

export default photosSaga;