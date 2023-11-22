
import {Alert} from '@mui/material'
const ConnectButton = (props) =>{


    //If there is no account 
   if(!props.account){

        console.log("No eth wallet detected")
       return <div>
            <button className="Connect-Button" onClick={  ()=> {
                  
                    {}}}
                >Connect Wallet
            </button>
           
        </div>
    }else{
       console.log("Eth wallet detected")
    return <div></div>
    }



}

export default ConnectButton;