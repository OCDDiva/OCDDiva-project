//Imports go here
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function Inquiries() {
    //Code goes here
    const dispatch = useDispatch();
    const history = useHistory();
    const inquiries = useSelector(store => store.fetchInquiries);
    // const { inquiriesId } = useParams();

    const navToInquiryDetails = (inquiry) => {
        history.push(`/inquirydetails/${inquiry.id}`);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_INQUIRIES'});
        // dispatch({ type: 'FETCH_INQUIRY_DETAILS' });
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
                    {/* CUSTOMER INFO AND SERVICES_ID */}
                    {inquiries.map(inquiry => {
                        return (
                            <div key={inquiry.id}>
                                <h1>{inquiry.firstName} {inquiry.lastName}</h1>
                                <h2>{JSON.stringify(inquiry.Cleaning)}</h2>
                                <h3>{inquiry.service_on}</h3>
                                <h3>{inquiry.completion_status}</h3>
                                <h3>{inquiry.notes}</h3>
                                <h3>{inquiry.cleaning}</h3>
                                <p>{JSON.stringify(inquiry.id)}</p>
                                <button onClick={(event) => navToInquiryDetails(inquiry)}>Details</button>
                            </div>
                        )
                    })}
                    
                </div>
            )}
        </main>


    )
} // End Inquiries()

export default Inquiries;