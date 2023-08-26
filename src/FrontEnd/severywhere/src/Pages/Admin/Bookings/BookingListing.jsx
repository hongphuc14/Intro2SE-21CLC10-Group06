import "./BookingListing.scss"
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../App";
import moment from 'moment';
import { getArrTourAction, updateSelectedMenuItemAction, getArrGuideBookingAction } from "../../../redux/actions/AdminAction";

function BookingListing(props){
    const { arr_tour, arr_guide_booking } = useSelector((state) =>state.AdminReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(updateSelectedMenuItemAction('bookings'));
        dispatch(getArrTourAction());
        dispatch(getArrGuideBookingAction());
    }, []);
    const ViewTourBooking = (id_tour) =>{
        let path = `/bookings-admin/tour/${id_tour}`;        
        history.push(path);
        window.location.reload();
    }
    const ViewGuideBooking = (id_guidebooking) =>{
        let path = `/bookings-admin/guide/${id_guidebooking}`;        
        history.push(path);
        window.location.reload();
    }
    return (
        <div className="booking-admin" style={{minHeight:"100vh"}}>
            <div className='admin-path'>
                <i className="fa-solid fa-house" style={{fontSize:"18px"}}></i>
                <span className='admin-path-name'>Users / Booking</span>
            </div>
            <div className="tour-booking-listing">
                <div className="tour-booking-list">
                    <p>Tour Booking Listing</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>IDTour</th>
                                <th>Name</th>
                                <th>IDCompany</th>
                                <th>IDDes</th>
                                <th>IDCat</th>
                                <th>Max Tourist</th>
                                <th>Price</th>
                                <th>Is_deleted</th>
                                <th>Free Cancellation</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="tour-table">
                            {arr_tour.map((item, index) =>{
                                return(
                                    <tr key={index} >
                                        <td>{item.id_tour}</td>
                                        <td>{item.name}</td>
                                        <td>{item.id_company}</td>
                                        <td>{item.id_des}</td>
                                        <td>{item.id_category}</td>
                                        <td>{item.num_max}</td>
                                        <td>{item.price}</td>
                                        <td>{item.is_deleted === false ? "false" : "true"}</td>
                                        <td>{item.free_cancellation === false ? "false" : "true"}</td>
                                        <td>
                                            <button className="btnViewTourBooking" onClick={() => ViewTourBooking(item.id_tour)}>
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
            <div className="guide-booking-listing">
                <div className="guide-booking-list">
                    <p>Freelancer Booking Listing</p>
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
                            {arr_guide_booking.map((item, index) =>
                                <tr key={index} >
                                    <td>{item.id_guidebooking}</td>
                                    <td>{item.id_guidetime}</td>
                                    <td>{item.id_tourist}</td>
                                    <td>{moment(item.booking_date).format('DD/MM/YYYY')}</td>
                                    <td className="meeting-cell">
                                        {item.meeting_point.length > 40 ? `${item.meeting_point.substring(0, 40)}...` : item.address}
                                    </td>
                                    <td>{item.price}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button className="btnViewBooking" onClick={() => ViewGuideBooking(item.id_guidebooking)}>
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
                                        </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default memo(BookingListing);