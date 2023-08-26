import "./TourDetails.scss"
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../App";
import moment from 'moment';
import { getTourByIDAction, updateSelectedMenuItemAction, getTourBookingAction, getTourPhotoAction } from "../../../redux/actions/AdminAction";
function TourDetails(props){
    let { id_tour } = props.match.params;
    const { tour_info, tour_booking, tour_photo } = useSelector((state) =>state.AdminReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(updateSelectedMenuItemAction('tours'));
        dispatch(getTourByIDAction(id_tour));
        dispatch(getTourBookingAction(id_tour));
    }, []);
    const turnBack = async() =>{
        history.push('/tours-admin');
        window.location.reload();
    }
    
    //calculate eanings
    let totalEarnings = tour_booking.reduce((total, booking) => {
        if (booking.status === 1) {
            return total + booking.total_price;
        }
        return total;
    }, 0);
    
    //calculate total bookings
    let totalBookings = tour_booking.reduce((total, booking) => {
        if (booking.status === 1) {
            return total + 1;
        }
        return total;
    }, 0);
    
    //calculate total reviews
    let totalReviews = tour_booking.reduce((total, booking) => {
        if (booking.status === 1 && booking.tour_review.review) {
            return total + 1;
        }
        return total;
    }, 0);

    const ViewBooking = (id_tour) =>{
        let path = `/tours-admin/${id_tour}`;        
        history.push(path);
        window.location.reload();
    }
    
    const PhotoGallery = async () => {
        dispatch(getTourPhotoAction(id_tour));
    }

    return (
        <div className='tourInfo'>
            <div className='admin-path'>
                <i className="fa-solid fa-house" style={{fontSize:"18px"}}></i>
                <span className='admin-path-name'>Users / Tours / {id_tour}</span>
            </div>
            <div className='profile-form'>
                <div className='profile-header'>
                    <h3 className='profile-header-name'>Tour Information</h3>
                </div>
                <div className="custom-form">
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>ID</label>
                            <input className="custom-form-control" id="fullname" value={tour_info.id_tour}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Name</label>
                            <input className="custom-form-control" id="fullname" value={tour_info.name}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>IDDestination</label>
                            <input className="custom-form-control" id="email-input" value={tour_info.id_des}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Max tourists</label>
                            <input className="custom-form-control" id="phone" value={tour_info.num_max}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Price</label>
                            <input className="custom-form-control" id="birthday" value={tour_info.price}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Duration</label>
                            <input className="custom-form-control" id="gender" value={tour_info.duration}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>IDCategory</label>
                            <input className="custom-form-control" id="birthday" value={tour_info.id_category}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>IDCompany</label>
                            <input className="custom-form-control" id="gender" value={tour_info.id_company}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>Schedule</label>
                            <input className="custom-form-control" id="birthday" value={tour_info.schedule}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>Free Cancellation</label>
                            <input className="custom-form-control" id="fullname" value={tour_info.free_cancellation === false ? "false" : "true"}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column left-group">
                            <label>What's included</label>
                            <input className="custom-form-control" id="birthday" value={tour_info.included}/>
                        </div>
                        <div className="custom-form-group custom-column right-group">
                            <label>What's not included</label>
                            <input className="custom-form-control" id="fullname" value={tour_info.not_included}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Is_deleted</label>
                            <input className="custom-form-control" id="fullname" value={tour_info.is_deleted === false ? "false" : "true"}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Ggmap Address</label>
                            <input className="custom-form-control" id="fullname" value={tour_info.ggmap_address}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Description</label>
                            <input className="custom-form-control" id="fullname" value={tour_info.description}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='profile-form' style={{marginTop:"30px"}}>
                <div className='profile-header'>
                    <h3 className='profile-header-name'>Tour Statistics</h3>
                </div>
                <div className="custom-form">
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Earnings ($)</label>
                            <input className="custom-form-control" id="fullname" value={totalEarnings}/>
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
                    <p>Tour's Booking Listing</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>IDTourBooking</th>
                                <th>IDTourist</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Booking Date</th>
                                <th>Num tourists</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="booking-table">
                            {tour_booking.map((item, index) =>
                                <tr key={index}>
                                    <td>{item.id_tour_booking}</td>
                                    <td>{item.id_tourist}</td>
                                    <td>{moment(item.start_date).format('DD/MM/YYYY')}</td>
                                    <td>{moment(item.end_date).format('DD/MM/YYYY')}</td>
                                    <td>{moment(item.booking_date).format('DD/MM/YYYY')}</td>
                                    <td>{item.num_tourist}</td>
                                    <td>{item.total_price}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button className="btnViewBooking" onClick={() => ViewBooking(item.id_tour_booking)}>
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="col-12 mb-3 pb-2" style={{display:"flex", justifyContent:"space-between"}}>
                <button className="btn btn-primary ml-1 mt-2" id="btnPhotoGallery" onClick={() => PhotoGallery()}>Photo Gallery</button>
                <button className="btn btn-primary ml-1 mt-2" id="btnBack" onClick={turnBack}>Back</button>
            </div>
            <div className="tour-images">
                <div className="tour-column">
                    {tour_photo.map((item, index) =>{
                        if(index % 3 === 0){
                            return(
                                <div className="tour-image" key={index}>
                                    <img src={item} alt={`tour-${index}`}/>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="tour-column">
                    {tour_photo.map((item, index) =>{
                        if(index % 3 === 1){
                            return(
                                <div className="tour-image" key={index}>
                                    <img src={item} alt={`tour-${index}`}/>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="tour-column">
                    {tour_photo.map((item, index) =>{
                        if(index % 3 === 2){
                            return(
                                <div className="tour-image" key={index}>
                                    <img src={item} alt={`tour-${index}`}/>
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

export default memo(TourDetails);