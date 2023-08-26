import "./BookingGuideDetails.scss"
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../App";
import moment from 'moment';
import { updateSelectedMenuItemAction, getGuideBookingAction } from "../../../redux/actions/AdminAction";
function BookingGuideDetails(props){
    let { id_guide_booking } = props.match.params;
    const { guide_booking } = useSelector((state) =>state.AdminReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(updateSelectedMenuItemAction('bookings'));
        dispatch(getGuideBookingAction(id_guide_booking));
    }, []);
    
    const turnBack = async() =>{
        history.push('/bookings-admin');
        window.location.reload();
    }
    
    return (
        <div className='freelancerInfo'>
            <div className='admin-path'>
                <i className="fa-solid fa-house" style={{fontSize:"18px"}}></i>
                <span className='admin-path-name'>Bookings / Freelancers / {id_guide_booking}</span>
            </div>
            <div className='profile-form'>
                <div className='profile-header'>
                    <h3 className='profile-header-name'>Booking Guide Information</h3>
                </div>
                <div className="custom-form">
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>IDBooking</label>
                            <input className="custom-form-control" id="fullname" value={guide_booking.id_guide_booking}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>IDTourist</label>
                            <input className="custom-form-control" id="fullname" value={guide_booking.id_tourist}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>IDGuide</label>
                            <input className="custom-form-control" id="email-input" value={guide_booking.id_guide}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>IDGuideTime</label>
                            <input className="custom-form-control" id="phone" value={guide_booking.id_guidetime}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Booking Date</label>
                            <input className="custom-form-control" id="birthday" value={moment(guide_booking.booking_date).format('DD/MM/YYYY')}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Price</label>
                            <input className="custom-form-control" id="gender" value={guide_booking.price}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Rating</label>
                            <input className="custom-form-control" id="fullname" value={guide_booking.guide_review &&
                                    guide_booking.guide_review.rating
                                        ? guide_booking.guide_review.rating
                                        : ''}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Status</label>
                            <input className="custom-form-control" id="gender" value={guide_booking.status}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Review Date</label>
                            <input className="custom-form-control" id="birthday" value={guide_booking.guide_review &&
                                    guide_booking.guide_review.review_date
                                        ? moment(guide_booking.guide_review.review_date).format('DD/MM/YYYY')
                                        : ''}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Reply Date</label>
                            <input className="custom-form-control" id="gender" value={guide_booking.guide_review &&
                                    guide_booking.guide_review.reply_date
                                        ? moment(guide_booking.guide_review.reply_date).format('DD/MM/YYYY')
                                        : ''}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Report Date</label>
                            <input className="custom-form-control" id="birthday" value={guide_booking.guide_review &&
                                    guide_booking.guide_review.report_date
                                        ? moment(guide_booking.guide_review.report_date).format('DD/MM/YYYY')
                                        : ''}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Report Status</label>
                            <input className="custom-form-control" id="gender" value={guide_booking.guide_review &&
                                    guide_booking.guide_review.report_status
                                        ? guide_booking.guide_review.report_status
                                        : ''}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Meeting Point</label>
                            <input className="custom-form-control" id="fullname" value={guide_booking.meeting_point}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Review Content</label>
                            <input className="custom-form-control" id="gender" value={guide_booking.guide_review &&
                                    guide_booking.guide_review.review
                                        ? guide_booking.guide_review.review
                                        : ''}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Reply Content</label>
                            <input className="custom-form-control" id="fullname" value={guide_booking.guide_review &&
                                    guide_booking.guide_review.reply
                                        ? guide_booking.guide_review.reply
                                        : ''}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Report Content</label>
                            <input className="custom-form-control" id="fullname" value={guide_booking.guide_review &&
                                    guide_booking.guide_review.report
                                        ? guide_booking.guide_review.report
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