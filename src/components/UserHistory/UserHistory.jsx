import HistoryCard from './HistoryCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import './UserHistory.css';



function UserHistory() {
    const history = useSelector((store => store.history));
    const dispatch = useDispatch();

    useEffect(() => {
        const action = { type: 'GET_HISTORY' };
        dispatch(action);
    }, []);

    console.log('Checking history in UserHistory', history)
    //What displays
    return (
        // This will be replaced with HistoryCard component as a .map 
        <Container>
            <center>
                <h1 className='historyTitle'>User History</h1>
                <br />
                <br />
                <Grid justifyContent="center">
                    {
                        history.map((history) => (
                            <HistoryCard
                                key={history.id}
                                history={history}
                            />
                        ))
                    }
                </Grid>
            </center>

        </Container>
    )
} //End UserHistory()

export default UserHistory;