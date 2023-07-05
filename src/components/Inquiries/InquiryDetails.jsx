//Imports go here
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function InquiryDetails() {
    //Code goes here
    const dispatch = useDispatch();
    const history = useHistory();
    const inquiryDetails = useSelector(store => store.inquiryDetails)
    const { inquiriesId } = useParams();

    useEffect(() => {
        dispatch({ type: 'FETCH_INQUIRY_DETAILS', payload: inquiriesId });
    }, [inquiriesId]);

    console.log(inquiriesId);

    const returnToInquiries = (event) => {
        history.push('/inquiries')
    }

    //What displays
    // TODO DISPLAY ONLY THE CUSTOMER NAME, THE SERVICES REQUESTED, DATE RECEIVED, COMPLETEION STATUS, NOTES, DETAILS BUTTON
    return (
        <main>
                <div>
                    <h1>{inquiryDetails.firstName} {inquiryDetails.lastName}</h1>
                    {/* gonna work on a function that only displays specific services but not sure I will get to it tonight */}
                    <h2> 
                        Essential Clean: {JSON.stringify(inquiryDetails.EssentialClean)}, 
                        Ultimate Clean: {JSON.stringify(inquiryDetails.UltimateClean)},
                        Moving: {JSON.stringify(inquiryDetails.Moving)},
                        Organizing: {JSON.stringify(inquiryDetails.Organizing)},
                        Decluttering: {JSON.stringify(inquiryDetails.Declutter)} 
                    </h2>
                    <h3> {inquiryDetails.completion_status}</h3>
                    {/* TODO I know the priority is bugged, will work on a fix */}
                    <h4> {inquiryDetails.priority}</h4>
                    <button onClick={returnToInquiries}>Inquiries List</button>
                </div>
        </main>


    )
} // End Inquiries()
    
    export default InquiryDetails;