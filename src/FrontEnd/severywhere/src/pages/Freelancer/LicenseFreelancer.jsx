import logo from '../../logo.png';
import './LicenseFreelancer.scss';
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import ButtonUploadFreelancer from '../../Components/Button/ButtonUploadFreelancer'
import {useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

export default function LicenseFreelancer(){
    const {guide_license_by_id_guide, tour_guide_by_id_guide} = useSelector(state => state.FreelancerReducer)

    const [license, setLicense] = useState(guide_license_by_id_guide)
    const [isDelete, setIsDelete] = useState(false)
    const handleDeleteButton = (file_path) => {
      let tmp = [...license]
      tmp = tmp.filter(license => license.file_path !== file_path)
      setLicense(tmp)
      setIsDelete(true)
    }
    // console.log(license)

    return (
    <div className="license-freelancer">
      <HeaderFreelancer/>
      <NavbarFreelancer img = {logo} fullname = {tour_guide_by_id_guide.fullname.toUpperCase()} flag1 = "focus"/>
      <Link to={{ pathname: "/profile-freelancer", state: { license, isDelete }}}>
        <ButtonUploadFreelancer className="button-upload" title = "BACK" />
      </Link>
      <div className = "main-license">
        {
          license.map((license) =>{
            return (
              <div key = {license.file_path} className = "license">
                <img src = {logo} alt = "license-preview"/>
                <div className = "license-info">
                  <p>Name license</p>
                  {license.status === 1 && <p className = "gray">Pending</p>}
                  {license.status === 2 && <p>Verified</p>}
                  {license.status === 3 && <p className = "red">Rejected</p>}
                </div>
                <ButtonUploadFreelancer className="button-upload" title = "DELETE" onClick = {() => handleDeleteButton(license.file_path)}/>
              </div>
            )
          })
        }
      </div>
    </div>
    )
}