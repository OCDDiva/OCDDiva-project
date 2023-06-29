//Imports go here
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function MovingQuestions() {
    //Code goes here

    const history = useHistory();
    const dispatch = useDispatch();

    const [moving, setMoving] = useState(false);
    const [movingTo, setMovingTo] = useState('');
    const [movingFrom, setMovingFrom] = useState('');
    const [largeItems, setLargeItems] = useState('');
    const user = useSelector(store => store.user);

    const movingValue = (event) => {
        setMoving(event.target.value)
    };

    const movingToValue = (event) => {
        setMovingTo(event.target.value)
    }

    const movingFromValue = (event) => {
        setMovingFrom(event.target.value);
    }

    const largeItemsValue = (event) => {
        setLargeItems(event.target.value);
    }

    const goBack = () => { history.goBack() }

    // useEffect(() => {
    //     dispatch({ type: 'UPDATE_MOVING' });
    // })

    const nextStep = (event) => {
        event.preventDefault();
        console.log(moving, movingTo, movingFrom, largeItems, user.id)
        dispatch({ type: 'UPDATE_MOVING', payload: {
            moving: moving,
            moving_to: movingTo,
            moving_from: movingFrom,
            large_items: largeItems,
            user_id: user.id,
        } 
    })
        // history.push('/organizequestions');
    }

    console.log('Checking the value of moving', moving);
    console.log('checking the value of movingTo', movingTo);
    console.log('Checking the value of movingFrom', movingFrom);
    console.log('Checking the value of largeItems', largeItems);

    //What displays
    return (
        <>
            <h2 className="h2Headers">Are you moving?</h2>
            <br />
            <form onChange={movingValue} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input type="radio" value={true} name="Yes" /> Yes
                <input type="radio" value={false} name="No" /> No
            </form>
            {moving === "true" && (
                <div className="movingQuestions">
                    <br />
                    <br />
                    <ol>
                        <li>
                            <label>
                                <p>Where are you moving to?</p>
                                <input
                                    type="text"
                                    value={movingTo}
                                    onChange={movingToValue}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <p>Where are you moving from?</p>
                                <input
                                    type="text"
                                    value={movingFrom}
                                    onChange={movingFromValue}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <p>What large items do you have that will need to be moved?</p>
                                <input
                                    type="text"
                                    value={largeItems}
                                    onChange={largeItemsValue}
                                />
                            </label>
                        </li>
                    </ol>
                </div>
            )}
            <br />
            <br />
            <button className="btn" onClick={goBack} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> Back </button>
            <br />
            <br />
            <button className="btn" onClick={nextStep}>Next</button>
        </>

    )
} // End MovingQuestions()

export default MovingQuestions;