import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Customers() {
    const dispatch = useDispatch();
    const customers = useSelector(store => store.customerReducer)
    const history = useHistory();


    const viewCustomerDetails = (customerId) => {
        history.push(`/forms/${customerId}`);
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_CUSTOMERS' });
    }, []);

    console.log(customers[0])
    //What displays
    return (
        <div>
            <h2>Customers</h2>
            
            {customers.map((customer) => (
                <div key={customer.id}>
                    <h3>
                        {customer.firstName} {customer.lastName}
                    </h3>
                    <p>Date of Service: {customer.service_on}</p>
                    <p>Name of Service: {customer.services_id}</p>
                    <p>Completion Status: {customer.completion_status}</p>
                    <button onClick={() => viewCustomerDetails(customer.id)}>
                    Details 
                    </button>
                </div>
                ))}
        </div>
    );
} // End Customers()

export default Customers;