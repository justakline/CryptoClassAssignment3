
import {Alert} from '@mui/material'
import { useState } from 'react';
const AppCompanyForm = (props) =>{

  var [company, setCompany] = useState("")  
  const handleSubmit = () =>{
    props.addCompany(company)
  }

  const onChange = (newName) =>{
    console.log(newName.target.value)
    setCompany(newName.target.value)
  }


    return <div className="AddCompany-Form">

      <input type="text" name="name" value={company} onChange={onChange} placeholder="Company Name"  />
      <input type="submit" value="Add Company" onClick={handleSubmit}/>

</div>



}

export default AppCompanyForm;