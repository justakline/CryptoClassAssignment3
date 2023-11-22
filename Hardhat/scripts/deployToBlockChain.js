const hre = require("hardhat");
const { expect } = require("chai");


const main = async () => {

    try{

        const[owner] = await hre.ethers.getSigners();
        const contractFactory = await hre.ethers.getContractFactory("CareerFair");
        const contract = await contractFactory.deploy()
        const contractAddress = await contract.getAddress()
        console.log(`Owner Address: ${owner}`)
        console.log(`CareerFair Address: ${contractAddress}`)
        
    } catch(error){
            console.log("Error!!! " + error)
            // console.log("Error!!! " + error.message)
    }
}

const runMain = async () => {
    main().catch(error =>{ console.error("Error in runMain:", error)})
  }
      
  
  runMain();