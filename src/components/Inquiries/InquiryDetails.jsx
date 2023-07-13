//Imports go here
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function InquiryDetails() {
    //Code goes here
    const dispatch = useDispatch();
    const history = useHistory();
    const inquiryDetails = useSelector(store => store.inquiryDetails);
    const { inquiriesId } = useParams();

    console.log('InquiryDetails Object:', inquiryDetails)

    useEffect(() => {
        console.log('UseEffect Details Running:')
        dispatch({ type: 'FETCH_INQUIRY_DETAILS', payload: inquiriesId });
    }, [inquiriesId]);

    console.log('InquiriesID:', inquiriesId);


    const returnToInquiries = (event) => {
        history.push('/inquiries')
    }

    // TODO see what miguel made for the dispatch for adding notes and edit accordingly
    const changeNote = (e) => {
        e.preventDefault();
        if (inquiryDetails.customerQueryResult.rows[0].notes.length > 0) {
            dispatch({ type: 'EDIT_NOTE', payload: { inquiryDetails, inquiriesId, }, history });
        } else {
            dispatch({ type: 'ADD_NOTE', payload: { inquiryDetails }, history })
        }
    }

    const noteButton = () => {
        if (inquiryDetails.customer.notes > 0) {
            return 'Edit Note'
        } else {
            return 'Add Note'
        }
    }

    const serviceConversion = (inquiries) => {
        if (inquiries.cleaning[0].ServiceType === 'Essential') {
            return 'Essential Clean'
        } else if (inquiries.cleaning[0].ServiceType === 'Ultimate') {
            return 'Ultimate Clean'
        } else if (inquiries.moving[0].moving === true) {
            return 'Moving'
        } else if (inquiries.organize[0].Organizing === true) {
            return 'Organizing'
        } else if (inquiries.declutt[0].Declutter === true) {
            return 'Declutter'
        }
    }

    const completionConversion = (inquiries) => {
        if (inquiries.contact[0].completion_status === 5) {
            return 'Complete'
        } else if (inquiries.contact[0].completion_status === 4) {
            return 'In Progress'
        } else if (inquiries.contact[0].completion_status === 3) {
            return 'Bid Rejected'
        } else if (inquiries.contact[0].completion_status === 2) {
            return 'Bid Offered'
        } else if (inquiries.contact[0].completion_status === 1) {
            return 'Pending'
        }
    }

    const priorityConversion = (inquiryDetails) => {
        if (inquiryDetails.contact[0].priority === 1) {
            return 'High'
        } else if (inquiryDetails.contact[0].priority === 2) {
            return 'Medium'
        } else if (inquiryDetails.contact[0].priority === 3) {
            return 'Low'
        }
    }

    const petConversion = (inquiryDetails) => {
        if (inquiryDetails.cleaning[0].HasPets === true) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

    const donationConversion = (inquiryDetails) => {
        if (inquiryDetails.declutt[0].Donation === true || inquiryDetails.organize.Donation === true) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

    const dateConversion = (oldDate) => {
        const date = new Date(oldDate.contact[0].date_received).toLocaleDateString('en-EN')
        return `${date}`
    }

    const cleaningDisplay = (inquiryDetails) => {
        if (inquiryDetails.cleaning[0].Cleaning === true) {
            return <div>
                <h5>Cleaning Questions:</h5>
                <p>Number of Doors & Windows: {inquiryDetails.cleaning[0].DoorsWindows}</p>
                <p>Has Pets? {petConversion(inquiryDetails)}</p>
                <p>Hazardous Conditions? {inquiryDetails.cleaning[0].HazardousConditions}</p>
            </div>
        } else {
            return ''
        }
    }

    const movingDisplay = (inquiryDetails) => {
        if (inquiryDetails.Moving === true) {
            return <div>
                <h5>Moving Questions:</h5>
                <p>New Address: {inquiryDetails.moving_to}</p>
                <p>Old Address: {inquiryDetails.moving_from}</p>
                <p>Any Large Items? {inquiryDetails.large_items}</p>
            </div>
        } else {
            return ''
        }
    }

    const organizeDeclutterDisplay = (inquiryDetails) => {
        if (inquiryDetails.organize[0].Organizing === true || inquiryDetails.declutt[0].Declutter === true) {
            return <div>
                <h5>Organizing/Decluttering Questions:</h5>
                <p>Wanting to Donate? {donationConversion(inquiryDetails)}</p>
            </div>
        } else {
            return ''
        }
    }

    console.log(inquiryDetails)
    //What displays
    return (
        <main>
            <div key={inquiriesId}>
                <p>Inquiries ID: {inquiriesId}</p>
                {
                    inquiryDetails
                    && (
                        <>
                            <h1>{inquiryDetails.contact[0].firstName} {inquiryDetails.contact[0].lastName}</h1>
                            <h2>
                                {serviceConversion(inquiryDetails)}
                            </h2>
                            <h3>Date Received: {dateConversion(inquiryDetails)} </h3>
                            <h3> {completionConversion(inquiryDetails)}</h3>
                            <h4> {priorityConversion(inquiryDetails)}</h4>
                            <h2>NOTES:</h2>
                            <p>{inquiryDetails.customer[0].notes}</p>
                            <button onClick={changeNote}>{noteButton(inquiryDetails)}</button>
                            <br />
                            <h3>Customer Responses to Survey:</h3>
                            <h5>Basic Questions:</h5>
                            <p>Number of Bedrooms: {inquiryDetails.cleaning[0].Bedrooms}</p>
                            <p>Number of Bathrooms: {inquiryDetails.cleaning[0].Bathrooms}</p>
                            <p>Number of Additional Rooms: {inquiryDetails.cleaning[0].AdditionalRooms}</p>
                            <p>{cleaningDisplay(inquiryDetails)}</p>
                            <p>{movingDisplay(inquiryDetails)}</p>
                            <p>{organizeDeclutterDisplay(inquiryDetails)}</p>
                            <button onClick={returnToInquiries}>Inquiries List</button>
                        </>
                    )
                }
            </div>
        </main>


    )
} // End Inquiries()

{/* <div>
                <h1>{inquiryDetails.contact[0].firstName} {inquiryDetails.contact[0].lastName}</h1>
                <h2>
                    {serviceConversion(inquiryDetails)}
                </h2>
                <h3>Date Received: {dateConversion(inquiryDetails)} </h3>
                <h3> {completionConversion(inquiryDetails)}</h3>
                <h4> {priorityConversion(inquiryDetails)}</h4>
                <h2>NOTES:</h2>
                <p>{inquiryDetails.customer.notes}</p>
                <button onClick={changeNote}>{noteButton(inquiryDetails)}</button>
                <br />
                <h3>Customer Responses to Survey:</h3>
                <h5>Basic Questions:</h5>
                <p>Number of Bedrooms: {inquiryDetails.cleaning[0].Bedrooms}</p>
                <p>Number of Bathrooms: {inquiryDetails.cleaning[0].Bathrooms}</p>
                <p>Number of Additional Rooms: {inquiryDetails.cleaning[0].AdditionalRooms}</p>
                <p>{cleaningDisplay(inquiryDetails)}</p>
                <p>{movingDisplay(inquiryDetails)}</p>
                <p>{organizeDeclutterDisplay(inquiryDetails)}</p>
                <button onClick={returnToInquiries}>Inquiries List</button>
            </div> */}

export default InquiryDetails;