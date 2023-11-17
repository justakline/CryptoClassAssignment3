
import {Alert} from '@mui/material'
const AppCopmanyForm = (props) =>{

    return <div className="AddCompany-Form">
    <form>
      <input type="text" name="name" placeholder="Company Name"  />
      <input type="submit" value="Add Company" />
  </form>
</div>



}

export default AppCopmanyForm;