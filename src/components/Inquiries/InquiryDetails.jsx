//Imports go here
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function InquiryDetails() {
    //Code goes here
    const dispatch = useDispatch();
    const history = useHistory();
    const inquiryDetails = useSelector(store => store.inquiryDetails)
    const { inquiriesId } = useParams();

    useEffect(() => {
        dispatch({ type: 'FETCH_INQUIRY_DETAILS', payload: inquiriesId });
    }, [inquiriesId]);

    const [note, setNote] = useState('');

    console.log(inquiriesId);

    const returnToInquiries = (event) => {
        history.push('/inquiries')
    }

    const changeNote = (e) => {
        e.preventDefault();
        if (note.length > 0) {
            dispatch({ type: 'EDIT_NOTE', payload: { note, inquiriesId, }, history});
        } else {
            dispatch({ type: 'ADD_NOTE', payload: { note }, history})
        }
    }

    const noteButton = () => {
        if (note.length > 0) {
            return 'Edit Note'
        } else {
            return 'Add Note'
        }
    }

    //What displays
    // TODO DISPLAY ONLY THE CUSTOMER NAME, THE SERVICES REQUESTED, DATE RECEIVED, COMPLETEION STATUS, NOTES, DETAILS BUTTON
    return (
        <main>
                <div>
                    <h1>{inquiryDetails.firstName} {inquiryDetails.lastName}</h1>
                    {/* gonna work on a function that only displays specific services but not sure I will get to it tonight */}
                    <h2> 
                        Essential Clean: {JSON.stringify(inquiryDetails.EssentialClean)}, 
                        Ultimate Clean: {JSON.stringify(inquiryDetails.UltimateClean)},
                        Moving: {JSON.stringify(inquiryDetails.Moving)},
                        Organizing: {JSON.stringify(inquiryDetails.Organizing)},
                        Decluttering: {JSON.stringify(inquiryDetails.Declutter)} 
                    </h2>
                    <h3>Date Received: do we need this for incoming inquiries? or only completed customers?{inquiryDetails.service_on} </h3>
                    <h3> {inquiryDetails.completion_status}</h3>
                    {/* TODO I know the priority is bugged, will work on a fix */}
                    <h4> {inquiryDetails.priority}</h4>
                    <h2>NOTES: (insert notes here)
                    </h2>
                    <button onClick={changeNote}>{noteButton()}</button>
                    <br />
                    <h3>Customer Responses to Survey:</h3>
                    <h5>Cleaning & Basic Questions:</h5>
                    <p>Number of Bedrooms: {inquiryDetails.Bedrooms}</p>
                    <p>Number of Bathrooms: {inquiryDetails.Bathrooms}</p>
                    <p>Number of Additional Rooms: {inquiryDetails.AdditionalRooms}</p>
                    <p>Number of Doors & Windows: {inquiryDetails.DoorsWindows}</p>
                    <p>Has Pets? {JSON.stringify(inquiryDetails.HasPets)}</p>
                    <p>Hazardous Conditions? {inquiryDetails.HazardousConditions}</p>
                    <h5>Moving Questions:</h5>
                    {/* These column names in the database need to have the spaces removed for this to work */}
                    <p>New Address: {inquiryDetails.MovingTo}</p>
                    <p>Old Address: {inquiryDetails.MovingFrom}</p>
                    <p>Any Large Items? {inquiryDetails.LargeItems}</p>
                    <h5>Organizing/Decluttering Questions:</h5>
                    <p>Wanting to Donate? {JSON.stringify(inquiryDetails.Donation)}</p>
                    <button onClick={returnToInquiries}>Inquiries List</button>
                </div>
        </main>


    )
} // End Inquiries()
    
    export default InquiryDetails;