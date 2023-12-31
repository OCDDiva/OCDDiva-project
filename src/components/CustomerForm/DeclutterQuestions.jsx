//Imports go here
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import { TextField, Typography, Card, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';

function DeclutterQuestions() {
    //Code goes here

    const history = useHistory();
    const dispatch = useDispatch();

    const [declutteringValue, setDeclutteringValue] = useState(false);
    const [numBedrooms, setNumBedrooms] = useState(0);
    const [numBathrooms, setNumBathrooms] = useState(0);
    const [numAdditionalRooms, setNumAdditionalRooms] = useState(0);
    const [donation, setDonationStatus] = useState(false);
    const user = useSelector(store => store.user);
    const allUserInfo = useSelector(store => store.allUserInfo);


    const decluttering = (event) => {
        setDeclutteringValue(event.target.value);
    }

    const goBack = () => { history.goBack() };

    const nextStep = (event) => {
        event.preventDefault();
        dispatch({type: 'UPDATE_DECLUTT', payload: {
                Declutter: declutteringValue,
                Bedrooms: numBedrooms,
                Bathrooms: numBathrooms,
                AdditionalRooms: numAdditionalRooms,
                Donation: donation,
                inquiry_id: allUserInfo?.contact?.id,
            }

        })
        history.push('/review');
    }

    console.log('checking value of declutter', declutteringValue)

    //What displays
    return (
        <>
        <ProgressBar currentStep={4} />
        <center>
                <Card sx={{
                    width: 'auto',
                    minWidth: 250,
                    margin: 1,
                    padding: 5,
                    boxShadow: 5,
                }}>
                    <Typography variant="h5" className="h2Headers">Would you like your space Decluttered?</Typography>
                    <br />
                    <form onChange={decluttering} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <input type="radio" value={true} name="Organize" /> Yes
                        <input type="radio" value={false} name="Organize" /> No
                    </form>
                    {declutteringValue === "true" && (
                        <div className="declutteringQuestions" style={{ display: 'inline-block' }}>
                            <div>
                                <Typography>Number of bedrooms to be decluttered?</Typography>
                                <TextField
                                    type="number"
                                    value={numBedrooms}
                                    onChange={(event) => setNumBedrooms(event.target.value)}
                                />
                            </div>
                            <div>
                                <Typography>Number of bathrooms to be decluttered?</Typography>
                                <TextField
                                    type="number"
                                    value={numBathrooms}
                                    onChange={(event) => setNumBathrooms(event.target.value)}
                                />
                            </div>
                            <div>
                                <Typography>Number of additional rooms to be decluttered?</Typography>
                                <TextField
                                    type="number"
                                    value={numAdditionalRooms}
                                    onChange={(event) => setNumAdditionalRooms(event.target.value)}
                                />
                            </div>
                            <div>
                                <Typography>Would you like to donate any items today?</Typography>
                                <input
                                    type="radio"
                                    value="true"
                                    name="Donation"
                                    onChange={(event) => setDonationStatus(event.target.value)}
                                /> Yes
                                <br />
                                <input
                                    type="radio"
                                    value="false"
                                    name="Donation"
                                    onChange={(event) => setDonationStatus(event.target.value)}
                                /> No
                            </div>
                        </div>
                    )}
                    <br />
                    <br />
                    <button className="btn" onClick={goBack}> Back </button>
                    
                    <button className="btn" onClick={nextStep}>Next</button>
                </Card>
            </center>
        </>

    )
} // End DeclutterQuestions()

export default DeclutterQuestions;