const movingQuestions = (state = {}, action) => {
    switch(action.type) {
        case 'SET_MOVING_QUESTIONS':
            console.log('in movingQuestions reducer', action.payload);
            return action.payload;
        default:
            return state;    
    }
}

export default movingQuestions;