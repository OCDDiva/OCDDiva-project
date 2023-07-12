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

    console.log('User Info as Inquiry Object:', inquiries)

    const navToInquiryDetails = (inquiries) => {
        history.push(`/inquiries/${inquiries.id}`);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_INQUIRIES' });
    }, []);

    const dateConversion = (oldDate) => {
        const date = new Date(oldDate.date_received).toLocaleDateString('en-EN')
        return `${date}`
    }

    const completionConversion = (inquiries) => {
        if (inquiries.completion_status === 5) {
            return 'Complete'
        } else if (inquiries.completion_status === 4) {
            return 'In Progress'
        } else if (inquiries.completion_status === 3) {
            return 'Bid Rejected'
        } else if (inquiries.completion_status === 2) {
            return 'Bid Offered'
        } else if (inquiries.completion_status === 1) {
            return 'Pending'
        }
    }

    const serviceConversion = (inquiries) => {
        if (inquiries.cleaning.ServiceType === 'essential') {
            return 'Essential Clean'
        } else if (inquiries.cleaning.ServiceType === 'ultimate') {
            return 'Ultimate Clean'
        } else if (inquiries.moving.moving === true) {
            return 'Moving'
        } else if (inquiries.organize.Organizing === true) {
            return 'Organizing'
        } else if (inquiries.declutt.Declutter === true) {
            return 'Declutter'
        }
    }

    const phoneNumberFormatter = (inquiry) => {
        if (typeof (inquiry) !== 'string') inquiry = inquiry.toString()
        if (inquiry.length === 10) {
            return inquiry.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        } else {
            return 'Not a valid phone number'
        }
    }

    const addressFormat = (address) => {
        if (address.street2 !== null) {
            return  <div>
                    <h3>Address</h3>
                    <p>Street: {address.street1}</p>
                    <p>City: {address.city}</p>
                    <p>State: {address.state}</p>
                    <p>ZIP: {address.zip}</p>
                    </div>
        } else {
            return `Street: ${address.street1}
                    Street 2: ${address.street2}
                    City: ${address.city} | State: ${address.state}
                    ZIP: ${address.zip}`
        }
    }

    console.log('Inquiries List:', inquiries);

    //What displays
    // TODO DISPLAY ONLY THE CUSTOMER NAME, THE SERVICES REQUESTED, DATE RECEIVED, COMPLETEION STATUS, NOTES, DETAILS BUTTON
    return (
        <main>
            <center>
                {inquiries.length === 0 ? (
                    <div>
                        <p>No new requests!</p>
                    </div>
                ) : (
                    <div key={inquiries.id}>
                        {inquiries.map(inquiry => {
                            return (
                                <div>
                                    <h1>{inquiry.firstName} {inquiry.lastName}</h1>
                                    <h5>Phone Number: {phoneNumberFormatter(inquiry.phone_number)}</h5>
                                    <h5>Email: {inquiry.email}</h5>
                                    <h5>{addressFormat(inquiry)}</h5>
                                    <h3>{dateConversion(inquiry)}</h3>
                                    <h3>{completionConversion(inquiry)}</h3>
                                    <p>{inquiry.comments}</p>
                                    <button className="btn" onClick={(event) => navToInquiryDetails(inquiry)}>Details</button>
                                </div>
                            )
                        })}
                    </div>
                    // <div key={inquiries.id}>
                    //     {/* CUSTOMER INFO AND SERVICES_ID */}
                    //     <div>
                    //         <h1>{inquiries.contact.firstName} {inquiries.contact.lastName}</h1>
                    //         <h2>{serviceConversion(inquiries)}</h2>
                    //         <h3>{dateConversion(inquiries)}</h3>
                    //         <h3>{completionConversion(inquiries)}</h3>
                    //         <h3>{inquiries.customer.notes}</h3>
                    //         <button onClick={() => navToInquiryDetails(inquiries)}>Details</button>
                    //     </div>
                    // </div>
                )}
            </center>
        </main>


    )
} // End Inquiries()

export default Inquiries;