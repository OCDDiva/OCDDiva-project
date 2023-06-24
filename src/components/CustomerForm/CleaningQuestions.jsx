//Imports go here
import React, { useState } from 'react';

function CleaningQuestions() {
    //Code goes here
    const [selectedOption, setSelectedOption] = useState('');

    const optionChoice = (e) => {
        setSelectionOption(e.target.value);
    }

    //What displays
    return (
        <>
        Steve: Test 
        <br />
        <br />
        <form>
            <label>
                Select an Option:
                <select value={selectedOption} onChange={optionChoice}>
                    <option value="">Please select</option>

                </select>
            </label>
        </form>
        </>

    )
} // End Inquiries()

export default CleaningQuestions;