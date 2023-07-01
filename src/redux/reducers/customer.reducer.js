// Reducer function
const customerReducer = (state = ['SETH'], action) => {
    switch(action.type) {
        case 'SET_CUSTOMERS_LIST':
            return action.payload;
        default:
            return state;
    }
};
  
  export default customerReducer;