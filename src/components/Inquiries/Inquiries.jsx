//Imports go here
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function Inquiries() {
    //Code goes here
    const dispatch = useDispatch();
    const history = useHistory();
    const inquiries = useSelector(store => store.inquiriesDetails)
    const { inquiriesId } = useParams();

    const navToInquiryDetails = (inquiryToDisplay) => {
        history.push(`/inquiries/${inquiryToDisplay.id}`);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_INQUIRY_DETAILS' });
    }, [inquiriesId]);

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
                    {/* CUSTOMER INFO AND SERVICES_ID */}
                    <button onClick={navToInquiryDetails}>Details</button>
                </div>
            )}
        </main>


    )
} // End Inquiries()

export default Inquiries;