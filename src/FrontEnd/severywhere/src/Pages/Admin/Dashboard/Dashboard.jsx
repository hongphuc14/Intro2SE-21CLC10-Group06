import "./Dashboard.scss";
import moment from 'moment';
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../App";
import { getArrGuideLicenseAction, getArrCompanyLicenseAction, getCompanyLicenseAction, 
        getGuideLicenseAction, updateCompanyLicenseStatusAction, updateFreelancerLicenseStatusAction, 
        getArrGuideBookingAction, getArrTourBookingAction, getArrTouristAction, getArrCompanyAction,
        getArrFreelancerAction, getArrGuideReviewAction, getArrTourReviewAction, updateSelectedMenuItemAction,
        getArrGuideReportAction, getArrTourReportAction, updateTourReportStatusAction, deleteTourReportAction,
        updateGuideReportStatusAction, deleteGuideReportAction, updateTourReviewReportStatusAction, deleteTourReviewReportAction,
        updateGuideReviewReportStatusAction, deleteGuideReviewReportAction } from "../../../redux/actions/AdminAction";

function Dashboard(props){
    const { arr_freelancer_license, arr_company_license, freelancer_license, company_license,
            arr_guide_booking, arr_tour_booking, arr_tourist, arr_company, arr_freelancer,
            arr_guide_review, arr_tour_review, arr_tour_report, arr_guide_report } = useSelector((state) =>state.AdminReducer); 
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(updateSelectedMenuItemAction('dashboard'));
        dispatch(getArrGuideLicenseAction());
        dispatch(getArrCompanyLicenseAction());
        dispatch(getArrTourBookingAction());
        dispatch(getArrGuideBookingAction());
        dispatch(getArrTouristAction());
        dispatch(getArrCompanyAction());
        dispatch(getArrFreelancerAction());
        dispatch(getArrGuideReviewAction());
        dispatch(getArrTourReviewAction());
        dispatch(getArrGuideReportAction());
        dispatch(getArrTourReportAction());
    }, []);

    // calculate total earnings
    let totalTourEarnings = 0;
    if(arr_tour_booking && arr_tour_booking.length > 0){
        totalTourEarnings = arr_tour_booking.reduce((total, booking) =>{
            const price = parseFloat(booking.total_price);
            if(!isNaN(price) && (booking.status === 1)){
                return total + price;
            }
            else{
                return total;
            }
        }, 0); 
    }
    let totalGuideEarnings = 0;
    if(arr_guide_booking && arr_guide_booking.length > 0){
        totalGuideEarnings = arr_guide_booking.reduce((total, booking) =>{
            const price = parseFloat(booking.price);
            if(!isNaN(price) && (booking.status === 1 || booking.status === 5)){
                return total + price;
            }
            else{
                return total;
            }
        }, 0);
    }
    const totalEarnings = totalTourEarnings + totalGuideEarnings;

    //calculate total users
    const totalUsers = arr_tourist.length + arr_company.length + arr_freelancer.length;

    //calculate total reviews
    let totalTourReview = 0;
    if(arr_tour_review && arr_tour_review.length > 0){
        totalTourReview = arr_tour_review.reduce((total, review) =>{
            if(review.review){
                return total + 1;
            }
            else{
                return total;
            }
        }, 0);
    }
    let totalGuideReview = 0;
    if(arr_guide_review && arr_guide_review.length > 0){
        totalGuideReview = arr_guide_review.reduce((total, review) =>{
            if(review.review){
                return total + 1;
            }
            else{
                return total;
            }
        }, 0);
    }
    const totalReviews = totalGuideReview + totalTourReview;

    //calculate total bookings
    let totalTourBooking = 0;
    if(arr_tour_booking && arr_tour_booking.length > 0){
        totalTourBooking = arr_tour_booking.reduce((total, booking) =>{
            if(booking.status === 1){
                return total + 1;
            }
            else{
                return total;
            }
        }, 0);
    }
    let totalGuideBooking = 0;
    if(arr_guide_booking && arr_guide_booking.length > 0){
        totalGuideBooking = arr_guide_booking.reduce((total, booking) =>{
            if(booking.status === 1 || booking.status === 5){
                return total + 1;
            }
            else{
                return total;
            }
        }, 0);
    }
    const totalBookings = totalTourBooking + totalGuideBooking;

    //verify license actions
    const [companyLicenseImage, setCompanyLicenseImage] = useState('');
    const ViewCompanyLicense = async (id_company, file_path) => {
        dispatch(getCompanyLicenseAction(id_company, file_path));
    }
    useEffect(() =>{
        if(company_license){
            setCompanyLicenseImage(company_license);
        }
    }, [company_license]);
    
    const ValidCompanyLicense = async (file_path) =>{
        dispatch(updateCompanyLicenseStatusAction(file_path, 2));
        setCompanyLicenseImage('');
    }
    const InvalidCompanyLicense = async (file_path) =>{
        dispatch(updateCompanyLicenseStatusAction(file_path, 3));
        setCompanyLicenseImage('');
    }

    const [freelancerLicenseImage, setFreelancerLicenseImage] = useState('');
    const ViewFreelancerLicense = async (id_guide, file_path) => {
        dispatch(getGuideLicenseAction(id_guide, file_path));
    }
    useEffect(() =>{
        if(freelancer_license){
            setFreelancerLicenseImage(freelancer_license);
        }
    }, [freelancer_license]);
    const ValidFreelancerLicense = async (file_path) =>{
        dispatch(updateFreelancerLicenseStatusAction(file_path, 2));
        setFreelancerLicenseImage('');
    }
    const InvalidFreelancerLicense = async (file_path) =>{
        dispatch(updateFreelancerLicenseStatusAction(file_path, 3));
        setFreelancerLicenseImage('');
    }

    //report tour/guide action
    const ViewReportTour = () =>{
        history.push("/tours-admin");   //navigate tới trang tours rồi tìm kiếm tour bằng id_tour
        window.location.reload();
    }
    const ValidTourReport = async (id_tour) =>{
        dispatch(updateTourReportStatusAction(id_tour));
    }
    const InvalidTourReport = async (id_tour) =>{
        dispatch(deleteTourReportAction(id_tour));
    }

    const ViewReportGuide = () =>{
        history.push("/freelancers-admin");   //navigate tới trang tours rồi tìm kiếm guide bằng id_guide
        window.location.reload();
    }
    const ValidGuideReport = async (id_guide) =>{
        dispatch(updateGuideReportStatusAction(id_guide));
    }
    const InvalidGuideReport = async (id_guide) =>{
        dispatch(deleteGuideReportAction(id_guide));
    }

    //report tour/guide review action
    const ViewReportTourReview = () =>{
        history.push("/booking-admin");   //navigate tới trang booking rồi tìm kiếm tour bằng id_tour_booking
        window.location.reload();
    }
    const ValidTourReviewReport = async (id_tour_booking) =>{
        dispatch(updateTourReviewReportStatusAction(id_tour_booking));
    }
    const InvalidTourReviewReport = async (id_tour_booking) =>{
        dispatch(deleteGuideReviewReportAction(id_tour_booking));
    }

    const ViewReportGuideReview = () =>{
        history.push("/booking-admin");   //navigate tới trang booking rồi tìm kiếm guide bằng id_guide_booking
        window.location.reload();
    }
    const ValidGuideReviewReport = async (id_guide_booking) =>{
        dispatch(updateGuideReviewReportStatusAction(id_guide_booking));
    }
    const InvalidGuideReviewReport = async (id_guide_booking) =>{
        dispatch(deleteGuideReviewReportAction(id_guide_booking));
    }

    return(
        <div className="dashboard-admin" style={{minHeight:"100vh"}}>
            <div className="dashboard-statistic">
                <div className='admin-path'>
                    <i className="fa-solid fa-house" style={{fontSize:"18px"}}></i>
                    <span className='admin-path-name'>Dashboard</span>
                </div>
                <div className="dashboard-statistic-content">
                    <div className="widget">
                        <div className="stats-left" style={{"backgroundColor":"#4CAF50"}}>
                            <i className="fa-solid fa-dollar-sign"></i>
                        </div>
                        <div className="stats-right">
                            <div className="stats-text">
                                <p className="stats-name">Total Earnings</p>
                                <p className="stats-data">{totalEarnings}</p>
                            </div> 
                        </div>
                    </div>
                    <div className="widget">
                        <div className="stats-left" style={{"backgroundColor":"#9747FF"}}>
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="stats-right">
                            <div className="stats-text">
                                <p className="stats-name">Total Users</p>
                                <p className="stats-data">{totalUsers}</p>
                            </div>
                        </div>
                    </div> 
                    <div className="widget">
                        <div className="stats-left" style={{"backgroundColor":"#F71F39"}}>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="stats-right">
                            <div className="stats-text">
                                <p className="stats-name">Total Reviews</p>
                                <p className="stats-data">{totalReviews}</p>
                            </div>
                        </div>
                    </div> 
                    <div className="widget">
                        <div className="stats-left" style={{"backgroundColor":"#FFF500"}}>
                            <i className="fa-solid fa-receipt"></i>
                        </div>
                        <div className="stats-right">
                            <div className="stats-text">
                                <p className="stats-name">Total Bookings</p>
                                <p className="stats-data">{totalBookings}</p>
                            </div>
                        </div>
                    </div>         
                </div>
            </div>
            
            <div className="verify-company-license">
                <div className="license-list">
                    <p>Company Licenses Listing</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID Company</th>
                                <th>Image</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="company-table">
                            {arr_company_license.map((item, index) =>{
                                if (item.status === 1){
                                    return(
                                        <tr key={index}>
                                            <td>{item.id_company}</td>
                                            <td>{item.file_path}</td>
                                            <td style={{"display": "flex", "align-items": "center", "justify-content": "center"}}>
                                                <button className="btnViewCompany" onClick={() => ViewCompanyLicense(item.id_company, item.file_path)}>
                                                    <i className="fa-solid fa-eye"></i>
                                                </button>
                                                <button className="btnValidCompany" onClick={() => ValidCompanyLicense(item.file_path)}>
                                                <i className="fa-solid fa-check"></i>
                                                </button>
                                                <button className="btnInvalidCompany" onClick={() => InvalidCompanyLicense(item.file_path)}>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="company-license-image">
                    {companyLicenseImage && <img src={companyLicenseImage} alt="company-license" style={{maxHeight:"100%", maxWidth:"100%", objectFit:"contain"}}/>}
                </div>
            </div>
            
            <div className="verify-freelancer-license">
                <div className="license-list">
                    <p>Freelancer Licenses Listing</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID Freelancer</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody className="freelancer-table">
                            {arr_freelancer_license.map((item, index) =>{
                                if (item.status === 1){
                                    return(
                                        <tr key={index}>
                                            <td>{item.id_guide}</td>
                                            <td>{item.file_path}</td>
                                            <td style={{"display": "flex", "align-items": "center", "justify-content": "center"}}>
                                                <button className="btnViewFreelancer" onClick={() => ViewFreelancerLicense(item.id_guide, item.file_path)}>
                                                    <i className="fa-solid fa-eye"></i>
                                                </button>
                                                <button className="btnValidFreelancer" onClick={() => ValidFreelancerLicense(item.file_path)}>
                                                <i className="fa-solid fa-check"></i>
                                                </button>
                                                <button className="btnInvalidFreelancer" onClick={() => InvalidFreelancerLicense(item.file_path)}>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="freelancer-license-image">
                    {freelancerLicenseImage && <img src={freelancerLicenseImage} alt="freelancer-license" style={{maxHeight:"100%", maxWidth:"100%", objectFit:"contain"}}/>}
                </div>
            </div>

            <div className="process-tour-report">
                <div className="tour-report-list">
                    <p>Tour Report Listing</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>IDTour</th>
                                <th>IDTourist</th>
                                <th>Report Date</th>
                                <th>Report Content</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="tour-report-table">
                            {arr_tour_report.map((item, index) =>{
                                let status = "";
                                if(item.status === 1){
                                    status = "Pending";
                                    return(
                                        <tr key={index}>
                                            <td>{item.id_tour}</td>
                                            <td>{item.id_tourist}</td>
                                            <td>{moment(item.report_date).format('DD/MM/YYYY')}</td>
                                            <td>{item.content}</td>
                                            <td>{status}</td>
                                            <td style={{"display": "flex", "align-items": "center", "justify-content": "center"}}>
                                                <button className="btnViewTourReport" onClick={() => ViewReportTour()}>
                                                    <i className="fa-solid fa-eye"></i>
                                                </button>
                                                <button className="btnValidTourReport" onClick={() => ValidTourReport(item.id_tour)}>
                                                    <i className="fa-solid fa-check"></i>
                                                </button>
                                                <button className="btnInvalidTourReport" onClick={() => InvalidTourReport(item.id_tour)}>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                                else{
                                    status = "Processed";
                                    return(
                                        <tr key={index}>
                                            <td>{item.id_tour}</td>
                                            <td>{item.id_tourist}</td>
                                            <td>{moment(item.report_date).format('DD/MM/YYYY')}</td>
                                            <td>{item.content}</td>
                                            <td>{status}</td>
                                            <td></td>
                                        </tr>
                                    )
                                }
                                
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="process-guide-report">
                <div className="guide-report-list">
                    <p>Guide Report Listing</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>IDGuide</th>
                                <th>IDTourist</th>
                                <th>Report Date</th>
                                <th>Report Content</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="guide-report-table">
                            {arr_guide_report.map((item, index) =>{
                                let status = "";
                                if(item.status === 1){
                                    status = "Pending";
                                    return(
                                        <tr key={index}>
                                            <td>{item.id_guide}</td>
                                            <td>{item.id_tourist}</td>
                                            <td>{moment(item.report_date).format('DD/MM/YYYY')}</td>
                                            <td>{item.content}</td>
                                            <td>{status}</td>
                                            <td style={{"display": "flex", "align-items": "center", "justify-content": "center"}}>
                                                <button className="btnViewGuideReport" onClick={() => ViewReportGuide()}>
                                                    <i className="fa-solid fa-eye"></i>
                                                </button>
                                                <button className="btnValidGuideReport" onClick={() => ValidGuideReport(item.id_guide)}>
                                                    <i className="fa-solid fa-check"></i>
                                                </button>
                                                <button className="btnInvalidGuideReport" onClick={() => InvalidGuideReport(item.id_guide)}>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                                else{
                                    status = "Processed";
                                    return(
                                        <tr key={index}>
                                            <td>{item.id_guide}</td>
                                            <td>{item.id_tourist}</td>
                                            <td>{moment(item.report_date).format('DD/MM/YYYY')}</td>
                                            <td>{item.content}</td>
                                            <td>{status}</td>
                                            <td></td>
                                        </tr>
                                    )
                                }   
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="process-review-tour-report">
                <div className="review-tour-report-list">
                    <p>Review Tour Report Listing</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>IDBooking</th>
                                <th>Report Date</th>
                                <th>Report Content</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="review-tour-report-table">
                            {arr_tour_review.map((item, index) =>{
                                let report_status = "";
                                if(item.report){
                                    if(item.report_status === 1){
                                        report_status = "Pending";
                                        return(
                                            <tr key={index} >
                                                <td>{item.id_tour_booking}</td>
                                                <td>{moment(item.report_date).format('DD/MM/YYYY')}</td>
                                                <td>{item.report}</td>
                                                <td>{report_status}</td>
                                                <td style={{"display": "flex", "align-items": "center", "justify-content": "center"}}>
                                                    <button className="btnViewReviewTourReport" onClick={() => ViewReportTourReview()}>
                                                        <i className="fa-solid fa-eye"></i>
                                                    </button>
                                                    <button className="btnValidReviewTourReport" onClick={() => ValidTourReviewReport(item.id_tour_booking)}>
                                                        <i className="fa-solid fa-check"></i>
                                                    </button>
                                                    <button className="btnInvalidReviewTourReport" onClick={() => InvalidTourReviewReport(item.id_tour_booking)}>
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    else{
                                        report_status = "Processed";
                                        return(
                                            <tr key={index}>
                                                <td>{item.id_tour_booking}</td>
                                                <td>{moment(item.report_date).format('DD/MM/YYYY')}</td>
                                                <td>{item.report}</td>
                                                <td>{report_status}</td>
                                                <td></td>
                                            </tr>
                                        )
                                    }
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="process-review-guide-report">
                <div className="review-guide-report-list">
                    <p>Review Guide Report Listing</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>IDBooking</th>
                                <th>Report Date</th>
                                <th>Report Content</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="review-guide-report-table">
                            {arr_guide_review.map((item, index) =>{
                                let report_status = "";
                                if(item.report){
                                    if(item.report_status === 1){
                                        report_status = "Pending";
                                        return(
                                            <tr key={index}>
                                                <td>{item.id_guide_booking}</td>
                                                <td>{moment(item.report_date).format('DD/MM/YYYY')}</td>
                                                <td>{item.report}</td>
                                                <td>{report_status}</td>
                                                <td style={{"display": "flex", "align-items": "center", "justify-content": "center"}}>
                                                    <button className="btnViewReviewGuideReport" onClick={() => ViewReportGuideReview()}>
                                                        <i className="fa-solid fa-eye"></i>
                                                    </button>
                                                    <button className="btnValidReviewGuideReport" onClick={() => ValidGuideReviewReport(item.id_guide_booking)}>
                                                        <i className="fa-solid fa-check"></i>
                                                    </button>
                                                    <button className="btnInvalidReviewGuideReport" onClick={() => InvalidGuideReviewReport(item.id_guide_booking)}>
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    else{
                                        report_status = "Processed";
                                        return(
                                            <tr key={index}>
                                                <td>{item.id_guide_booking}</td>
                                                <td>{moment(item.report_date).format('DD/MM/YYYY')}</td>
                                                <td>{item.report}</td>
                                                <td>{report_status}</td>
                                                <td></td>
                                            </tr>
                                        )
                                    }   
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default memo(Dashboard);