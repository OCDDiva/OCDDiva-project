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
        history.push(`/inquirydetails/${inquiry.user_id}`);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_INQUIRIES'});
        // dispatch({ type: 'FETCH_INQUIRY_DETAILS' });
    }, []);

    const dateConversion = (oldDate) => {
        const date = new Date(oldDate).toLocaleDateString('en-EN')
        return `${date}`
    }

    const serviceConversion = (inquiry) => {
        if (inquiry.EssentialClean === true) {
            return 'Essential Clean'
        } else if (inquiry.UltimateClean === true) {
            return 'Ultimate Clean'
        } else if (inquiry.Moving === true) {
            return 'Moving'
        } else if (inquiry.Organizing === true) {
            return 'Organizing'
        } else if (inquiry.Declutter === true) {
            return 'Declutter'
        }
    }

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
                                <h2>{serviceConversion(inquiry)}</h2>
                                {/* I know this should be a different date */}
                                <h3>{dateConversion(inquiry.service_on)}</h3>
                                <h3>{inquiry.completion_status}</h3>
                                {/* I understand notes is not working rn */}
                                <h3>{inquiry.notes}</h3>
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