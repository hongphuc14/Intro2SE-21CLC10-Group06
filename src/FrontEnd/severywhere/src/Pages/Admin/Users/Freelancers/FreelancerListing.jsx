import "./FreelancerListing.scss"
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../../App";
import { getArrFreelancerAction, updateSelectedMenuItemAction } from "../../../../redux/actions/AdminAction";

function FreelancerListing(props){
    const { arr_freelancer } = useSelector((state) =>state.AdminReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(updateSelectedMenuItemAction('freelancers'));
        dispatch(getArrFreelancerAction());
    }, []);
    const ViewFreelancer = (id_guide) =>{
        let path = `/freelancers-admin/${id_guide}`;        
        history.push(path);
        window.location.reload();
    }
    
    return (
        <div className="freelancers-admin" style={{minHeight:"100vh"}}>
            <div className='admin-path'>
                <i className="fa-solid fa-house" style={{fontSize:"18px"}}></i>
                <span className='admin-path-name'>Users / Freelancers</span>
            </div>
            <div className="freelancer-listing">
                <div className="freelancers-list">
                    <p>Freelancer Listing</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>IDFreelancer</th>
                                <th>Fullname</th>
                                <th>IDDes</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Language</th>
                                <th>Experience</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="freelancer-table">
                            {arr_freelancer.map((item, index) =>{
                                const language = item.guide_languages.map(lang => {
                                    if (lang.id_lang === 1) return "Vietnamese";
                                    if (lang.id_lang === 2) return "English";
                                    return null;
                                }).filter(lang => lang !== null).join(", ");
                                return(
                                    <tr key={index} >
                                        <td>{item.id_guide}</td>
                                        <td>{item.fullname}</td>
                                        <td>{item.id_des}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
                                        <td>{language}</td>
                                        <td>{item.experience}</td>
                                        <td>
                                            <button className="btnViewFreelancer" onClick={() => ViewFreelancer(item.id_guide)}>
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

export default memo(FreelancerListing);