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

    Object.values(allUserInfo);

    console.log('show me the info!!!!!!', allUserInfo);

    //What displays
    return (
        <div className="customerReview">
            <ProgressBar currentStep={5} />
            <center>
                <h2 className="h2Headers">Review Your Information:</h2>
                <h3>Customer Information</h3>
                Name: {allUserInfo.queryResult.rows[0].firstName}{'   '}
                {allUserInfo.queryResult.rows[0].lastName}{'   '}
                <br />
                Address: {allUserInfo.queryResult.rows[0].street1}
                <br />
                City: {allUserInfo.queryResult.rows[0].city}
                <br />
                State: {allUserInfo.queryResult.rows[0].state}
                <br />
                Zip: {allUserInfo.queryResult.rows[0].zip}
                <br />
                Phone Number: {allUserInfo.queryResult.rows[0].phone_number}
                <br />
                Email: {allUserInfo.queryResult.rows[0].email}
                <br />
                <h3>Cleaning Questions</h3>
                Requested Cleaning Service: {allUserInfo.cleaningResult.rows[0].ServiceType}
                <br />
                Number of Bedrooms: {allUserInfo.cleaningResult.rows[0].Bedrooms}
                <br />
                Number of Bathrooms: {allUserInfo.cleaningResult.rows[0].Bathrooms}
                <br />
                Number of Additional Rooms: {allUserInfo.cleaningResult.rows[0].AdditionalRooms}
                <br />
                {/* TODO add in conditional rendering for this to show if it only has results */}
                Any Pets: {allUserInfo.cleaningResult.rows[0].HasPets}
                <br />
                Hazardous Conditions: {allUserInfo.cleaningResult.rows[0].HazardousConditions}
                <br />
                <h3>Moving Questions</h3>
                Moving To: {allUserInfo.movingResult.rows[0].moving_to}
                <br />
                Moving From: {allUserInfo.movingResult.rows[0].moving_from}
                <br />
                Large Items: {allUserInfo.movingResult.rows[0].large_items}
                <br />
                <h3>Organizing Questions</h3>
                Bedrooms: {allUserInfo.orgResult.rows[0].Bedrooms}
                <br />
                Bathrooms: {allUserInfo.orgResult.rows[0].Bathrooms}
                <br />
                Additional Rooms: {allUserInfo.orgResult.rows[0].AdditionalRooms}
                <br />
                Donations: {allUserInfo.orgResult.rows[0].Donations}
                <br />
                <h3>Decluttering Questions</h3>
                Declutter: {allUserInfo.decluttResult.rows[0].Declutter}
                <br />
                Bedrooms: {allUserInfo.decluttResult.rows[0].Bedrooms}
                <br />
                Bathrooms: {allUserInfo.decluttResult.rows[0].Bathrooms}
                <br />
                Additional Rooms: {allUserInfo.decluttResult.rows[0].AdditionalRooms}
                <br />
                Donations: {allUserInfo.decluttResult.rows[0].Donations}
                <br />
                <h3>Upload some photos of your space!</h3>
                <input type="photo" />
                <br />
                <br />
                <button className="btn" onClick={goBack}> Back </button>
                <button className="btn" onClick={submitInquiry}>Submit</button>
            </center>

        </div>
    )
} // End Review()

export default Review;