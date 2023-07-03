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

    //What displays
    // TODO DISPLAY ONLY THE CUSTOMER NAME, THE SERVICES REQUESTED, DATE RECEIVED, COMPLETEION STATUS, NOTES, DETAILS BUTTON
    return (
        <main>
                <div>
                    {/* {inquiryDetails.map(inquiry => {
                        return (
                            <div key={inquiry.id}>
                                <h1>{inquiry.services_id}</h1>
                                <h2>{inquiry.date_received}</h2>
                                <h3>{inquiry.declutting}</h3>
                                <h3>{inquiry.moving}</h3>
                                <h3>{inquiry.organizing}</h3>
                                <h3>{inquiry.cleaning}</h3>

                            </div>
                        )
                    })} */}
                    <h1>{inquiryDetails.firstName}</h1>
                    <button onClick={returnToInquiries}>Inquiries List</button>
                </div>
        </main>


    )
} // End Inquiries()
    
    export default InquiryDetails;