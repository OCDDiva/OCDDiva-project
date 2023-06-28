//Imports go here
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function MovingQuestions() {
    //Code goes here

    const history = useHistory();
    const dispatch = useDispatch();

    const [moving, setMoving] = useState(false);
    const [movingTo, setMovingTo] = useState('');
    const [movingOutOf, setMovingOutOf] = useState('');
    const [largeItems, setLargeItems] = useState('');

    const movingValue = (event) => {
        setMoving(event.target.value)
    };

    const goBack = () => { history.goBack()}

    const nextStep = (event) => {
        event.preventDefault();
        history.push('/organizequestions');
    }

    //What displays
    return (
        <>
            <h2 className="h2Headers">Are you moving?</h2>
            <br />
            <form onChange={movingValue} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <input type="radio" value="true" name="Yes" /> Yes
                <input type="radio" value="false" name="No" /> No
            </form>
            {moving === "true" && (
                <div className="movingQuestions">
                    <br />
                    <br />
                    <ol>
                        <li>
                            <label>
                            <p>Where are you moving into?</p>
                                <input
                                    type="text"
                                    value={movingTo}
                                    onChange={(event) => setMovingTo(event.target.value)}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <p>Where are you moving out of?</p>
                                <input 
                                    type="text"
                                    value={movingOutOf}
                                    onChange={(event) => setMovingOutOf(event.target.value)}
                                    />
                            </label>
                        </li>
                        <li>
                            <label>
                                <p>What large items do you have that will need to be moved?</p>
                                <input 
                                    type="text"
                                    value={largeItems}
                                    onChange={(event) => setLargeItems(event.target.value)}
                                />
                            </label>
                        </li>
                    </ol>
                </div>
            )}
            <br />
            <br />
            <button className="btn" onClick={goBack}> Back </button>
            <br />
            <br />
            <button className="btn" onClick={nextStep}>Next</button>
        </>

    )
} // End MovingQuestions()

export default MovingQuestions;