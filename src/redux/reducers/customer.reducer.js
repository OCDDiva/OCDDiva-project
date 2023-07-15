// Reducer function
const customerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CUSTOMERS_LIST':
            return action.payload;
        case 'SET_CUSTOMERS_DETAILS':
            return action.payload;
        default:
            return state;
    }
};



export default customerReducer;