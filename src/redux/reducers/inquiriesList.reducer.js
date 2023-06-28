const inquiriesList = (state = [], action) => {
    switch(action.type) {
        case 'SET_INQUIRIES':
            return action.payload;
        default:
            return state;
    }
};

export default inquiriesList;