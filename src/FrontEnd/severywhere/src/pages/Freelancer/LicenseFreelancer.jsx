import placeholder from '../../placeholder-image.png'
import './LicenseFreelancer.scss';
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import {ButtonUploadFreelancer} from '../../Components/Button/ButtonFreelancer'
import {useState, } from 'react'
import {useSelector} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'

export default function LicenseFreelancer(){
    const {guide_license_by_id_guide, guide_info} = useSelector(state => state.FreelancerReducer)
    const location = useLocation()
    window.history.replaceState(null, null, location.pathname);

    const [license, setLicense] = useState(location.state.license)
    const [isDelete, setIsDelete] = useState(license.length < guide_license_by_id_guide.length)
    const handleDeleteButton = (file_path) => {
      let tmp = [...license]
      tmp = tmp.filter(license => license.file_path !== file_path)
      setLicense(tmp)
      setIsDelete(true)
    }

    const setPreviewLicense = (file) =>{
      if (file){
        return URL.createObjectURL(file);
      }
      return placeholder
    }

    return (
    <div className="license-freelancer">
      <HeaderFreelancer/>
      <NavbarFreelancer src = {placeholder} fullname = {guide_info.fullname.toUpperCase()} flag1 = "focus"/>
      <Link to={{ pathname: "/profile-freelancer", state: { license, isDelete }}}>
        <ButtonUploadFreelancer className="button-upload" title = "BACK" />
      </Link>
      <div className = "main-license">
        {
          license.map((license) =>{
            return (
              <div key = {license.file_path} className = "license">
                <img src = {setPreviewLicense(license.file)} alt = "license-preview"/>
                <div className = "license-info">
                  <p>{license.file_path}</p>
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