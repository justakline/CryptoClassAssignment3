// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { expect } = require("chai");


const main = async () => {


  const[owner, student1, student2] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("CareerFair");
  const contract = await contractFactory.deploy()
  console.log(`Address of owner is: ${owner}`)

  console.log("Testing adding a company that already exists");
try {

    await contract.add("Amazon");
} catch (exception) {
    console.log("Caught an error:", exception.message);

}
console.log("");
console.log("Testing adding a company with no name");
try {

    await contract.add("");
} catch (exception) {
    console.log("Caught an error:", exception.message);

}
console.log("");

console.log("Testing adding a company named GM");
try {
  console.log("before")
      console.log(await contract.getCompanies())
      console.log("after")
    await contract.add("GM");
    console.log(await contract.getCompanies())
} catch (exception) {
    console.log("Caught an error:", exception.message);

}
console.log("");


console.log("Testing adding a company named  Netflix by a non-owner");
try {
  console.log("before")
      console.log(await contract.getCompanies())
    await contract.connect(student1).add("Netflix");
    console.log("after")
    console.log(await contract.getCompanies())
} catch (exception) {
    console.log("Caught an error:", exception.message);

}
console.log("");


console.log("Testing enrollinag a student1");
try {
     console.log("before")
      console.log(await contract.getAttendees())
    await contract.connect(student1).enroll();
    console.log("after")
    console.log(await contract.getAttendees())
} catch (exception) {
    console.log("Caught an error:", exception.message);

}
console.log("");

console.log("Testing enrollinag student1 again");
try {
     console.log("before")
      console.log(await contract.getAttendees())
    await contract.connect(student1).enroll();
    console.log("after")
    console.log(await contract.getAttendees())
} catch (exception) {
    console.log("Caught an error:", exception.message);

}
console.log("");

console.log("Testing unenrollinag a student1");
try {
     console.log("before")
      console.log(await contract.getAttendees())
    await contract.connect(student1).unenroll();
    console.log("after")
    console.log(await contract.getAttendees())
} catch (exception) {
    console.log("Caught an error:", exception.message);

}
console.log("");
 
console.log("Testing unenrollinag a student1 again");
try {
     console.log("before")
      console.log(await contract.getAttendees())
    await contract.connect(student1).unenroll();
    console.log("after")
    console.log(await contract.getAttendees())
} catch (exception) {
    console.log("Caught an error:", exception.message);

}
console.log("");
 
  

  

  

  
}

const runMain = async () => {
  main()
}
    

runMain();