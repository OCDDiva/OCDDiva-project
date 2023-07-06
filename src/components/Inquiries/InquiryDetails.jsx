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

    console.log(inquiriesId);

    const returnToInquiries = (event) => {
        history.push('/inquiries')
    }

    const changeNote = (e) => {
        e.preventDefault();
        if (inquiryDetails.notes.length > 0) {
            dispatch({ type: 'EDIT_NOTE', payload: { notes, inquiriesId, }, history});
        } else {
            dispatch({ type: 'ADD_NOTE', payload: { notes }, history})
        }
    }

    const noteButton = () => {
        if (inquiryDetails.notes.length > 0) {
            return 'Edit Note'
        } else {
            return 'Add Note'
        }
    }

    const serviceConversion = (inquiryDetails) => {
        if (inquiryDetails.EssentialClean === true) {
            return 'Essential Clean'
        } else if (inquiryDetails.UltimateClean === true) {
            return 'Ultimate Clean'
        } else if (inquiryDetails.Moving === true) {
            return 'Moving'
        } else if (inquiryDetails.Organizing === true) {
            return 'Organizing'
        } else if (inquiryDetails.Declutter === true) {
            return 'Declutter'
        }
    }

    const priorityConversion = (inquiryDetails) => {
        if (inquiryDetails.priority === 1) {
            return 'High'
        } else if (inquiryDetails.priority === 2) {
            return 'Medium'
        } else if (inquiryDetails.priority === 3) {
            return 'Low'
        }
    }

    const petConversion = (inquiryDetails) => {
        if (inquiryDetails.HasPets === true) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

    const donationConversion = (inquiryDetails) => {
        if (inquiryDetails.Donation === true) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

    const dateConversion = (oldDate) => {
        const date = new Date(oldDate).toLocaleDateString('en-EN')
        return `${date}`
    }

    //What displays
    // TODO DISPLAY ONLY THE CUSTOMER NAME, THE SERVICES REQUESTED, DATE RECEIVED, COMPLETEION STATUS, NOTES, DETAILS BUTTON
    return (
        <main>
                <div>
                    <h1>{inquiryDetails.firstName} {inquiryDetails.lastName}</h1>
                    {/* gonna work on a function that only displays specific services but not sure I will get to it tonight */}
                    <h2> 
                        {serviceConversion(inquiryDetails)} 
                    </h2>
                    {/* Do we need this on the inquiries page if they haven't receive service yet? */}
                    <h3>Date Received: {dateConversion(inquiryDetails.service_on)} </h3>
                    <h3> {inquiryDetails.completion_status}</h3>
                    {/* TODO I know the priority is bugged, will work on a fix */}
                    <h4> {priorityConversion(inquiryDetails)}</h4>
                    <h2>NOTES: (insert notes here)</h2>
                    <p>{inquiryDetails.notes}</p>
                    <button onClick={changeNote}>{noteButton()}</button>
                    <br />
                    <h3>Customer Responses to Survey:</h3>
                    <h5>Cleaning & Basic Questions:</h5>
                    <p>Number of Bedrooms: {inquiryDetails.Bedrooms}</p>
                    <p>Number of Bathrooms: {inquiryDetails.Bathrooms}</p>
                    <p>Number of Additional Rooms: {inquiryDetails.AdditionalRooms}</p>
                    <p>Number of Doors & Windows: {inquiryDetails.DoorsWindows}</p>
                    <p>Has Pets? {petConversion(inquiryDetails)}</p>
                    <p>Hazardous Conditions? {inquiryDetails.HazardousConditions}</p>
                    <h5>Moving Questions:</h5>
                    {/* These column names in the database need to have the spaces removed for this to work */}
                    <p>New Address: {inquiryDetails.moving_to}</p>
                    <p>Old Address: {inquiryDetails.moving_from}</p>
                    <p>Any Large Items? {inquiryDetails.large_items}</p>
                    <h5>Organizing/Decluttering Questions:</h5>
                    <p>Wanting to Donate? {donationConversion(inquiryDetails)}</p>
                    <button onClick={returnToInquiries}>Inquiries List</button>
                </div>
        </main>


    )
} // End Inquiries()
    
    export default InquiryDetails;