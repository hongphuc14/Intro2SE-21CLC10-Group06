import placeholder from '../../placeholder-image.png'
import './LicenseCompany.scss';
import HeaderCompany from '../../Components/Header/HeaderCompany';
import NavbarCompany from '../../Components/Navbar/NavbarCompany';
import {ButtonUploadFreelancer} from '../../Components/Button/ButtonFreelancer'
import {useState, } from 'react'
import {useSelector} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'

export default function LicenseCompany(){
  const {company_license, company_info} = useSelector(state => state.CompanyReducer)
  const location = useLocation()
  // window.history.replaceState(null, null, location.pathname);
  
  const importAvatar = (filename) => {
    if (typeof filename === 'undefined' || filename === "")
      return null
    try{
      const path = require(`../../../../../BackEnd/public/company_avatar/${filename}`)
      return path
    }
    catch(err){
      return null
    }
    
  }

  const importLicense = (filename) => {
    if (typeof filename === 'undefined' || filename === "")
      return 
    try{
      const path = require(`../../../../../BackEnd/public/company_license/${filename}`)
      return path
    }
    catch(err){
      return null
    } 
    
  }
  
  const {info, isChange, pre} = location.state || {}
  // console.log(pre)
  const [license, setLicense] = useState(location.state.license)
  const [isDelete, setIsDelete] = useState(license.length < company_license.length)
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
    return null
  }

  return (
  <div className="license-company">
    <HeaderCompany/>
    <NavbarCompany src = {importAvatar(company_info.avatar) || placeholder} name = {company_info?.name.toUpperCase()} flag1 = "focus"/>
    <Link to={{ pathname: "/profile-company", state: { license, isDelete, info, isChange, pre }}}>
      <ButtonUploadFreelancer className="button-upload" title = "BACK" />
    </Link>
    <div className = "main-license">
      {
        license.map((license) =>{
          return (
            <div key = {license.file_path} className = "license">
              <img src = { setPreviewLicense(license.file) || importLicense(license.file_path) || placeholder} alt = "license-preview"/>
              <div className = "license-info">
                <p>{license.file_path.substring(license.file_path.indexOf('_') + 1,license.file_path.lastIndexOf('.'))}</p>
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