import "./BookingTourDetails.scss"
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../App";
import moment from 'moment';
import { updateSelectedMenuItemAction, getTourBookingAction } from "../../../redux/actions/AdminAction";
function BookingGuideDetails(props){
    let { id_tour } = props.match.params;
    const { tour_booking } = useSelector((state) =>state.AdminReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(updateSelectedMenuItemAction('bookings'));
        dispatch(getTourBookingAction(id_tour));
    }, []);
    
    const turnBack = async() =>{
        history.push('/bookings-admin');
        window.location.reload();
    }
    
    return (
        <div className='tourInfo'>
            <div className='admin-path'>
                <i className="fa-solid fa-house" style={{fontSize:"18px"}}></i>
                <span className='admin-path-name'>Bookings / Companies / {id_tour}</span>
            </div>
            <div className='profile-form'>
                <div className='profile-header'>
                    <h3 className='profile-header-name'>Booking Tour Information</h3>
                </div>
                <div className="custom-form">
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>IDBooking</label>
                            <input className="custom-form-control" id="fullname" value={tour_booking.id_tour_booking}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>IDTourist</label>
                            <input className="custom-form-control" id="fullname" value={tour_booking.id_tourist}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>IDTour</label>
                            <input className="custom-form-control" id="email-input" value={tour_booking.id_tour}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Rating</label>
                            <input className="custom-form-control" id="phone" value={tour_booking.tour_review &&
                                    tour_booking.tour_review.rating
                                        ? tour_booking.tour_review.rating
                                        : ''}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Start Date</label>
                            <input className="custom-form-control" id="birthday" value={moment(tour_booking.start_date).format('DD/MM/YYYY')}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>End date</label>
                            <input className="custom-form-control" id="gender" value={moment(tour_booking.end_date).format('DD/MM/YYYY')}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Booking Date</label>
                            <input className="custom-form-control" id="fullname" value={moment(tour_booking.booking_date).format('DD/MM/YYYY')}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Num of tourists</label>
                            <input className="custom-form-control" id="gender" value={tour_booking.num_tourist}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Total Price</label>
                            <input className="custom-form-control" id="birthday" value={tour_booking.total_price}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Status</label>
                            <input className="custom-form-control" id="gender" value={tour_booking.status}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Review Date</label>
                            <input className="custom-form-control" id="birthday" value={tour_booking.tour_review &&
                                    tour_booking.guide_review.review_date
                                        ? moment(tour_booking.guide_review.review_date).format('DD/MM/YYYY')
                                        : ''}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                        <label>Reply Date</label>
                            <input className="custom-form-control" id="gender" value={tour_booking.tour_review &&
                                    tour_booking.tour_review.reply_date
                                        ? moment(tour_booking.tour_review.reply_date).format('DD/MM/YYYY')
                                        : ''}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Review Content</label>
                            <input className="custom-form-control" id="gender" value={tour_booking.guide_review &&
                                    tour_booking.guide_review.review
                                        ? tour_booking.guide_review.review
                                        : ''}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Reply Content</label>
                            <input className="custom-form-control" id="fullname" value={tour_booking.guide_review &&
                                    tour_booking.guide_review.reply
                                        ? tour_booking.guide_review.reply
                                        : ''}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Report Content</label>
                            <input className="custom-form-control" id="fullname" value={tour_booking.guide_review &&
                                    tour_booking.guide_review.report
                                        ? tour_booking.guide_review.report
                                        : ''}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Report Date</label>
                            <input className="custom-form-control" id="birthday" value={tour_booking.tour_review &&
                                    tour_booking.guide_review.report_date
                                        ? moment(tour_booking.guide_review.report_date).format('DD/MM/YYYY')
                                        : ''}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                        <label>Report Status</label>
                            <input className="custom-form-control" id="gender" value={tour_booking.tour_review &&
                                    tour_booking.tour_review.report_status
                                        ? moment(tour_booking.tour_review.report_status).format('DD/MM/YYYY')
                                        : ''}/>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary ml-1 mt-2" id="btnBack" onClick={turnBack}>Back</button>
        </div>
    )
}

export default memo(BookingGuideDetails);