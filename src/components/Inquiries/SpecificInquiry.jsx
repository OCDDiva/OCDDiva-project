import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function SpecificInquiry() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { inquiriesId } = useParams();
    const inquiries = useSelector(store => store.fetchInquiries);
    const inquiryDetails = useSelector(store => store.inquiryDetails);
   

    useEffect(() => {
        dispatch({type: 'FETCH_INQUIRIES'});
    }, [inquiriesId]);

    useEffect(() => {
        console.log('useEffect Details Running:')
        dispatch({ type: 'FETCH_INQUIRY_DETAILS', payload: inquiriesId })
    }, [inquiriesId]);

    const returnToInquiries = (event) => {
        history.push('/inquiries')
    }

    console.log('InquiryDetails:', inquiryDetails)

    // TODO SERVICE CONVERSIONS HERE

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
            return <div>
                <h3>Address</h3>
                <p>Street: {address.street1}</p>
                <p>Street 2: {address.street2}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>ZIP: {address.zip}</p>
            </div>
        } else {
            return <div>
                <h3>Address</h3>
                <p>Street: {address.street1}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>ZIP: {address.zip}</p>
            </div>
        }
    }

    const priorityConversion = (inquiry) => {
        if (inquiry.contact[0].priority === 1) {
            return 'High'
        } else if (inquiry.contact[0].priority === 2) {
            return 'Medium'
        } else if (inquiry.contact[0].priority === 3) {
            return 'Low'
        } else {
            return 'No Priority Set'
        }
    }

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

    const dateConversion = (oldDate) => {
        const date = new Date(oldDate.date_received).toLocaleDateString('en-EN')
        return `${date}`
    }

    const donationConversion = (inquiryDetails) => {
        if (inquiryDetails.declutt[0].Donation === true || inquiryDetails.organize.Donation === true) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

    const cleaningDisplay = (inquiryDetails) => {
        if (inquiryDetails.cleaning[0].Cleaning === true) {
            return <div>
                <h5>Cleaning Questions:</h5>
                <p>Number of Bedrooms: {inquiryDetails.cleaning[0].Bedrooms}</p>
                <p>Number of Bathrooms: {inquiryDetails.cleaning[0].Bathrooms}</p>
                <p>Number of Additional Rooms: {inquiryDetails.cleaning[0].AdditionalRooms}</p>
                <p>Number of Doors & Windows: {inquiryDetails.cleaning[0].DoorsWindows}</p>
                <p>Has Pets? {inquiryDetails.hasPets}</p>
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
                <p>Number of Bedrooms: {inquiryDetails.organize[0].Bedrooms}</p>
                <p>Number of Bathrooms: {inquiryDetails.organize[0].Bathrooms}</p>
                <p>Number of Additional Rooms: {inquiryDetails.organize[0].AdditionalRooms}</p>
                <p>Number of Bedrooms: {inquiryDetails.declutt[0].Bedrooms}</p>
                <p>Number of Bathrooms: {inquiryDetails.declutt[0].Bathrooms}</p>
                <p>Number of Additional Rooms: {inquiryDetails.declutt[0].AdditionalRooms}</p>
                <p>Wanting to Donate? {donationConversion(inquiryDetails)}</p>
            </div>
        } else {
            return ''
        }
    }


    return (
        <main>
            {inquiryDetails.length === undefined || 0 ? (
                <div>
                    <p>Something is wrong</p>
                    <button onClick={returnToInquiries}>Inquiries List</button>
                </div>
            ) : (
                <div key={inquiryDetails.id}>
                                <div>
                                    <h1>{inquiryDetails.contact[0].firstName} {inquiryDetails.lastName}</h1>
                                    <h2>Priority: {priorityConversion(inquiryDetails)}</h2>
                                    <h5>Phone Number: {phoneNumberFormatter(inquiryDetails)}</h5>
                                    <h5>Email: {inquiryDetails.email}</h5>
                                    <h5>{addressFormat(inquiryDetails)}</h5>
                                    <h3>Date Submitted: {dateConversion(inquiryDetails)}</h3>
                                    <h3>Serice Status: {completionConversion(inquiryDetails)}</h3>
                                    <h2>NOTES:</h2>
                            <p>{inquiryDetails.customer[0].notes}</p>
                            <button onClick={changeNote}>{noteButton(inquiryDetails)}</button>
                            <br />
                            <h3>Customer Responses to Survey:</h3>
                            <p>{cleaningDisplay(inquiryDetails)}</p>
                            <p>{movingDisplay(inquiryDetails)}</p>
                            <p>{organizeDeclutterDisplay(inquiryDetails)}</p>
                            <p>Additional Comments: {inquiryDetails.contact[0].comments}</p>
                            <button onClick={returnToInquiries}>Inquiries List</button>
                                </div>
    
                </div>
            )}
        </main>
    )

}

export default SpecificInquiry;