import "./CompanyListing.scss"
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../../App";
import { getArrCompanyAction, updateSelectedMenuItemAction } from "../../../../redux/actions/AdminAction";

function CompanyListing(props){
    const { arr_company } = useSelector((state) =>state.AdminReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(updateSelectedMenuItemAction('companies'));
        dispatch(getArrCompanyAction());
    }, []);
    const ViewCompany = (id_company) =>{
        let path = `/companies-admin/${id_company}`;        
        history.push(path);
        window.location.reload();
    }
    
    return (
        <div className="companies-admin" style={{minHeight:"100vh"}}>
            <div className='admin-path'>
                <i className="fa-solid fa-house" style={{fontSize:"18px"}}></i>
                <span className='admin-path-name'>Users / Companies</span>
            </div>
            <div className="company-listing">
                <div className="companies-list">
                    <p>Company Listing</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>IDCompany</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Website</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="company-table">
                            {arr_company.map((item, index) =>{
                                return(
                                    <tr key={index} >
                                        <td>{item.id_company}</td>
                                        <td>{item.name}</td>
                                        <td className="address-cell">
                                            {item.address.length > 30 ? `${item.address.substring(0, 30)}...` : item.address}
                                        </td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
                                        <td>{item.website}</td>
                                        <td>
                                            <button className="btnViewCompany" onClick={() => ViewCompany(item.id_company)}>
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

export default memo(CompanyListing);