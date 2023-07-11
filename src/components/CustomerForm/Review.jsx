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

    const [comments, setComments] = useState('');

    const goBack = () => { history.goBack() };

    const submitInquiry = () => {
        dispatch({ type: 'SUBMIT_INQUIRY' })
        history.push('/success');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_INFO' });
    }, []);

    console.log('show me the info!!!!!!', allUserInfo);

    //What displays
    return (
        <div className="reviewPage" >
            <ProgressBar currentStep={5} />
            <center>
                <h2 className="h2Headers">Review Your Information:</h2>
                <br />
                <div className="customerReview" >
                    <h3>Customer Information</h3>
                    Name: {allUserInfo.contact[0].firstName}{'    '}
                    {allUserInfo.contact[0].lastName}
                    <br />
                    Address: {allUserInfo.contact[0].street1}
                    <br />
                    {allUserInfo.contact[0].street2}
                    <br />
                    City: {allUserInfo.contact[0].city}
                    <br />
                    State: {allUserInfo.contact[0].state}
                    <br />
                    Zip: {allUserInfo.contact[0].zip}
                    <br />
                    Phone Number: {allUserInfo.contact[0].phone_number}
                    <br />
                    Email: {allUserInfo.contact[0].email}
                    <br />
                    <h3>Cleaning Questions</h3>
                    Requested Cleaning Service: {allUserInfo.cleaning[0].ServiceType}
                    <br />
                    Number of Bedrooms: {allUserInfo.cleaning[0].Bedrooms}
                    <br />
                    Number of Bathrooms: {allUserInfo.cleaning[0].Bathrooms}
                    <br />
                    Number of Additional Rooms: {allUserInfo.cleaning[0].AdditionalRooms}
                    <br />
                    {/* TODO add in conditional rendering for this to show if it only has results */}
                    Any Pets: {allUserInfo.cleaning[0].HasPets}
                    <br />
                    Hazardous Conditions: {allUserInfo.cleaning[0].HazardousConditions}
                    <br />
                    <h3>Moving Questions</h3>
                    Moving To: {allUserInfo.moving[0].moving_to}
                    <br />
                    Moving From: {allUserInfo.moving[0].moving_from}
                    <br />
                    Large Items: {allUserInfo.moving[0].large_items}
                    <br />
                    <h3>Organizing Questions</h3>
                    Bedrooms: {allUserInfo.organize[0].Bedrooms}
                    <br />
                    Bathrooms: {allUserInfo.organize[0].Bathrooms}
                    <br />
                    Additional Rooms: {allUserInfo.organize[0].AdditionalRooms}
                    <br />
                    Donations: {allUserInfo.organize[0].Donations}
                    <br />
                    <h3>Decluttering Questions</h3>
                    Bedrooms: {allUserInfo.declutt[0].Bedrooms}
                    <br />
                    Bathrooms: {allUserInfo.declutt[0].Bathrooms}
                    <br />
                    Additional Rooms: {allUserInfo.declutt[0].AdditionalRooms}
                    <br />
                    Donations: {allUserInfo.declutt[0].Donations}
                </div>
                <br />
                <br />
                <div className="picsAndComments">
                    <h3>Upload some photos of your space!</h3>
                    <input type="photo" />
                    <br />
                    <br />
                    <h4>Leave us any additional comments!</h4>
                    <input type="text" value={comments} onChange={(event) => { setComments(event.target.value) }} />
                </div>
                <br />
                <br />
                <button className="btn" onClick={goBack}> Back </button>
                <button className="btn" onClick={submitInquiry}>Submit</button>
            </center>

        </div>
    )
} // End Review()

export default Review;