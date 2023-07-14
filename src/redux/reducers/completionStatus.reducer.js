const completionStatus = (state = [], action) => {
    switch(action.type) {
        case 'SET_COMPLETION_STATUS':
            return action.payload;
        default:
            return state;
    }
};

export default completionStatus;