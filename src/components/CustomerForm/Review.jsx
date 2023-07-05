//Imports go here
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function Review() {
    //Code goes here
    const history = useHistory();
    const dispatch = useDispatch();

    const goBack = () => { history.goBack() };

    const submitInquiry = () => {
        dispatch({ type: 'SUBMIT_INQUIRY' })
        history.push('/success');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_CUSTOMERS' });
        // dispatch({ type: 'GET_HISTORY' });
    }, []);

    const customerDetails = useSelector(store => store.customerReducer)

    console.log('show me the customers!!!!!', customerDetails);

    //What displays
    return (
        <div className="customerReview">
            <h2 className="h2Headers">Review Your Information:</h2>
            <h3>Customer Information</h3>
            <p>{customerDetails.firstName}</p>
            <p>{customerDetails.lastName}</p>
            <p>{customerDetails.street1}</p>
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