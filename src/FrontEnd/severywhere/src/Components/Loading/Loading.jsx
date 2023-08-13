import { useSelector } from "react-redux";
import React, { Fragment } from "react";

// Hiển thị trong thời gian chờ load dữ liệu

export default function Loading(props){
    const { isLoading } = useSelector((state) => state.LoadingReducer);

    return (
        <Fragment>
            {isLoading ? (
                <div className="position-fixed top-0 left-0 w-10 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(34,34,34,1", zIndex:"1000"}}>
                    <img style={{width:"50%", zIndex:"1000"}} src="https://genzakit.com/wp-content/uploads/2021/05/Rotate-Loading-Animation.gif" alt="loading-gif"/>
                </div>
            ):(
                ""
            )}
        </Fragment>
    );
}