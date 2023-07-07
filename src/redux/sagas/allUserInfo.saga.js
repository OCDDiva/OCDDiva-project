import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* fetchAllUserInfo() {
    try {
        const allUserInfo = yield axios.get('/api/forms/allUserInfo');
        yield put({ type: 'SET_ALL_USER_INFO', payload: allUserInfo.data });
        console.log('SHOW ME THE DATA', allUserInfo);
    } catch (error) {
        console.log(`Error in fetchAllUserInfo, ${error}`);
        alert('Something went wrong!');
    }
}


function* allUserInfoSaga() {
    yield takeEvery('FETCH_ALL_INFO', fetchAllUserInfo)
}

export default allUserInfoSaga;