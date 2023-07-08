//Imports go here
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography, Card } from '@mui/material';


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
            }

        })
        history.push('/declutterquestions');
    }

    //What displays
    return (
        <>
            <center>
                <Card>
                    <h2 className="h2Headers">Would you like your space organized?</h2>
                    <br />
                    <form onChange={organizing} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <input type="radio" value={true} name="Yes" /> Yes
                        <input type="radio" value={false} name="No" /> No
                    </form>
                    {organizingValue === "true" && (
                        <div className="organizeQuestions">
                            <ul style={{ listStyle: 'none' }}>
                                <li>
                                    <label>
                                        <p>Number of bedrooms to be organized?</p>
                                        <input
                                            type="number"
                                            value={numBedrooms}
                                            onChange={(event) => setNumBedrooms(event.target.value)}
                                        />
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <p>Number of bathrooms to be organized?</p>
                                        <input
                                            type="number"
                                            value={numBathrooms}
                                            onChange={(event) => setNumBathrooms(event.target.value)}
                                        />
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <p>Number of additional rooms to be organized?</p>
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
} // End OrgQuestions()

export default OrgQuestions;

