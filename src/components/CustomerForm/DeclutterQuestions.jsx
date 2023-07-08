//Imports go here
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography, Card } from '@mui/material';

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


    const decluttering = (event) => {
        setDeclutteringValue(event.target.value);
    }

    const goBack = () => { history.goBack() };

    const nextStep = (event) => {
        event.preventDefault();
        dispatch({
            type: 'UPDATE_DECLUTT', payload: {
                Declutter: declutteringValue,
                Bedrooms: numBedrooms,
                Bathrooms: numBathrooms,
                AdditionalRooms: numAdditionalRooms,
                Donation: donation,
            }

        })
        history.push('/review');
    }

    console.log('checking value of declutter', declutteringValue)

    //What displays
    return (
        <>
            <center>
                <Card>
                    <h2 className="h2Headers">Would you like your space Decluttered?</h2>
                    <br />
                    <form onChange={decluttering} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <input type="radio" value={true} name="Yes" /> Yes
                        <input type="radio" value={false} name="No" /> No
                    </form>
                    {declutteringValue === "true" && (
                        <div className="declutteringQuestions">
                            <ul style={{ listStyle: 'none' }}>
                                <li>
                                    <label>
                                        <p>Number of bedrooms to be decluttered?</p>
                                        <input
                                            type="number"
                                            value={numBedrooms}
                                            onChange={(event) => setNumBedrooms(event.target.value)}
                                        />
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <p>Number of bathrooms to be decluttered?</p>
                                        <input
                                            type="number"
                                            value={numBathrooms}
                                            onChange={(event) => setNumBathrooms(event.target.value)}
                                        />
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <p>Number of additional rooms to be decluttered?</p>
                                        <input
                                            type="number"
                                            value={numAdditionalRooms}
                                            onChange={(event) => setNumAdditionalRooms(event.target.value)}
                                        />
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <p>Would you like to donate any items today?</p>
                                        <input
                                            type="radio"
                                            value="true"
                                            onChange={(event) => setDonationStatus(event.target.value)}
                                        /> Yes
                                        <br />
                                        <input
                                            type="radio"
                                            value="false"
                                            onChange={(event) => setDonationStatus(event.target.value)}
                                        /> No
                                    </label>
                                </li>
                            </ul>
                        </div>
                    )}
                    <br />
                    <br />
                    <button className="btn" onClick={nextStep}>Next</button>
                    <br />
                    <br />
                    <button className="btn" onClick={goBack}> Back </button>
                </Card>
            </center>
        </>

    )
} // End DeclutterQuestions()

export default DeclutterQuestions;