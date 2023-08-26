import "./FreelancerDetails.scss"
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../../App";
import moment from 'moment';
import { getFreelancerByIDAction, updateSelectedMenuItemAction, getFreelancerAttractionAction, getFreelancerLicensesByIDGuideAction, getFreelancerTimeAction, getFreelancerLanguageAction } from "../../../../redux/actions/AdminAction";
function FreelancerDetails(props){
    let { id_guide } = props.match.params;
    const { freelancer_info, freelancer_attraction, freelancer_licenses, freelancer_time, freelancer_language } = useSelector((state) =>state.AdminReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(updateSelectedMenuItemAction('freelancers'));
        dispatch(getFreelancerByIDAction(id_guide));
        dispatch(getFreelancerAttractionAction(id_guide));
        dispatch(getFreelancerTimeAction(id_guide));
        dispatch(getFreelancerLanguageAction(id_guide));
    }, []);
    const turnBack = async() =>{
        history.push('/freelancers-admin');
        window.location.reload();
    }
    
    //Freelancer status
    let countLicense = 0;
    if (freelancer_info && freelancer_info.freelancer_license) {
        countLicense = freelancer_info.freelancer_license.filter(license => license.status === 1).length;
    } 

    //calculate eanings
    let totalEarnings = 0;
    freelancer_time.forEach((time, timeIndex) => {
        time.guide_bookings.forEach((item, index) => {
            if (item.status === 1 || item.status === 5) {
                totalEarnings += item.price;
            }
        });
    });
    
    //calculate total bookings
    let totalBookings = 0;
    freelancer_time.forEach((time, timeIndex) => {
        time.guide_bookings.forEach((item, index) => {
            if (item.status === 1 || item.status === 5) {
                totalBookings += 1;
            }
        });
    });

    //calculate total reviews
    let totalReviews = 0;
    freelancer_time.forEach((time, timeIndex) => {
        time.guide_bookings.forEach((item, indexBooking) => {
            if (item.status === 1 || item.status === 5) {
                if (item.guide_review.review) {
                    totalReviews += 1;
                }
            }
        })
    });

    const ViewBooking = (id_tour) =>{
        let path = `/tours-admin/${id_tour}`;        
        history.push(path);
        window.location.reload();
    }
    
    const ViewLicenses = async () => {
        dispatch(getFreelancerLicensesByIDGuideAction(id_guide));
    }
    
    const languageArr = freelancer_language.map(lang => {
        if (lang.id_lang === 1) return "Vietnamese";
        if (lang.id_lang === 2) return "English";
        return null;
    }).filter(lang => lang !== null);
    const language = languageArr.join(", ");

    return (
        <div className='freelancerInfo'>
            <div className='admin-path'>
                <i className="fa-solid fa-house" style={{fontSize:"18px"}}></i>
                <span className='admin-path-name'>Users / Freelancers / {id_guide}</span>
            </div>
            <div className='profile-form'>
                <div className='profile-header'>
                    <h3 className='profile-header-name'>Freelancer Information</h3>
                </div>
                <div className="custom-form">
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>ID</label>
                            <input className="custom-form-control" id="fullname" value={freelancer_info.id_guide}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Fullname</label>
                            <input className="custom-form-control" id="fullname" value={freelancer_info.fullname}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Email</label>
                            <input className="custom-form-control" id="email-input" value={freelancer_info.email}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Phone</label>
                            <input className="custom-form-control" id="phone" value={freelancer_info.phone}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Gender</label>
                            <input className="custom-form-control" id="birthday" value={freelancer_info.gender === 1 ? "Female" : "Male"}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>IDDes</label>
                            <input className="custom-form-control" id="gender" value={freelancer_info.id_des}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Birthday</label>
                            <input className="custom-form-control" id="birthday" value={moment(freelancer_info.birthday).format('DD/MM/YYYY')}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Price per section</label>
                            <input className="custom-form-control" id="gender" value={freelancer_info.price_per_session}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Language</label>
                            <input className="custom-form-control" id="birthday" value={language}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Experience</label>
                            <input className="custom-form-control" id="gender" value={freelancer_info.experience}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Free Cancellation</label>
                            <input className="custom-form-control" id="fullname" value={freelancer_info.free_cancellation === false ? "false" : "true"}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Status</label>
                            <input className="custom-form-control" id="gender" value={countLicense >= 1 ? "Verified" : "Unverified"}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Description</label>
                            <input className="custom-form-control" id="fullname" value={freelancer_info.description}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='profile-form' style={{marginTop:"30px"}}>
                <div className='profile-header'>
                    <h3 className='profile-header-name'>Freelancer Statistics</h3>
                </div>
                <div className="custom-form">
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Earnings ($)</label>
                            <input className="custom-form-control" id="fullname" value={totalEarnings}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Number of attractions</label>
                            <input className="custom-form-control" id="fullname" value={freelancer_attraction.length} />
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Number of bookings</label>
                            <input className="custom-form-control" id="email-input" value={totalBookings}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Number of reviews</label>
                            <input className="custom-form-control" id="phone" value={totalReviews}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="booking-listing">
                <div className="booking-list">
                    <p>Freelancer's Booking Listing</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>IDBooking</th>
                                <th>IDGuideTime</th>
                                <th>IDTourist</th>
                                <th>Booking Date</th>
                                <th>Meeting point</th>
                                <th>Price</th>
                                <th>status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="booking-table">
                            {freelancer_time.map((time, timeIndex) =>
                                time.guide_bookings.map((item,index) =>(
                                    <tr key={index} >
                                        <td>{item.id_guidebooking}</td>
                                        <td>{item.id_guidetime}</td>
                                        <td>{item.id_tourist}</td>
                                        <td>{moment(item.booking_date).format('DD/MM/YYYY')}</td>
                                        <td className="meeting-cell">
                                            {item.meeting_point.length > 60 ? `${item.meeting_point.substring(0, 60)}...` : item.address}
                                        </td>
                                        <td>{item.price}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button className="btnViewBooking" onClick={() => ViewBooking(item.id_guidebooking)}>
                                                <i className="fa-solid fa-eye"></i>
                                            </button>
                                            </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="col-12 mb-3 pb-2" style={{display:"flex", justifyContent:"space-between"}}>
                <button className="btn btn-primary ml-1 mt-2" id="btnViewLicenses" onClick={() => ViewLicenses()}>View Licenses</button>
                <button className="btn btn-primary ml-1 mt-2" id="btnBack" onClick={turnBack}>Back</button>
            </div>
            <div className="license-images">
                <div className="license-column">
                    {freelancer_licenses.map((item, index) =>{
                        if(index % 3 === 0){
                            return(
                                <div className="freelancer-license-image" key={index}>
                                    <img src={item} alt={`freelancer-license-${index}`}/>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="license-column">
                    {freelancer_licenses.map((item, index) =>{
                        if(index % 3 === 1){
                            return(
                                <div className="freelancer-license-image" key={index}>
                                    <img src={item} alt={`freelancer-license-${index}`}/>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="license-column">
                    {freelancer_licenses.map((item, index) =>{
                        if(index % 3 === 2){
                            return(
                                <div className="freelancer-license-image" key={index}>
                                    <img src={item} alt={`freelancer-license-${index}`}/>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>

        </div>
    )
}

export default memo(FreelancerDetails);