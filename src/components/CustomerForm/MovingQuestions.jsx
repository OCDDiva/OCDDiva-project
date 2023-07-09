//Imports go here
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import { TextField, Typography, Card } from '@mui/material';


function MovingQuestions() {
    //Code goes here

    const history = useHistory();
    const dispatch = useDispatch();

    const [moving, setMoving] = useState();
    const [movingTo, setMovingTo] = useState('');
    const [movingFrom, setMovingFrom] = useState('');
    const [largeItems, setLargeItems] = useState('');
    const user = useSelector(store => store.user);

    const handleMovingValue = (event) => {
        setMoving(event.target.value)
    };

    const movingToValue = (event) => {
        setMovingTo(event.target.value)
    }

    const movingFromValue = (event) => {
        setMovingFrom(event.target.value);
    }

    const largeItemsValue = (event) => {
        setLargeItems(event.target.value);
    }

    const goBack = () => { history.goBack() }

    // useEffect(() => {
    //     dispatch({ type: 'FETCH_INQUIRY_DETAILS' });
    // }, []);

    const inquiryDetails = useSelector(store => store.inquiryDetails);

    // console.log('Checking inquiry Details', inquiryDetails)

    const nextStep = (event) => {
        event.preventDefault();
        console.log(moving, movingTo, movingFrom, largeItems, user.id)
        dispatch({ type: 'UPDATE_MOVING', payload: {
            moving: moving,
            moving_to: movingTo,
            moving_from: movingFrom,
            large_items: largeItems,
        } 
    })
        history.push('/organizequestions');
    }



    //What displays
    return (
        <>
        <ProgressBar currentStep={2} />

            <center>
                <Card sx={{
                    width: 'auto',
                    minWidth: 250,
                    margin: 1,
                    padding: 5,
                    boxShadow: 5,
                }}>
                    <Typography variant="h4" className="h2Headers">Are you moving?</Typography>
                    <br />
                    <center>
                        <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <input
                                type="radio"
                                value={true}
                                name="Yes"
                                checked={moving === true}
                                onChange={handleMovingValue}
                            /> Yes

                            <input
                                type="radio"
                                value={false}
                                name="No"
                                checked={moving === false}
                                onChange={handleMovingValue}
                            /> No
                        </form>
                        {moving === "true" && (
                            <div className="movingQuestions" style={{ display: 'inline-block' }}>
                                <br />
                                <br />
                                <div>
                                    <p>Where are you moving to?</p>
                                    <TextField
                                        type="text"
                                        value={movingTo}
                                        onChange={movingToValue}
                                    />
                                </div>
                                <div>
                                    <p>Where are you moving from?</p>
                                    <TextField
                                        type="text"
                                        value={movingFrom}
                                        onChange={movingFromValue}
                                    />
                                </div>
                                <div>
                                    <p>What large items do you have that will need to be moved?</p>
                                    <TextField
                                        type="text"
                                        value={largeItems}
                                        onChange={largeItemsValue}
                                    />

                                </div>
                            </div>
                        )}
                        <br />
                        <br />
                        <button className="btn" onClick={goBack}> Back </button>
                        <br />
                        <br />
                        <button className="btn" onClick={nextStep}>Next</button>
                    </center>
                </Card>
            </center>
        </>
    )
} // End MovingQuestions()

export default MovingQuestions;