import "./CompanyDetails.scss"
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../../App";
import moment from 'moment';
import { getCompanyByIDAction, updateSelectedMenuItemAction, getCompanyTourAction, getCompanyLicenseAction, getCompanyLicensesByIDCompanyAction } from "../../../../redux/actions/AdminAction";
function CompanyDetails(props){
    let { id_company } = props.match.params;
    const { company_info, company_tour, company_licenses } = useSelector((state) =>state.AdminReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(updateSelectedMenuItemAction('companies'));
        dispatch(getCompanyByIDAction(id_company));
        dispatch(getCompanyTourAction(id_company));
    }, []);
    const turnBack = async() =>{
        history.push('/companies-admin');
        window.location.reload();
    }
    
    //company status
    let countLicense = 0;
    if (company_info && company_info.company_license) {
        countLicense = company_info.company_license.filter(license => license.status === 1).length;
    } 

    //calculate eanings
    let totalEarnings = 0;
    if (company_tour) {
        totalEarnings = company_tour.reduce((total, tour) => {
            const validBookings = tour.tour_bookings.filter(booking => booking.status === 1);
            if (validBookings.length > 0) {
                const bookingTotal = validBookings.reduce((sum, booking) => sum + booking.total_price, 0);
                return total + bookingTotal;
            } else {
                return total;
            }
        }, 0);
    }
    
    //calculate number of tours
    let numTour = 0;
    if (company_tour) {
        numTour = company_tour.filter(tour => tour.is_deleted === false).length;
    }
    
    //calculate total bookings
    let totalBookings = 0;
    if (company_tour) {
        totalBookings = company_tour.reduce((total, tour) => {
            const validBookings = tour.tour_bookings.filter(booking => booking.status === 1);
            return total + validBookings.length;
        }, 0);
    } 

    //calculate total reviews
    let totalReviews = 0;
    if (company_tour) {
        totalReviews = company_tour.reduce((total, tour) => {
            const validBookings = tour.tour_bookings.filter(booking => booking.status === 1);
            if (validBookings.length > 0) {
                const validBookingReviews = validBookings.reduce((sum, booking) => {
                    const bookingReview = booking.tour_review;
                    if(bookingReview && bookingReview.review){
                        return sum + 1;
                    }
                    else{
                        return sum;
                    }
                }, 0);
                return total + validBookingReviews;
            } else {
                return total;
            }
        }, 0);
    }

    const ViewTour = (id_tour) =>{
        let path = `/tours-admin/${id_tour}`;        
        history.push(path);
        window.location.reload();
    }
    
    const ViewLicenses = async () => {
        dispatch(getCompanyLicensesByIDCompanyAction(id_company));
    }
    
    return (
        <div className='companyInfo'>
            <div className='admin-path'>
                <i className="fa-solid fa-house" style={{fontSize:"18px"}}></i>
                <span className='admin-path-name'>Users / Companies / {id_company}</span>
            </div>
            <div className='profile-form'>
                <div className='profile-header'>
                    <h3 className='profile-header-name'>Company Information</h3>
                </div>
                <div className="custom-form">
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>ID</label>
                            <input className="custom-form-control" id="fullname" value={company_info.id_company}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Name</label>
                            <input className="custom-form-control" id="fullname" value={company_info.name}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Email</label>
                            <input className="custom-form-control" id="email-input" value={company_info.email}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Phone</label>
                            <input className="custom-form-control" id="phone" value={company_info.phone}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Website</label>
                            <input className="custom-form-control" id="birthday" value={company_info.website}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Status</label>
                            <input className="custom-form-control" id="gender" value={countLicense >= 1 ? "Verified" : "Unverified"}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Address</label>
                            <input className="custom-form-control" id="fullname" value={company_info.address}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='profile-form' style={{marginTop:"30px"}}>
                <div className='profile-header'>
                    <h3 className='profile-header-name'>Company Statistics</h3>
                </div>
                <div className="custom-form">
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Earnings ($)</label>
                            <input className="custom-form-control" id="fullname" value={totalEarnings}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Number of tours</label>
                            <input className="custom-form-control" id="fullname" value={numTour} />
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

            <div className="tour-listing">
                <div className="tour-list">
                    <p>Company's Tour Listing</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>IDTour</th>
                                <th>Name</th>
                                <th>IDDes</th>
                                <th>IDCat</th>
                                <th>MaxTourist</th>
                                <th>Price</th>
                                <th>is_deleted</th>
                                <th>Free cancellation</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="tour-table">
                            {company_tour.map((item, index) =>{
                                return(
                                    <tr key={index} >
                                        <td>{item.id_tour}</td>
                                        <td>{item.name}</td>
                                        <td>{item.id_des}</td>
                                        <td>{item.id_category}</td>
                                        <td>{item.num_max}</td>
                                        <td>{item.price}</td>
                                        <td>{item.is_deleted === false ? "false" : "true"}</td>
                                        <td>{item.free_cancellation === false ? "false" : "true"}</td>
                                        <td>
                                            <button className="btnViewTour" onClick={() => ViewTour(item.id_tour)}>
                                                <i className="fa-solid fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
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
                    {company_licenses.map((item, index) =>{
                        if(index % 3 === 0){
                            return(
                                <div className="company-license-image" key={index}>
                                    <img src={item} alt={`company-license-${index}`}/>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="license-column">
                    {company_licenses.map((item, index) =>{
                        if(index % 3 === 1){
                            return(
                                <div className="company-license-image" key={index}>
                                    <img src={item} alt={`company-license-${index}`}/>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="license-column">
                    {company_licenses.map((item, index) =>{
                        if(index % 3 === 2){
                            return(
                                <div className="company-license-image" key={index}>
                                    <img src={item} alt={`company-license-${index}`}/>
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

export default memo(CompanyDetails);