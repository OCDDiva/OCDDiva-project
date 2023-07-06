import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Button, TextField, Box } from '@mui/material';

function CustomerDetails() {
  const { customerId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const customer = useSelector(store => store.customerReducer.find(cust => cust.id === customerId));
//   const [form, setForm] = useState(customer.form); // Assuming form data is stored in `form` property

//   const handleInputChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

const handleAdd = () => {
    // Handle edit logic here
    // For example, dispatch an action to update the form data in the Redux store
    // dispatch({ type: 'UPDATE_FORM', payload: { customerId, form } });
    // You may also want to handle any validation or error cases
    // and display success or error messages to the user
    // After editing, you can redirect the user to the previous page or a different route
    history.goBack(); // Redirects to the previous page
  };

  const handleEdit = () => {
    // Handle edit logic here
    // For example, dispatch an action to update the form data in the Redux store
    // dispatch({ type: 'UPDATE_FORM', payload: { customerId, form } });
    // You may also want to handle any validation or error cases
    // and display success or error messages to the user
    // After editing, you can redirect the user to the previous page or a different route
    history.goBack(); // Redirects to the previous page
  };

  const handleSave = () => {
    // Handle edit logic here
    // For example, dispatch an action to update the form data in the Redux store
    // dispatch({ type: 'UPDATE_FORM', payload: { customerId, form } });
    // You may also want to handle any validation or error cases
    // and display success or error messages to the user
    // After editing, you can redirect the user to the previous page or a different route
    history.goBack(); // Redirects to the previous page
  };

  const handleDelete = () => {
    // Handle delete logic here
    // For example, dispatch an action to delete the customer from the Redux store
    // dispatch({ type: 'DELETE_CUSTOMER', payload: customerId });
    // You may also want to handle any validation or error cases
    // and display success or error messages to the user
    // After deleting, you can redirect the user to the previous page or a different route
    history.goBack(); // Redirects to the previous page
  };



  useEffect(() => {
    dispatch({ type: 'FETCH_CUSTOMERS' });
  }, [dispatch]);

  return (
    <React.Fragment>
        <Typography variant="h4" style={{ textAlign: "center" }}>Customer Details</Typography>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" color="error" onClick={() => history.goBack()}>
        Back
      </Button>
      </div>
      <br />
      <Box border={1} p={2} maxWidth={600} style={{ margin: '0 auto' }}>
    <Container>
      <Typography variant="h5" style={{ textAlign: "center" }}>
        Customer Name: {customer?.firstName} {customer?.lastName}
      </Typography>
      <Typography variant="h5" style={{ textAlign: "center" }}>Date of Service: {customer?.service_on}</Typography>
      <Typography variant="h5" style={{ textAlign: "center" }}>Type of service: {customer?.services_id}</Typography>
      <Typography variant="h5" style={{ textAlign: "center" }}>Completion status: {customer?.completion_status}</Typography>
      <Typography variant="h5" style={{ textAlign: "center" }}>Notes: {customer?.notes}</Typography>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="outlined" color="error" onClick={handleAdd} >
        Add Note
      </Button>
      <Button variant="outlined" color="error" onClick={handleEdit} >
        Edit Note
      </Button>
      <Button variant="outlined" color="error" onClick={handleDelete}>
        Delete
      </Button>
      </div>
      <br />
      <Typography variant="h4" style={{ textAlign: "center" }}>Customer's Form(s):</Typography>
      <form>
        <TextField
          name="firstName"
          label="First Name"
          value={customer?.firstName || ''}
        //   onChange={handleInputChange}
          fullWidth
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={customer?.lastName || ''}
        //   onChange={handleInputChange}
          fullWidth
        />
        {/* Add more form fields based on your form structure */}
      </form>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <Button variant="outlined" color="error" onClick={handleEdit} >
        Edit 
      </Button>
      <Button variant="outlined" color="error" onClick={handleSave}>
        Save
      </Button>
      <Button variant="outlined" color="error" onClick={handleDelete}>
        Delete
      </Button>
      </div>
    </Container>
    </Box>
    </React.Fragment>
  );
}

export default CustomerDetails;
