import "./TouristListing.scss"
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../../App";
import { getArrTouristAction, updateSelectedMenuItemAction } from "../../../../redux/actions/AdminAction";

function TouristListing(props){
    const { arr_tourist } = useSelector((state) =>state.AdminReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(updateSelectedMenuItemAction('tourists'));
        dispatch(getArrTouristAction());
    }, []);
    const ViewTourist = (id_tourist) =>{
        let path = `/tourists-admin/${id_tourist}`;        
        history.push(path);
        window.location.reload();
    }
    let gender = "";

    return (
        <div className="tourists-admin" style={{minHeight:"100vh"}}>
            <div className='admin-path'>
                <i className="fa-solid fa-house" style={{fontSize:"18px"}}></i>
                <span className='admin-path-name'>Users / Tourists</span>
            </div>
            <div className="tourist-listing">
                <div className="tourists-list">
                    <p>Tourist Listing</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>IDTourist</th>
                                <th>Fullname</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Birthday</th>
                                <th>Gender</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="tourist-table">
                            {arr_tourist.map((item, index) =>{
                                if (item.gender === 0)
                                    gender = "Male"
                                else    
                                    gender = "Female"
                                return(
                                    <tr key={index} >
                                        <td>{item.id_tourist}</td>
                                        <td>{item.fullname}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
                                        <td>{item.birthday}</td>
                                        <td>{gender}</td>
                                        <td>
                                            <button className="btnViewTourist" onClick={() => ViewTourist(item.id_tourist)}>
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

export default memo(TouristListing);