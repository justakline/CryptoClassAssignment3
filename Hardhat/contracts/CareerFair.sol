pragma solidity ^0.8.0;

contract CareerFair{

    string[] companies;
    address []  students;
    address owner;
    modifier onlyOwner {
        require (msg.sender == owner, "Only the owner can call this function");
        _;
    }


    
    constructor() {
        owner = msg.sender;
        students = new address[](0);
        companies = new string[](0);
        add("Amazon");
        add("Google");
        add("Apple");
        add("Microsoft");
        add("Meta");
        add("Gemini");
        add("SecureEd");
    }

     function enroll() public{
        //The student must not already be registered
        for(uint i = 0; i < students.length; i++){
            if(students[i]== msg.sender){
                revert("You are already registered, you can't register again");
            }
        }
        students.push(msg.sender);
    }

     function unenroll() public{
        //The student must already be enrolled
        for(uint i = 0; i < students.length; i++){
            if(students[i] == msg.sender){ 
                //Swap and then pop
                students[i] = students[students.length -1];
                students.pop();
                return;
            }
        }
        //If we have not found the student then revert
        revert("You can only unroll if you are registered which you are not");
    } 


     function add(string memory companyName) public onlyOwner {
        //Check if it already exists, if it does revert, else add it in
        //Can not be the default value, use keccak to compare strings
        require (!areEqualStrings(companyName, ""), "You must name it something");
        for(uint i =0; i < companies.length; i++){
            if ( areEqualStrings (companies[i], companyName)) {
                revert("The company already exists here. Add a different one");
            }
        }
        companies.push(companyName);
    }

     function getAttendees() public view returns (address []memory){
        return students;
    }
     function getCompanies() public view returns (string []memory){
        return companies;
    }

    function areEqualStrings(string memory s1, string memory s2) internal returns (bool){
        return (keccak256( abi.encodePacked(s1)) == keccak256( abi.encodePacked(s2)));
    }


}