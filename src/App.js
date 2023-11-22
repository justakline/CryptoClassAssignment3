
import './App.css';

import ConnectButton from './ConnectButton';
import { useState } from 'react';
import AppCompanyForm from './AppCompanyForm';
import abi from './abi.json'
import { Contract, utils } from 'ethers';
import { Alert } from '@mui/material';

function App() {

//Not using useDapp

  return (
 
    <div className="App">
      
        <Alert severity='warning' >Wallet Could NOT Be Connected</Alert> 
        
         <ConnectButton   /> 
        
      
      
      <AppCompanyForm sendCompany={{}}/>

     

       <button className="Enroll-Button">Enroll</button>
       <button className="Unenroll-Button">Unenroll</button>
       <div className="SeeAttendees-Thingyyyy">
         <button className="SeeAttendees-Button">See Attendees</button>
       </div>
      
     </div>
  )
}

export default App;
