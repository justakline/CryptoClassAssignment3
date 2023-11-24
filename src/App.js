
import './App.css';

import ConnectButton from './ConnectButton';
import { useState, useEffect } from 'react';
import AppCompanyForm from './AppCompanyForm';
import abi from './abi.json'
import { Contract, utils } from 'ethers';
import { Alert } from '@mui/material';
import { ethers } from 'ethers';
import Alerts from './Alerts';

function App() {

// const contractWithSigner = contract.connect(signer);


const [wallets, setWallets]= useState(null)
const [walletError, setWalletError] = useState(false)
const [addCompanyError, setAddCompanyError] = useState(false)
const [enrollError, setEnrollError] = useState(false)
const [unenrollError, setUnenrollError] = useState(false)
const [attendeesZero, setAttendeesZero] = useState(false)
const [attendees, setAttendees] = useState ([])


const connectWallet = ()=> {
  

//Phantom wallet has very wonky errors... In a try catch, if there is an error, it does not do the catch, so I am not dealing with it
//But if you only use metamask then it works perfectly... like either you need it only installed, or if you have both installed,
//then make sure when phantom wallet pops up and says to choose either metamask or phantom wallet automatically, use metamask
  if(window.ethereum && window.ethereum.isMetaMask){
      window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(wallets => {
 
        console.log(wallets)
        setWalletError(false)
        setWallets(wallets)
      })
      .catch(error => {
        console.error('Error fetching accounts from metamask:', error);
        setWalletError(true)
        // Handle the error
      });
  }else{
    console.error(`Metamask Not Installed`)
  }
}

//If we dissconect then we no longer have wallets and need to reupdate the ui
const checkAccounts = async() => {
  try {
    
    const accounts = window.ethereum._state.accounts
    if (accounts.length === 0) {
      console.log("0 accounts")
      setWallets(null)
    }

  }catch(error){
    // console.log("error in checking accounts " + error)
    // setWallets(null)
  }

}



//Check accounts connected every second and if they have changed
useEffect(() => {
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask.");
    } else {
      console.log("Connected account:", accounts[0]);
    }
  };

  if (window.ethereum) {
    window.ethereum.on('accountsChanged', handleAccountsChanged);
  }
  
  const intervalId = setInterval(checkAccounts, 1000);
  
  return () => clearInterval(intervalId);
}, []);

const getCompanies = async()=>{
  try {
     const {ethereum} = window
  if(ethereum){
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract("0x9025c5E4341c4eF748763027c8b3EFf1C1503188", abi.abi, provider);
    const signer = provider.getSigner();

   
   const companies = await contract.functions.getCompanies()
   console.log(companies[0])
  }else{
    console.log("Eth window no exist")
  }
  } catch (error) {
    
  }
 
}


const getAttendees = async()=>{
  try {
     const {ethereum} = window
  if(ethereum){
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract("0x9025c5E4341c4eF748763027c8b3EFf1C1503188", abi.abi, provider);
    const signer = provider.getSigner();

   
   const attendees = await contract.functions.getAttendees()
   console.log(attendees[0])
   setAttendees(attendees[0])
   console.log("gere")
   if(attendees[0].length == 0){
     console.log("true")
     setAttendeesZero(true)
     
    } else{
      console.log("false")
      setAttendeesZero(false)
    }
  }else{
    console.log("Eth window no exist")
  }
  } catch (error) {
    
  }
 
}

const enroll = async() => {
  try {
     const {ethereum} = window
  if(ethereum){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0x9025c5E4341c4eF748763027c8b3EFf1C1503188", abi.abi, signer);
   

   const enrollTxn = await contract.functions.enroll()
   await enrollTxn.wait()

   setEnrollError(false)
  }else{
    console.log("Eth window no exist")
  }
  } catch (error) {
    setEnrollError(true)
  }
 
}
const unenroll = async() => {
  try {
     const {ethereum} = window
  if(ethereum){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0x9025c5E4341c4eF748763027c8b3EFf1C1503188", abi.abi, signer);
   
   

   const unenrollTxn = await contract.functions.unenroll()
   await unenrollTxn.wait()
  

   setUnenrollError(false)
  }else{
    console.log("Eth window no exist")
  }
  } catch (error) {
    setUnenrollError(true)
  }
 
}
const addCompany = async(company) => {
  console.log("adding")
  try {
     const {ethereum} = window
  if(ethereum){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0x9025c5E4341c4eF748763027c8b3EFf1C1503188", abi.abi, signer);
   
   
  getCompanies()
   const addCompanyTxn = await contract.functions.add(company)
   await addCompanyTxn.wait()
   console.log("after")
   gettCompanies()
   setAddCompanyError(false)

 
  }else{
    console.log("Eth window no exist")
  }
  } catch (error) {
    console.log(error)
    console.log("cant add")
    setAddCompanyError(true)
  }
 
}



  return (
 
    <div className="App">
       <Alerts walletError={walletError} addCompanyError={addCompanyError} enrollError={enrollError} unenrollError={unenrollError}/>
        {
          wallets?
            <div> </div>
          :
            <ConnectButton connectWallet={connectWallet} />
        }
    
      <AppCompanyForm addCompany={addCompany}/>

     

       <button className="Enroll-Button" onClick={enroll}>Enroll</button>
       <button className="Unenroll-Button" onClick={unenroll}>Unenroll</button>
       <div className="SeeAttendees-Thingyyyy">
         <button className="SeeAttendees-Button" onClick={getAttendees}>See Attendees</button>
         {
         !attendeesZero?
            attendees.map((item, index) => {
              return <div key={index}> {item}</div>
              })
          :(

            <div>No one is enrolled</div>
            )
        
        
        }

        </div>
       
      
     </div>
  )
}

export default App;
