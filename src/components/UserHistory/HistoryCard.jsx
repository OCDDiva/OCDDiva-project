import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

function historyCard({ history }) {
    const dispatch = useDispatch();


    useEffect(() => {
        const action  = { type: 'GET_HISTORY' }
        dispatch(action);
    }, []);

    console.log('Check history', history)

    const dateReceivedConversion = (oldDate) => {
        const date = new Date(oldDate.date_received).toLocaleDateString('en-EN')
        return `${date}`
    }

    const dateRequestedConversion = (oldDate) => {
        const date = new Date(oldDate.date_requested).toLocaleDateString('en-EN')
        return `${date}`
    }

    const completionConversion = (history) => {
        if (history.completion_status === 5) {
            return 'Complete'
        } else if (history.completion_status === 4) {
            return 'In Progress'
        } else if (history.completion_status === 3) {
            return 'Bid Rejected'
        } else if (history.completion_status === 2) {
            return 'Bid Offered'
        } else if (history.completion_status === 1) {
            return 'Pending'
        }
    }

    const serviceConversion = (history) => {
        if (history.Cleaning === 'essential') {
            return 'Essential Clean'
        } else if (history.Cleaning === 'ultimate') {
            return 'Ultimate Clean'
        } else if (history.moving === true) {
            return 'Moving'
        } else if (history.Organizing === true) {
            return 'Organizing'
        } else if (history.Declutter === true) {
            return 'Declutter'
        }
    }

    return (
        <Grid item xs={{ minWidth: 700 }}>
        <Card sx={{  maxWidth: 'fit-content' }}>
            <CardContent>
                <br/>
                <Typography 
                variant="h5"
                >
                 Date of Inquiry: {dateReceivedConversion(history)}
                </Typography>
                <br />
                <Typography 
                variant="h5"
                >
                 Date Requested: {dateRequestedConversion(history)}
                </Typography>
                <br />
                <Typography 
                variant="h5"
                >
                 Type of service: {serviceConversion(history)}
                </Typography>
                <br />
                <Typography 
                variant="h5"
                >
                 Completion status: {completionConversion(history)}
                 <br />
                 <Typography variant="h6">{history.status}</Typography>
                 <br />
                </Typography>
                <Typography variant="h5">Comments: </Typography>
                <p>{history.comments}</p>
                <br/>
            </CardContent>
        </Card>
        <br />
    </Grid>
    )
} //End historyCard()

export default historyCard;