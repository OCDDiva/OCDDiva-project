//Imports go here
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import { TextField, Typography, Card, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
function OrgQuestions() {
    //Code goes here

    const history = useHistory();
    const dispatch = useDispatch();

    const [organizingValue, setOrganizingValue] = useState(false);
    const [numBedrooms, setNumBedrooms] = useState(0);
    const [numBathrooms, setNumBathrooms] = useState(0);
    const [numAdditionalRooms, setNumAdditionalRooms] = useState(0);
    const [donation, setDonationStatus] = useState(false);
    const user = useSelector(store => store.user);
    const allUserInfo = useSelector(store => store.allUserInfo);


    const organizing = (event) => {
        setOrganizingValue(event.target.value);
    };



    const goBack = () => { history.goBack() };

    console.log(numAdditionalRooms);

    const nextStep = (event) => {
        event.preventDefault();
        dispatch({
            type: 'UPDATE_ORG', payload: {
                Organizing: organizingValue,
                Bedrooms: numBedrooms,
                Bathrooms: numBathrooms,
                AdditionalRooms: numAdditionalRooms,
                Donation: donation,
                inquiry_id: allUserInfo?.contact?.id,
            }

        })
        history.push('/declutterquestions');
    }

    //What displays
    return (
        <>
        <ProgressBar currentStep={3} />
        <center>
                <Card sx={{
                    width: 'auto',
                    minWidth: 250,
                    margin: 1,
                    padding: 5,
                    boxShadow: 5,
                }}>
                    <Typography className="h2Headers" variant="h5">Would you like your space organized?</Typography>
                    <br />
                    <center>
                        <form onChange={organizing} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <input type="radio" value={true} name="Organize" /> Yes
                            <input type="radio" value={false} name="Organize" /> No
                        </form>
                        {organizingValue === "true" && (
                            <div className="organizeQuestions" style={{ display: 'inline-block' }}>
                                <div>
                                    <p>Number of bedrooms to be organized?</p>
                                    <TextField
                                        type="number"
                                        value={numBedrooms}
                                        onChange={(event) => setNumBedrooms(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <p>Number of bathrooms to be organized?</p>
                                    <TextField
                                        type="number"
                                        value={numBathrooms}
                                        onChange={(event) => setNumBathrooms(event.target.value)}
                                    />

                                </div>
                                <div>
                                    <p>Number of additional rooms to be organized?</p>
                                    <TextField
                                        type="number"
                                        value={numAdditionalRooms}
                                        onChange={(event) => setNumAdditionalRooms(event.target.value)}
                                    />
                                </div>
                                {/* <div>
                                    <p>Would you like to donate any items today?</p>
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
                                </div> */}
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
} // End OrgQuestions()

export default OrgQuestions;

