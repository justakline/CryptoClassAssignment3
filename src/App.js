
import './App.css';
import {useEthers, useEtherBalance, useCall } from '@usedapp/core';
import ConnectButton from './ConnectButton';
import { useState } from 'react';
import AppCopmanyForm from './AppCompanyForm';
import { Contract } from 'ethers';
// import { Contract } from '@ethersproject/contracts'

function App() {
  const {account, deactivate,activateBrowserWallet, active  } = useEthers()
  const [isActive, printEthDetected] = useState(active)

  // const wethInterface = new utils.Interface(contractabi)
  // const wethContractAddress = '0xA243FEB70BaCF6cD77431269e68135cf470051b4'
  // // const contract = new Contract(address,interface );
  // const { enrollValue, enrollError } = useCall (/* {contract, meethodName, arguementList }*/)
  // const { unenrollValue, unenrollError } = useCall ()
  // const { addCompanyValue, addError } = useCall ()
  // const { seeAttendeesValue, seeError } = useCall ()
  
  //Will print onnly once when activated
  if(isActive && active){
    console.log("ETH detected")
    printEthDetected(false)
  }

  return (
    <div className="App">
      <ConnectButton account={account} deactivate={deactivate} activateBrowserWallet={activateBrowserWallet} printEthDetected={printEthDetected}/>
      <AppCopmanyForm/>
      <button className="Enroll-Button">Enroll</button>
      <button className="Unenroll-Button">Unenroll</button>
      <div className="SeeAttendees-Thingyyyy">
        <button className="SeeAttendees-Button">See Attendees</button>
      </div>
      
    </div>
  );
}

export default App;
