//Imports go here
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function InquiryDetails() {
    //Code goes here
    const dispatch = useDispatch();
    const history = useHistory();
    const inquiries = useSelector(store => store.inquiriesList)
    const { inquiriesId } = useParams();

    const navToInquiryDetails = (event) => {
        history.push('/inquiries/:id');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_INQUIRIES' });
    }, []);

    //What displays
    // TODO DISPLAY ONLY THE CUSTOMER NAME, THE SERVICES REQUESTED, DATE RECEIVED, COMPLETEION STATUS, NOTES, DETAILS BUTTON
    return (
        <main>
            {inquiries.length === 0 ? (
                <div>
                    <p>No new requests!</p>
                </div>
            ) : (
                <div>
                    {inquiries.map(inquiry => {
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
                    })}
                </div>
            )}
        </main>


    )
} // End Inquiries()
    
    export default InquiryDetails;