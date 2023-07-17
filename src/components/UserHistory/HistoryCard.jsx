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
    const historyDetails = useSelector(store => store.history);


    useEffect(() => {
        const action = { type: 'GET_HISTORY' }
        dispatch(action);
    }, []);

    console.log('Check history', historyDetails)

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
            <Card sx={{
                maxWidth: 'fit-content',
                width: 'auto',
                minWidth: 250,
                margin: 1,
                boxShadow: 5,
            }}>
                <CardContent>
                    <br />
                    <Typography variant="h5" > Service type: {serviceConversion(history)} </Typography>

                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                    
                    <Typography variant="h6" >
                        Date of inquiry submission: {dateReceivedConversion(history)}
                    </Typography>
                    <br />

                    <Typography variant="h6">
                        Date requested for service: {dateRequestedConversion(history)}
                    </Typography>
                    <br />

                    <Typography variant="h6">
                        Completion status: {completionConversion(history)}
                        <br />

                        <Typography variant="h6">{history.status}</Typography>
                        <br />

                    </Typography>

                    <Typography variant="h6"> Additional comments: </Typography>

                    <Typography variant="h6">{history.comments} </Typography>
                    <br />

                </CardContent>
            </Card>

            <br />

        </Grid>
    )
} //End historyCard()

export default historyCard;