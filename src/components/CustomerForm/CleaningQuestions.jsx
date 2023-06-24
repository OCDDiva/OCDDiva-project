import React, { useState } from 'react';

function CleaningQuestions() {
    const [selectedOption, setSelectedOption] = useState('');

    // Setting state for each questions
    const [numberBedrooms, setNumberBedrooms] = useState(0);

    const optionChoice = (e) => {
        setSelectedOption(e.target.value);
    };

    const nextStep = (event) => {
        event.preventDefault();

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
                                <input type="number" min="0" />
                            </label>
                        </li>
                        <li>
                            <label>
                                # of Bathrooms:
                                <input type="number" min="0" />
                            </label>
                        </li>
                        <li>
                            <label>
                                # of Additional Rooms:
                                <input type="number" min="0" />
                            </label>
                        </li>
                        <li>
                            <label>
                                # of Doors/Windows to be cleaned:
                                <input type="number" min="0" />
                            </label>
                        </li>
                        <li>
                            <label>Do you have pets</label>
                            <label>
                                <input type="radio" name="pets" value="yes" />
                                Yes
                            </label>
                            <label>
                                <input type="radio" name="pets" value="no" />
                                No
                            </label>
                        </li>
                        <li>
                            <label>
                                Hazardous conditions? ex mold, mildew, bugs, rats
                                <input type="text" />
                            </label>
                        </li>
                    </ol>
                    <button  onClick={nextStep}>Next</button>
                </>
            )}
            {selectedOption === "essential" && (
                <>
                    <h2>Essential Service Questions</h2>
                    <ol>
                        <li>
                            <label>
                                # Bedrooms:
                                <input type="number" min="0" />
                            </label>
                        </li>
                        <li>
                            <label>
                                # of Bathrooms:
                                <input type="number" min="0" />
                            </label>
                        </li>
                        <li>
                            <label>
                                # of Additional Rooms:
                                <input type="number" min="0" />
                            </label>
                        </li>

                        <li>
                            <label>
                                # of Doors/Windows to be cleaned:
                                <input type="number" min="0" />
                            </label>
                        </li>
                        <li>
                            <label>Do you have pets</label>
                            <label>
                                <input type="radio" name="pets" value="yes" />
                                Yes
                            </label>
                            <label>
                                <input type="radio" name="pets" value="no" />
                                No
                            </label>
                        </li>
                    </ol>
                    <button  onClick={nextStep}>Next</button>
                </>
            )}
        </>
    );
}// End Inquiries()





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

export default CleaningQuestions;