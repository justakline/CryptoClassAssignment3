import { Alert } from '@mui/material';
import { useState } from 'react';


const Alerts = (props) => {
 
    return(
        

        <div>

        {props.walletError?<Alert severity='warning' >Wallet Could NOT Be Connected</Alert>: <div></div>}
        {props.addCompanyError? <Alert severity="error" >Only the owner can add a company and it must not be a duplicate</Alert> : <div></div>}
        {props.enrollError?<Alert severity='error' >You are already enrolled in the career fair</Alert>: <div></div>}
        {props.unenrollError?<Alert severity='error' >You are not enrolled in the career fair</Alert>: <div></div>}
        </div>
        
        
        ) 




}

export default Alerts