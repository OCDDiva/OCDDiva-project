//Imports go here
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function MovingQuestions() {
    //Code goes here

    const history = useHistory();
    const dispatch = useDispatch();

    const [moving, setMoving] = useState(false);

    const movingValue = (event) => {
        setMoving(event.target.value)
    };

    const nextStep = (event) => {
        event.preventDefault();
        history.push('/organizequestions');
    }

    //What displays
    return (
        <>
        <h2>Are you moving?</h2>
        <br />
        <form onChange={movingValue}>
            <input type="radio" value="true" name="Yes" /> Yes
            <input type="radio" value="false" name="No" /> No
        </form>
        <div className="movingQuestions">
            {moving === "true" && (
                <>
                <h3>Moving Questions</h3>
                
                </>
            )}
        </div>
        <br />
        <br />
        <button className="btn" onClick={nextStep}>Next</button>
        </>

    )
} // End MovingQuestions()

export default MovingQuestions;