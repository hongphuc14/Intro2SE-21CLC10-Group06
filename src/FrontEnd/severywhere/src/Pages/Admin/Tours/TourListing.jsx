import "./TourListing.scss"
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../App";
import { getArrTourAction, updateSelectedMenuItemAction } from "../../../redux/actions/AdminAction";

function TourListing(props){
    const { arr_tour } = useSelector((state) =>state.AdminReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(updateSelectedMenuItemAction('tours'));
        dispatch(getArrTourAction());
    }, []);
    const ViewTour = (id_tour) =>{
        let path = `/tours-admin/${id_tour}`;        
        history.push(path);
        window.location.reload();
    }
    
    return (
        <div className="tours-admin" style={{minHeight:"100vh"}}>
            <div className='admin-path'>
                <i className="fa-solid fa-house" style={{fontSize:"18px"}}></i>
                <span className='admin-path-name'>Users / Tours</span>
            </div>
            <div className="tour-listing">
                <div className="tours-list">
                    <p>Tour Listing</p>
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
        </div>
    )
}

export default memo(TourListing);