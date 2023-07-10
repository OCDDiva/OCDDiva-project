//Imports go here
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';


function Review() {
    //Code goes here
    const history = useHistory();
    const dispatch = useDispatch();
    const allUserInfo = useSelector(store => store.allUserInfo);


    const goBack = () => { history.goBack() };

    const submitInquiry = () => {
        dispatch({ type: 'SUBMIT_INQUIRY' })
        history.push('/success');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_INFO' });
        // dispatch({ type: 'FETCH_INQUIRY_DETAILS' });
    }, []);

    
    console.log('show me the info!!!!!!', allUserInfo.cleaningResult);

    //What displays
    return (
        <div className="customerReview">
            <ProgressBar currentStep={5} />
            <h2 className="h2Headers">Review Your Information:</h2>
            <h3>Customer Information</h3>
            {/* {
                allUserInfo.map((user) =>
                    <div key={user.id}>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                )
            } */}

            <h3>Cleaning Questions</h3>
            <h3>Moving Questions</h3>
            <h3>Organizing Questions</h3>
            <h3>Decluttering Questions</h3>
            <input type="photo" />
            <br />
            <br />
            <button className="btn" onClick={goBack}> Back </button>
            <button className="btn" onClick={submitInquiry}>Submit</button>
        </div>
    )
} // End Review()

export default Review;