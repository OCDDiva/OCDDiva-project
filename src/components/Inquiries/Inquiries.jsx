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

    const navToInquiryDetails = (inquiries) => {
        history.push(`/inquiries/inquirydetails/${inquiries.queryResult.rows[0].id}`);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_INQUIRIES'});
    }, []);

    const dateConversion = (oldDate) => {
        const date = new Date(oldDate.queryResult.rows[0].date_received).toLocaleDateString('en-EN')
        return `${date}`
    }

    const completionConversion = (inquiries) => {
        if (inquiries.queryResult.rows[0].completion_status === 5) {
            return 'Complete'
        } else if (inquiries.queryResult.rows[0].completion_status === 4) {
            return 'In Progress'
        } else if (inquiries.queryResult.rows[0].completion_status === 3) {
            return 'Bid Rejected'
        } else if (inquiries.queryResult.rows[0].completion_status === 2) {
            return 'Bid Offered'
        } else if (inquiries.queryResult.rows[0].completion_status === 1) {
            return 'Pending'
        }
    }

    const serviceConversion = (inquiries) => {
        if (inquiries.cleaningResult.rows[0].ServiceType === 'Essential') {
            return 'Essential Clean'
        } else if (inquiries.cleaningResult.rows[0].ServiceType === 'Ultimate') {
            return 'Ultimate Clean'
        } else if (inquiries.movingResult.rows[0].moving === true) {
            return 'Moving'
        } else if (inquiries.orgResult.rows[0].Organizing === true) {
            return 'Organizing'
        } else if (inquiries.declutt.Result.rows[0].Declutter === true) {
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
                <div key={inquiries.id}>
                    {/* CUSTOMER INFO AND SERVICES_ID */}
                    <div>
                        <h1>{inquiries.queryResult.rows[0].firstName} {inquiries.queryResult.rows[0].lastName}</h1>
                        <h2>{serviceConversion(inquiries)}</h2>
                        <h3>{dateConversion(inquiries)}</h3>
                        <h3>{completionConversion(inquiries)}</h3>
                        <h3>{inquiries.customerQueryResult.rows[0].notes}</h3>
                        <button onClick={() => navToInquiryDetails(inquiries)}>Details</button>
                    </div>
                </div>
            )}
        </main>


    )
} // End Inquiries()

export default Inquiries;