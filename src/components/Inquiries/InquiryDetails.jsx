//Imports go here
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { InputLabel, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

function InquiryDetails() {
    //Code goes here
    const dispatch = useDispatch();
    const history = useHistory();
    const inquiries = useSelector(store => store.fetchInquiries);
    const inquiryDetails = useSelector(store => store.inquiryDetails);
    const priorities = useSelector(store => store.priorityList);
    const completionStatuses = useSelector(store => store.completionStatus);
    const { inquiriesId } = useParams();

    console.log('InquiryDetails Object:', inquiryDetails)
    console.log('InquiryList:', inquiries)

    useEffect(() => {
        dispatch({ type: 'FETCH_PRIORITIES' });
        dispatch({ type: 'FETCH_STATUS' });
        dispatch({ type: 'FETCH_INQUIRIES' });
    }, [inquiriesId]);

    if (inquiriesId) {
        useEffect(() => {
            console.log('UseEffect Details Running:')
            dispatch({ type: 'FETCH_INQUIRY_DETAILS', payload: inquiriesId });

        }, [inquiriesId]);
    }


    console.log('Priorities', priorities)
    console.log('Statuses', completionStatuses);
    console.log('InquiriesID:', inquiriesId);


    const returnToInquiries = (event) => {
        dispatch({ type: 'EDIT_PRIORITY', payload: { priority: priorityLevel, id: inquiriesId } })
        dispatch({ type: 'EDIT_STATUS', payload: { completion_status: completionStatus, id: inquiriesId }})
        history.push('/inquiries')
    }

    // TODO see what miguel made for the dispatch for adding notes and edit accordingly
    const changeNote = (e) => {
        e.preventDefault();
        if (inquiryDetails?.customer?.notes !== null) {
            dispatch({ type: 'EDIT_NOTE', payload: { inquiryDetails, inquiriesId, }, history });
        } else {
            dispatch({ type: 'ADD_NOTE', payload: { inquiryDetails }, history })
        }
    }

    const noteButton = () => {
        if (inquiryDetails?.customer?.notes !== null) {
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
        if (inquiries?.contact?.completion_status === 5) {
            return 'Complete'
        } else if (inquiries?.contact?.completion_status === 4) {
            return 'In Progress'
        } else if (inquiries?.contact?.completion_status === 3) {
            return 'Bid Rejected'
        } else if (inquiries?.contact?.completion_status === 2) {
            return 'Bid Offered'
        } else if (inquiries?.contact?.completion_status === 1) {
            return 'Pending'
        }
    }

    const priorityConversion = (inquiryDetails) => {
        if (inquiryDetails?.contact?.priority === 1) {
            return 'High'
        } else if (inquiryDetails?.contact?.priority === 2) {
            return 'Medium'
        } else if (inquiryDetails?.contact?.priority === 3) {
            return 'Low'
        }
    }

    const donationConversion = (inquiryDetails) => {
        if (inquiryDetails?.declutt?.Donation === true || inquiryDetails?.organize?.Donation === true) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

    const dateConversion = (oldDate) => {
        const date = new Date(oldDate?.contact?.date_received).toLocaleDateString('en-EN')
        return `${date}`
    }

    const cleaningDisplay = (inquiryDetails) => {
        if (inquiryDetails?.cleaning?.Cleaning === true) {
            return <div>
                <h5>Cleaning Questions:</h5>
                <p>Number of Bedrooms: {inquiryDetails?.cleaning?.Bedrooms}</p>
                <p>Number of Bathrooms: {inquiryDetails?.cleaning?.Bathrooms}</p>
                <p>Number of Additional Rooms: {inquiryDetails?.cleaning?.AdditionalRooms}</p>
                <p>Number of Doors & Windows: {inquiryDetails?.cleaning?.DoorsWindows}</p>
                <p>Has Pets? {inquiryDetails?.cleaning?.hasPets}</p>
                <p>Hazardous Conditions? {inquiryDetails?.cleaning?.HazardousConditions}</p>
            </div>
        } else {
            return ''
        }
    }

    const movingDisplay = (inquiryDetails) => {
        if (inquiryDetails?.moving?.moving === true) {
            return <div>
                <h5>Moving Questions:</h5>
                <p>New Address: {inquiryDetails?.moving?.moving_to}</p>
                <p>Old Address: {inquiryDetails?.moving?.moving_from}</p>
                <p>Any Large Items? {inquiryDetails?.moving?.large_items}</p>
            </div>
        } else {
            return ''
        }
    }

    const organizeDisplay = (inquiryDetails) => {
        if (inquiryDetails?.organize?.Organizing === true) {
            return <div>
                <h5>Organizing Questions:</h5>
                <p>Number of Bedrooms: {inquiryDetails?.organize?.Bedrooms}</p>
                <p>Number of Bathrooms: {inquiryDetails?.organize?.Bathrooms}</p>
                <p>Number of Additional Rooms: {inquiryDetails?.organize?.AdditionalRooms}</p>
                <p>Wanting to Donate? {donationConversion(inquiryDetails)}</p>
            </div>
        } else {
            return ''
        }
    }

    const declutterDisplay = (inquiryDetails) => {
        if (inquiryDetails?.declutt?.Declutter === true) {
            return <div>
                <h5>Decluttering Questions:</h5>
                <p>Number of Bedrooms: {inquiryDetails?.declutt?.Bedrooms}</p>
                <p>Number of Bathrooms: {inquiryDetails?.declutt?.Bathrooms}</p>
                <p>Number of Additional Rooms: {inquiryDetails?.declutt?.AdditionalRooms}</p>
                <p>Wanting to Donate? {donationConversion(inquiryDetails)}</p>
            </div>
        } else {
            return ''
        }
    }

    const [priorityLevel, setPriorityLevel] = useState([]);
    const [completionStatus, setCompletionStatus] = useState(1);

    const handlePriorityLevel = (event) => {
        console.log('Priority Changed', priorityLevel)
        setPriorityLevel(event.target.value);
    }

    const handleCompletionStatus = (event) => {
        setCompletionStatus(event.target.value);
    }

    console.log(priorityLevel)

    //What displays
    return (
        <main>
            <div key={inquiriesId}>
                <p>Inquiries ID: {inquiriesId}</p>
                <div key={inquiries.id}>
                    <h1>{inquiryDetails?.contact?.firstName} {inquiryDetails?.contact?.lastName}</h1>
                    {/* <h2>
                                {serviceConversion(inquiryDetails)}
                            </h2> */}
                    <h2>
                        <FormLabel>Priority Level:</FormLabel>
                        <FormControl fullWidth>
                            <InputLabel >{priorityConversion(inquiryDetails)}</InputLabel>
                            <Select
                                labelId='priority-select-label'
                                id='priority-select'

                                label='Priority Level'
                                onChange={handlePriorityLevel}
                            >
                                {priorities.map(priority => {
                                    return (
                                        <MenuItem key={priority.id} value={priority.id}>{priority.description}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </h2>
                    <h3>Date Received: {dateConversion(inquiryDetails)} </h3>
                    <FormLabel>Status:</FormLabel>
                    <FormControl fullWidth>
                        <InputLabel>{completionConversion(inquiryDetails)}</InputLabel>
                        <Select labelId="completion-select-label"
                            id="completion-select"
                            label="Completion Status"
                            onChange={handleCompletionStatus}>
                                {completionStatuses.map(status => {
                                    return (
                                        <MenuItem key={status.id} value={status.id}>{status.description}</MenuItem>
                                    )
                                })}
                        </Select>
                    </FormControl>
                    <h3> </h3>
                    <h2>NOTES:</h2>
                    <p>{inquiryDetails?.customer?.notes}</p>
                    <button onClick={changeNote}>{noteButton(inquiryDetails)}</button>
                    <br />
                    <h3>Customer Responses to Survey:</h3>
                    <p>{cleaningDisplay(inquiryDetails)}</p>
                    <p>{movingDisplay(inquiryDetails)}</p>
                    <p>{organizeDisplay(inquiryDetails)}</p>
                    <p>{declutterDisplay(inquiryDetails)}</p>
                    <p>Additional Comments: {inquiryDetails?.contact?.comments}</p>
                    <button onClick={returnToInquiries}>Inquiries List</button>
                </div>
            </div>
        </main>


    )
} // End Inquiries()

export default InquiryDetails;