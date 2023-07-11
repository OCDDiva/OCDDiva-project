import HistoryCard from './HistoryCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';



function UserHistory() {
    const history = useSelector((store => store.history));
    const dispatch = useDispatch();

    useEffect(() => {
        const action = { type: 'GET_HISTORY' };
        dispatch(action);
    }, []);
    //What displays
    return (
        // This will be replaced with HistoryCard component as a .map 
<Container>

    <br/>
    <br/>
    <Grid  justifyContent="center"
    container spacing={2}>
  {
    history.map((history) => (
        <HistoryCard
        key={history.id}
        history={history}
        />
    ))
  }
    </Grid>
</Container>
    )
} //End UserHistory()

export default UserHistory;