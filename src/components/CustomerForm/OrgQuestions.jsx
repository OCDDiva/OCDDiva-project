//Imports go here
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// 1. # Bedrooms to be organized
// 2. # Bathrooms to be organized
// 3. # Addtnl organized rooms
// 4. Would you like to Donate any items?

function OrgQuestions() {
    //Code goes here

    const history = useHistory();
    const dispatch = useDispatch();

    const [organizingValue, setOrganizingValue] = useState(false);
    const [numBedrooms, setNumBedrooms] = useState(0);
    const [numBathrooms, setNumBathrooms] = useState(0);
    const [numAdditionalRooms, setNumAdditionalRooms] = useState(0);
    const [donation, setDonationStatus] = useState(false);

    const organizing = (event) => {
        setOrganizingValue(event.target.value);
    };

    const nextStep = (event) => {
        event.preventDefault();
        history.push('/declutterquestions');
    }

    //What displays
    return (
        <>
            <h2>Would you like your space organized?</h2>
            <br />
            <form onChange={organizing}>
                <input type="radio" value={true} name="Yes" /> Yes
                <input type="radio" value={false} name="No" /> No
            </form>
            {organizingValue === "true" && (
                <div className="organizeQuestions">
                    <ol>
                        <li>
                            <label>
                                <p>Number of bedrroms to be organized?</p>
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
                    </ol>
                </div>
            )}
            <br />
            <br />
            <button className="btn" onClick={nextStep}>Next</button>
        </>

    )
} // End OrgQuestions()

export default OrgQuestions;
