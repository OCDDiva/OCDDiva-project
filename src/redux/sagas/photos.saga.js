import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* setPhotosToUpload(action) {
    try {
        const { photoUpload, fileName, fileType, inquiry_id } = action.payload;
        console.log('Checking the payload file:', photoUpload)
        console.log('Checking the inquiry id:', inquiry_id)
        // const formData = new FormData();
        // formData.append('file', selectedFile);
        // formData.append('inquiry_id', inquiryId);
        let postUrl = `/api/photos/upload?imageName=${fileName}&imageType=${fileType}&inquiryId=${inquiry_id}`;
        yield axios.post(postUrl, photoUpload)
        console.log('Updating Photos');
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