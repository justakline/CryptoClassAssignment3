
import {Alert} from '@mui/material'
import { useState } from 'react';
const AppCompanyForm = (props) =>{

  var {company, setCompany} = useState("")  
  const handleSubmit = (newName) =>{
    console.log("submit")
  }


    return <div className="AddCompany-Form">
   <form onSubmit={() =>{}}>
      <input type="text" name="name" placeholder="Company Name"  />
      <input type="submit" value="Add Company" onClick={console.log()}/>
 </form>
</div>



}

export default AppCompanyForm;