const inquiryDetails = (state = [], action) => {
    switch(action.type) {
        case 'SET_INQUIRY_DETAILS':
            return action.payload;
        default:
            return state;
    }
};

export default inquiryDetails;