import placeholder from '../../placeholder-image.png'
import "./TourCompany.scss";
import HeaderCompany from '../../Components/Header/HeaderCompany';
import NavbarCompany from '../../Components/Navbar/NavbarCompany';
import {ButtonEditFreelancer, ButtonDeleteFreelancer, ButtonViewFreelancer, ButtonUploadFreelancer} from '../../Components/Button/ButtonFreelancer'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {getCompanyInfo, getCompanyLicense, getCompanyTour} from '../../redux/actions/CompanyAction'

export default function TourCompany(){ 
    const dispatch = useDispatch() 
    
    const { user_login} = useSelector(state => state.BasicReducer)
    const { company_tour, company_info} = useSelector(state => state.CompanyReducer)

    const importAvatar = (filename) => {
        if (typeof filename === 'undefined' || filename === "")
          return null
        const path = require(`../../../../../BackEnd/public/company_avatar/${filename}`)
        return path
    }

    const importPhoto= (filename) => {
        if (typeof filename === 'undefined' || filename === "")
          return null
        const path = require(`../../../../../BackEnd/public/tour/${filename}`)
        return path
    }

    useEffect(() => {
        dispatch(getCompanyInfo(user_login.email))
    },[] )

    useEffect(() => {
        if (company_info?.id_company) {
            dispatch(getCompanyLicense(company_info.id_company))
            dispatch(getCompanyTour(company_info.id_company))
        }
    }, [company_info.id_company])

    const [tours, setTours] = useState([])

    useEffect(() => {
        if (tours.length === 0)
            setTours(company_tour)
    },[company_info])

    const [isCreate, setIsCreate] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isChange, setIsChange] = useState(false)


    console.log(company_tour)

    const verified= true
    const tourss = [1,2,4,5,6,7,8,9,10,11,12,13,14,15]

    return (
        <div className = "tour-company">
            <HeaderCompany/>
            <NavbarCompany src = {importAvatar(company_info.avatar) || placeholder} name ={company_info?.name?.toUpperCase()} flag2 = "focus"/>
            {
                verified &&!isCreate && !isAdd && (
                <div className = "main-managetour ver2">
                <div className = "create-tour">
                    <i className="fa-solid fa-circle-plus"></i>
                    <p>Create a tour</p>
                </div>
                {
                    tourss.map(tour =>{
                        return (
                            <div className = "tour">
                                <div className = "tour-hover">
                                    <ButtonEditFreelancer type = "button"/>
                                    <ButtonDeleteFreelancer/>
                                    <ButtonViewFreelancer/>
                                </div>
                                <img src = {importPhoto(tour.photo_path) || placeholder}></img>
                                {/* <p className = "name">{tour.name}</p> */}
                                {/* <p className = "des">{tour.id_des}</p>
                                <p className = "price">{tour.price.toFixed(2)}$</p>
                                <p className = "duration">{tour.duration}</p>
                                <p className = "tourist">{tour.num_max}</p> */}

                                <p className = "name">Halong Bay Deluxe Day Tour</p>
                                <p className = "des">Ho Chi Minh City</p>
                                <p className = "price">52.00$</p>
                                <p className = "duration">1 day</p>
                                <p className = "num-tourist">20</p>
                            </div>
                        )
                    })
                }
                </div>
            )}
            {
                // verified && (isAdd || isUpdate) && (

                // )
            }
            {
                verified && isAdd && (
                    <ButtonUploadFreelancer className="button-save"/>
                )
            }
            {
                verified && isUpdate && (
                    <ButtonUploadFreelancer className="button-upload"/>
                )
            }

            {
                !verified && (
                <div className = "main-managetour">
                    <p className = "welcome">Welcome to Manage Tour</p>
                    <p>You have to upload legitimate tourism licenses to unlock this section</p>
                </div>
            )} 
        </div>
    )
}