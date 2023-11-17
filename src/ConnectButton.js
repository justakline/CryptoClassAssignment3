
import {Alert} from '@mui/material'
const ConnectButton = (props) =>{

    if(props.account){
        // return<text>Helelo</text>
        console.log("No ETH wallet detected")
        return <Alert severity='warning' >Wallet Could NOT Be Connected</Alert>
    }else{
        // console.log("ETH detected")
    return <button className="Connect-Button" onClick={()=> 
        {props.activateBrowserWallet() 
            props.printEthDetected(true)}}
         >Connect Wallet</button>
    }



}

export default ConnectButton;