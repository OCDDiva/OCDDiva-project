import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';

function CleaningQuestions() {
    const history = useHistory();
    const dispatch = useDispatch(); // will probably need this for sending the DB updates throughout the form

    const [selectedOption, setSelectedOption] = useState(''); // sets option in state to be sent around via dispatches 


    // Setting state for each question
    const [numBedrooms, setNumBedrooms] = useState(0);
    const [numBathrooms, setNumBathrooms] = useState(0);
    const [numAdditionalRooms, setNumAdditionalRooms] = useState(0);
    const [numDoorsWindows, setNumDoorsWindows] = useState(0);
    const [hasPets, setHasPets] = useState('');
    const [hazardousConditions, setHazardousConditions] = useState('');


    const optionChoice = (e) => {
        setSelectedOption(e.target.value);
    };

    const nextStep = (event) => {
        event.preventDefault();
        history.push('/movingquestions');
    }

    return (
        <>
            Steve: Test
            <br />
            <br />
            <div>
                <form>
                    <label>
                        Select an Option:
                        <select value={selectedOption} onChange={optionChoice} >
                            <option value="">Please select</option>
                            <option value="ultimate">ULTIMATE</option>
                            <option value="essential">ESSENTIAL</option>
                        </select>
                    </label>
                </form>
            </div>
            {selectedOption === "ultimate" && (
                <>
                    <h2>Ultimate Service Questions</h2>
                    <ol>
                        <li>
                            <label>
                                # of Bedrooms:
                                <input
                                    type="number"
                                    min="0"
                                    value={numBedrooms}
                                    onChange={(e) => setNumBedrooms(e.target.value)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                # of Bathrooms:
                                <input
                                    type="number"
                                    min="0"
                                    value={numBathrooms}
                                    onChange={(e) => setNumBathrooms(e.target.value)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                # of Additional Rooms:
                                <input
                                    type="number"
                                    min="0"
                                    value={numAdditionalRooms}
                                    onChange={(e) => setNumAdditionalRooms(e.target.value)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                # of Doors/Windows to be cleaned:
                                <input
                                    type="number"
                                    min="0"
                                    value={numDoorsWindows}
                                    onChange={(e) => setNumDoorsWindows(e.target.value)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                Do you have pets? :
                                <input
                                    type="radio"
                                    name="pets"
                                    value="yes"
                                    checked={hasPets === "yes"}
                                    onChange={() => setHasPets("yes")} />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="pets"
                                    value="no"
                                    checked={hasPets === "no"}
                                    onChange={() => setHasPets("no")} />
                                No
                            </label>
                        </li>
                        <li>
                            <label>
                                Hazardous conditions? ex mold, mildew, bugs, rats
                                <input
                                    type="text"
                                    value={hazardousConditions}
                                    onChange={(e) => setHazardousConditions(e.target.value)}
                                />
                            </label>
                        </li>
                    </ol>
                    <button onClick={nextStep}>Next</button>
                </>
            )}
            {selectedOption === "essential" && (
                <>
                    <h2>Essential Service Questions</h2>
                    <ol>
                        <li>
                            <label>
                                # of Bedrooms:
                                <input
                                    type="number"
                                    min="0"
                                    value={numBedrooms}
                                    onChange={(e) => setNumBedrooms(e.target.value)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                # of Bathrooms:
                                <input
                                    type="number"
                                    min="0"
                                    value={numBathrooms}
                                    onChange={(e) => setNumBathrooms(e.target.value)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                # of Additional Rooms:
                                <input
                                    type="number"
                                    min="0"
                                    value={numAdditionalRooms}
                                    onChange={(e) => setNumAdditionalRooms(e.target.value)} />
                            </label>
                        </li>

                        <li>
                            <label>
                                Do you have pets? :
                                <input
                                    type="radio"
                                    name="pets"
                                    value="yes"
                                    checked={hasPets === "yes"}
                                    onChange={() => setHasPets("yes")} />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="pets"
                                    value="no"
                                    checked={hasPets === "no"}
                                    onChange={() => setHasPets("no")} />
                                No
                            </label>
                        </li>
                        <li>
                            <label>
                                Hazardous conditions? ex mold, mildew, bugs, rats :
                                <input
                                    type="text"
                                    value={hazardousConditions}
                                    onChange={(e) => setHazardousConditions(e.target.value)}
                                />
                            </label>
                        </li>
                    </ol>
                    <button onClick={nextStep}>Next</button>
                </>
            )}
        </>
    );
}// End Inquiries()

export default CleaningQuestions;



// THIS IS MADE AS A BACKUP FORM FOR TESTING PURPOSES OR TO BE USED LATER 
{/* <h2>Cleaning Services</h2> 
                <p>Please Select a cleaning service:</p>

                <div class="essential">
                    <h3>Essential</h3>
                    <p>Description of Essential</p>
                    <button>Select Essential</button>
                </div>

                <div class="ultimate">
                    <h3>Ultimate</h3>
                    <p>Description of Ultimate</p>
                    <button>Select Ultimate</button>
                </div> */}