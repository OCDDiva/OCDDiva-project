const movingQuestions = (state = {}, action) => {
    switch(action.type) {
        case 'SET_MOVING_QUESTIONS':
            return action.payload;
        default:
            return state;    
    }
}

export default movingQuestions;