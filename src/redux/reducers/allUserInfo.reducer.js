const allUserDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ALL_USER_INFO':
            return action.payload;
        default: 
            return state;
    }
};

export default allUserDetails;