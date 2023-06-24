import React, { useState } from 'react';

function CleaningQuestions() {
  const [selectedOption, setSelectedOption] = useState('');

  const optionChoice = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      Steve: Test
      <br />
      <br />
      <div>
        <form>
          <label>
            Select an Option:
            <select value={selectedOption} onChange={optionChoice}>
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
          <label>
            # of Bedrooms:
            <input type="number" min="0" />
          </label>
          <label>
            # of Bathrooms:
            <input type="number" min="0" />
          </label>
          <label>
            # of Additional Rooms:
            <input type="number" min="0" />
          </label>
          <label>
            # of Doors/Windows to be cleaned:
            <input type="number" min="0" />
          </label>
          <label>
            D0you have pets?
            <input type="number" min="0" />
          </label>
          <label>
            Hazardous conditions? (ex mold, mildew, bugs, rats)
            <input type="number" min="0" />
          </label>
        </>
      )}
      {selectedOption === "essential" && (
        <>
          <h2>Essential Service Questions</h2>
          {/* Add your Essential Service questions here */}
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