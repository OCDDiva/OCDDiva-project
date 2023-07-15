//Imports go here
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { InputLabel, Typography, Card, CardContent, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

function InquiryDetails() {
    //Code goes here
    const dispatch = useDispatch();
    const history = useHistory();
    const inquiries = useSelector(store => store.fetchInquiries);
    const inquiryDetails = useSelector(store => store.inquiryDetails);
    const priorities = useSelector(store => store.priorityList);
    const completionStatuses = useSelector(store => store.completionStatus);
    const notes = useSelector(store => store.fetchNotes);
    const { inquiriesId } = useParams();

    console.log('InquiryDetails Object:', inquiryDetails)
    console.log('InquiryList:', inquiries)

    useEffect(() => {
        dispatch({ type: 'FETCH_PRIORITIES' });
        dispatch({ type: 'FETCH_STATUS' });
        dispatch({ type: 'FETCH_INQUIRIES' });
        dispatch({ type: 'FETCH_NOTES' });
    }, [inquiriesId]);

    if (inquiriesId) {
        useEffect(() => {
            console.log('UseEffect Details Running:')
            dispatch({ type: 'FETCH_INQUIRY_DETAILS', payload: inquiriesId });

        }, [inquiriesId]);
    }


    const returnToInquiries = (event) => {
        history.push(`/inquiries`)
    }

    const cleaningConversion = (inquiry) => {
        if (inquiry?.cleaning?.ServiceType === 'Essential') {
            return 'Essential Clean'
        } else if (inquiry?.cleaning?.ServiceType === 'Ultimate') {
            return 'Ultimate Clean'
        } else {
            return ''
        }
    }

    const movingConversion = (inquiry) => {
        if (inquiry?.moving?.moving === true) {
            return 'Moving'
        } else {
            return ''
        }
    }


    const organizeConversion = (inquiry) => {
        if (inquiry?.organize?.Organizing === true) {
            return 'Organize'
        } else {
            return ''
        }
    }


    const decluttConversion = (inquiry) => {
        if (inquiry?.declutt?.Declutter === true) {
            return 'Declutter'
        } else {
            return ''
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
        console.log('Here', inquiryDetails)
        if (inquiryDetails?.declutt?.Donation === true) {
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
                <h3>Cleaning Questions:</h3>
                <p>Number of Bedrooms: {inquiryDetails?.cleaning?.Bedrooms}</p>
                <p>Number of Bathrooms: {inquiryDetails?.cleaning?.Bathrooms}</p>
                <p>Number of Additional Rooms: {inquiryDetails?.cleaning?.AdditionalRooms}</p>
                <p>Number of Doors: {inquiryDetails?.cleaning?.Doors}</p>
                <p>Number of Windows: {inquiryDetails?.cleaning?.Windows}</p>
                <p>Pets? {inquiryDetails?.cleaning?.HasPets}</p>
                <p>Hazardous Conditions? {inquiryDetails?.cleaning?.HazardousConditions}</p>
            </div>
        } else {
            return ''
        }
    }

    const movingDisplay = (inquiryDetails) => {
        if (inquiryDetails?.moving?.moving === true) {
            return <div>
                <h3>Moving Questions:</h3>
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
                <h3>Organizing Questions:</h3>
                <p>Number of Bedrooms: {inquiryDetails?.organize?.Bedrooms}</p>
                <p>Number of Bathrooms: {inquiryDetails?.organize?.Bathrooms}</p>
                <p>Number of Additional Rooms: {inquiryDetails?.organize?.AdditionalRooms}</p>
            </div>
        } else {
            return ''
        }
    }

    const declutterDisplay = (inquiryDetails) => {
        if (inquiryDetails?.declutt?.Declutter === true) {
            return <div>
                <h3>Decluttering Questions:</h3>
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
    const [completionStatus, setCompletionStatus] = useState([]);
    const [newNotes, setNewNotes] = useState([]);

    const handlePriorityLevel = (event) => {
        setPriorityLevel(event.target.value);
    }

    const handleCompletionStatus = (event) => {
        setCompletionStatus(event.target.value);
    }

    const handleNotes = (event) => {
        setNewNotes(event.target.value);
    }

    const saveNotes = () => {
        dispatch({ type: 'EDIT_NOTE', payload: { notes: newNotes, inquiry_id: inquiriesId, }, history })
    }

    console.log('Priorities', priorities)
    console.log('Statuses', completionStatuses);
    console.log('InquiriesID:', inquiriesId);
    console.log('Notes', inquiryDetails?.customer?.notes)

    const savePriority = () => {
        dispatch({ type: 'EDIT_PRIORITY', payload: { priority: priorityLevel, id: inquiriesId }, history })
    }

    const saveCompletion = () => {
        dispatch({ type: 'EDIT_STATUS', payload: { completion_status: completionStatus, id: inquiriesId }, history })
    }


    //What displays
    return (
        <main>
            <Box display="flex" justifyContent="center" alignItems="center" height="280vh">
                <Card>
                    <CardContent>
                        {/* <Typography variant="h6" style= {{textAlign: 'center'}} component="p" gutterBottom>
                            Inquiries ID: {inquiriesId}
                        </Typography> */}
                        <Typography variant="h3" style={{ textAlign: 'center', fontWeight: 'bold' }} component="h1" gutterBottom>
                            {inquiryDetails?.contact?.firstName} {inquiryDetails?.contact?.lastName}
                        </Typography>
                        <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                        <Typography variant="h5" style={{ textAlign: 'center' }} component="h2" gutterBottom>
                            {cleaningConversion(inquiryDetails)}
                        </Typography>
                        <Typography variant="h5" style={{ textAlign: 'center' }} component="h2" gutterBottom>
                            {movingConversion(inquiryDetails)}
                        </Typography>
                        <Typography variant="h5" style={{ textAlign: 'center' }} component="h2" gutterBottom>
                            {organizeConversion(inquiryDetails)}
                        </Typography>
                        <Typography variant="h5" style={{ textAlign: 'center' }} component="h2" gutterBottom>
                            {decluttConversion(inquiryDetails)}
                        </Typography>
                        <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                        <br />
                        <FormControl fullWidth>
                            <FormLabel style={{ textAlign: 'center' }}>Priority Level:</FormLabel>
                            <Select
                                labelId="priority-select-label"
                                id="priority-select"
                                onChange={handlePriorityLevel}
                                value={priorityLevel}
                                placeholder={priorityConversion(inquiryDetails)}
                            >
                                {priorities.map(priority => (
                                    <MenuItem key={priority.id} value={priority.id}>{priority.description}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <Box display="flex" justifyContent="center">
                           <button className='btn' onClick={savePriority}>Save Any Priority Changes</button> 
                        </Box>
                        <br />
                        <br />
                        <Typography variant="h5"  style={{ textAlign: 'center' }} gutterBottom>
                            Date Received: {dateConversion(inquiryDetails)}
                        </Typography>
                        <br />
                        <FormControl fullWidth>
                            <FormLabel style={{ textAlign: 'center' }}>Status:</FormLabel>
                            <Select
                                labelId="completion-select-label"
                                id="completion-select"
                                onChange={handleCompletionStatus}
                                value={completionStatus}
                                placeholder={completionConversion(inquiryDetails)}
                            >
                                {completionStatuses.map(status => (
                                    <MenuItem key={status.id} value={status.id}>{status.description}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <Box display="flex" justifyContent="center">
                        <button className='btn' onClick={saveCompletion}>Save Any Completion Status Changes</button>
                        </Box>
                        <br />
                        <Typography  style={{ textAlign: 'center' }} variant="h5" component="h2" gutterBottom>
                            NOTES:
                        </Typography>
                        <div className="centered-textarea" style={{ display: 'flex', justifyContent: 'center' }}>
                        <textarea
                            name="notes"
                            type="text"
                            id="notesOfCustomer"
                            cols="40"
                            rows="10"
                            value={newNotes}
                            onChange={handleNotes}
                            placeholder={inquiryDetails?.customer?.notes}
                        ></textarea>
                        </div>
                        <br />
                        <br />
                        <Box display="flex" justifyContent="center">
                        <button className='btn' onClick={saveNotes}>Save Any Notes Changes</button>
                        </Box>
                        <br />
                        <div className="centered-content" style={{ textAlign: 'center' }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Customer Responses to Survey:
                        </Typography>
                        <Typography variant="h6" component="p" gutterBottom>
                            {cleaningDisplay(inquiryDetails)}
                        </Typography>
                        <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                        <Typography variant="h6" component="p" gutterBottom>
                            {movingDisplay(inquiryDetails)}
                        </Typography>
                        <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                        <Typography variant="h6" component="p" gutterBottom>
                            {organizeDisplay(inquiryDetails)}
                        </Typography>
                        <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                        <Typography variant="h6" component="p" gutterBottom>
                            {declutterDisplay(inquiryDetails)}
                        </Typography>
                        <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                        <Typography variant="h6" component="p">
                            Additional Comments: {inquiryDetails?.contact?.comments}
                        </Typography>
                        <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                        <Typography variant="h6" component="h2" gutterBottom>
                            Photos:
                            <br />
                           <img src={inquiryDetails?.media?.url} />
                        </Typography>
                        </div>
                        <Box display="flex" justifyContent="center">
                        <button className='btn' onClick={returnToInquiries}>Return to Inquiries List</button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </main>
        
    )
} // End Inquiries()

export default InquiryDetails;