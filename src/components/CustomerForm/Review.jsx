//Imports go here
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function Review() {
    //Code goes here
    const history = useHistory();
    const dispatch = useDispatch();

    const goBack = () => { history.goBack() };


    //What displays
    return (
        <div className="customerReview">
            <h2 className="h2Headers">Review</h2>
            <button className="btn" onClick={goBack}> Back </button>
        </div>
        

    )
} // End Review()

export default Review;