//Imports go here
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function Inquiries(){
//Code goes here
    const dispatch = useDispatch();
    const history = useHistory();
    const inquiries = useSelector(store => store.inquiriesList)
    const { inquiriesId } = useParams();

    const navToInquiryDetails = (event) => {
        history.push('/inquiries/:id');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_INQUIRIES'});
    })

    //What displays
    return (
        <main>
                    {inquiries.length === 0 ? (
            <div>
            <p>Everett says yo waddup</p>
            </div>
        ) : (
            <div>
                {inquiries.map(inquiry => {
                    return (
                        <div key={inquiry.id}>
                            <h1>{inquiry.services_id}</h1>
                        
                        </div>
                    )
                })}            
            </div>
        )}
        </main>


    )
} // End Inquiries()

export default Inquiries;