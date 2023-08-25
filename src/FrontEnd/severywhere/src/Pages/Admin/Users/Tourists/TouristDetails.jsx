import "./TouristDetail.scss"
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../../App";
import moment from 'moment';
import { getTouristByIDAction, updateSelectedMenuItemAction, getTouristGuideBookingAction, getTouristTourBookingAction } from "../../../../redux/actions/AdminAction";
function TouristDetails(props){
    let { id_tourist } = props.match.params;
    const { tourist_info, tourist_guide_booking, tourist_tour_booking } = useSelector((state) =>state.AdminReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(updateSelectedMenuItemAction('tourists'));
        dispatch(getTouristByIDAction(id_tourist));
        dispatch(getTouristGuideBookingAction(id_tourist));
        dispatch(getTouristTourBookingAction(id_tourist));
    }, []);
    const turnBack = async() =>{
        history.push('/tourists-admin');
        window.location.reload();
    }
    
    //calculate total bookings
    let totalTourBooking = 0;
    if(tourist_tour_booking && tourist_tour_booking.length > 0){
        totalTourBooking = tourist_tour_booking.reduce((total, booking) =>{
            if(booking.status === 1){
                return total + 1;
            }
            else{
                return total;
            }
        }, 0);
    }
    
    let totalGuideBooking = 0;
    if(tourist_guide_booking && tourist_guide_booking.length > 0){
        totalGuideBooking = tourist_guide_booking.reduce((total, booking) =>{
            if(booking.status === 1 || booking.status === 5){
                return total + 1;
            }
            else{
                return total;
            }
        }, 0);
    }
    const totalBookings = totalTourBooking + totalGuideBooking;
    
    //calculate cancelled bookings
    const totalCancelledBookings = tourist_tour_booking.length + tourist_guide_booking.length - totalBookings;
    
    //calculate paying
    let totalTourPaying = 0;
    if(tourist_tour_booking && tourist_tour_booking.length > 0){
        totalTourPaying = tourist_tour_booking.reduce((total, booking) =>{
            if(booking.status === 1){
                return total + booking.total_price;
            }
            else{
                return total;
            }
        }, 0);
    }
    
    let totalGuidePaying = 0;
    if(tourist_guide_booking && tourist_guide_booking.length > 0){
        totalGuidePaying = tourist_guide_booking.reduce((total, booking) =>{
            if(booking.status === 1 || booking.status === 5){
                return total + booking.price;
            }
            else{
                return total;
            }
        }, 0);
    }
    const totalPaying = totalTourPaying + totalGuidePaying;
    
    //calculate reviews
    let totalTourReview = 0;
    if(tourist_tour_booking && tourist_tour_booking.length > 0){
        totalTourReview = tourist_tour_booking.reduce((total, review) =>{
            if(review.tour_review.review){
                return total + 1;
            }
            else{
                return total;
            }
        }, 0);
    }
    
    let totalGuideReview = 0;
    if(tourist_guide_booking && tourist_guide_booking.length > 0){
        totalGuideReview = tourist_guide_booking.reduce((total, review) =>{
            if(review.guide_review.review){
                return total + 1;
            }
            else{
                return total;
            }
        }, 0);
    }
    const totalReview = totalTourReview + totalGuideReview;

    return (
        <div className='touristInfo'>
            <div className='admin-path'>
                <i className="fa-solid fa-house" style={{fontSize:"18px"}}></i>
                <span className='admin-path-name'>Users / Tourists / {id_tourist}</span>
            </div>
            <div className='profile-form'>
                <div className='profile-header'>
                    <h3 className='profile-header-name'>Tourist Information</h3>
                </div>
                <div className="custom-form">
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>ID</label>
                            <input className="custom-form-control" id="fullname" value={tourist_info.id_tourist}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Fullname</label>
                            <input className="custom-form-control" id="fullname" value={tourist_info.fullname}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Email</label>
                            <input className="custom-form-control" id="email-input" value={tourist_info.email}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Phone</label>
                            <input className="custom-form-control" id="phone" value={tourist_info.phone}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Birthday</label>
                            <input className="custom-form-control" id="birthday" value={moment(tourist_info.birthday).format('DD/MM/YYYY')}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Gender</label>
                            <input className="custom-form-control" id="gender" value={tourist_info.gender === 1 ? "Female" : "Male"}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='profile-form' style={{marginTop:"30px"}}>
                <div className='profile-header'>
                    <h3 className='profile-header-name'>Tourist Statistics</h3>
                </div>
                <div className="custom-form">
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Booked tour</label>
                            <input className="custom-form-control" id="fullname" value={totalBookings}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Cancelled tours</label>
                            <input className="custom-form-control" id="fullname" value={totalCancelledBookings}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Paying ($)</label>
                            <input className="custom-form-control" id="email-input" value={totalPaying}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Reviews</label>
                            <input className="custom-form-control" id="phone" value={totalReview}/>
                        </div>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary ml-1 mt-2" id="btnBack" onClick={turnBack}>Back</button>
        </div>
    )
}

export default memo(TouristDetails);