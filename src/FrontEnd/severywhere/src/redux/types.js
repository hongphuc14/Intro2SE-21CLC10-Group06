//action types in Redux actions and reducers to identify the type of action being dispatched or handled.
export const DISPLAY_LOADING = "DISPLAY_LOADING";

export const HIDE_LOADING = "HIDE_LOADING";

// BASIC
export const LOGIN = "LOGIN";

export const SIGNUP = "SIGNUP";

export const GET_DESTINATION = "GET_DESTINATION";

export const LOGOUT = "LOGOUT";

// TOURIST 
export const GET_TOURIST_INFO = "GET_TOURIST_INFO";

export const GET_TOUR_SEARCH = "GET_TOUR_SEARCH";

export const GET_GUIDE_SEARCH = "GET_GUIDE_SEARCH";

export const UPDATE_TOURIST_CART = "UPDATE_TOURIST_CART";

export const GET_TOUR_BOOKING = "GET_TOUR_BOOKING";

export const GET_GUIDE_BOOKING = "GET_GUIDE_BOOKING";


// FREELANCER PROFILE

export const GET_TOUR_GUIDE_BY_ID_GUIDE = "GET_TOUR_GUIDE_BY_ID_GUIDE";

export const GET_GUIDE_LANGUAGUE_BY_ID_GUIDE = "GET_GUIDE_LANGUAGUE_BY_ID_GUIDE";

export const GET_GUIDE_LICENSE_BY_ID_GUIDE = "GET_GUIDE_LICENSE_BY_ID_GUIDE";

export const UPDATE_GUIDE_INFO = "UPDATE_GUIDE_INFO";

export const UPDATE_GUIDE_LANGUAGE = "UPDATE_GUIDE_LANGUAGE";

export const UPDATE_GUIDE_AVATAR = "UPDATE_GUIDE_AVATAR";

export const UPDATE_GUIDE_LICENSE = "UPDATE_GUIDE_LICENSE";

export const UPDATE_UPLOADED_LICENSE = "UPDATE_UPLOADED_LICENSE";

export const GET_GUIDE_ATTRACTION_BY_ID_GUIDE = "GET_GUIDE_ATTRACTION_BY_ID_GUIDE";

// FREELANCER CALENDAR

export const GET_GUIDE_TIME_BY_ID_GUIDE = "GET_GUIDE_TIME_BY_ID_GUIDE";

export const UPDATE_GUIDE_TIME_BY_ID_GUIDE = "UPDATE_GUIDE_TIME_BY_ID_GUIDE";

// FREELANCER STATISITC

export const GET_GUIDE_BOOKING_BY_ID_GUIDE = "GET_GUIDE_BOOKING_BY_ID_GUIDE";

export const GET_GUIDE_REVIEW_BY_ID_GUIDEBOOKING = "GET_GUIDE_REVIEW_BY_ID_GUIDEBOOK"


// COMPANY PROFILE

export const GET_COMPANY_INFO= "GET_COMPANY_INFO";

export const GET_GOMPANY_LICENSE = "GET_GOMPANY_LICENSE";

export const UPDATE_COMPANY_INFO = "UPDATE_COMPANY_INFO";

export const UPDATE_COMPANY_LICENSE = "UPDATE_COMPANY_LICENSE";

// COMPANY TOUR

export const GET_TOUR_BY_ID_COMPANY = "GET_TOUR_BY_ID_COMPANY";

export const ADD_TOUR_BY_ID_COMPANY = "ADD_TOUR_BY_ID_COMPANY";

export const UPDATE_TOUR_BY_ID_TOUR = "UPDATE_TOUR_BY_ID_TOUR";

export const DELETE_TOUR_BY_ID_TOUR = "DELETE_TOUR_BY_ID_TOUR"

// COMPANY STATISITC

// ???
export const GET_COMPANY_BOOKING = "GET_COMPANY_BOOKING";

export const GET_COMPANY_REVIEW = "GET_COMPANY_REVIEW";
















// ADMIN PROFILE
export const UPDATE_SELECTED_MENU_ITEM = "UPDATE_SELECTED_MENU_ITEM";

export const UPDATE_SELECTED_SUB_MENU_ITEM = "UPDATE_SELECTED_SUB_MENU_ITEM";

export const GET_ADMIN_INFO_BY_ID_ADMIN = "GET_ADMIN_INFO";

export const UPDATE_ADMIN_INFO = "UPDATE_ADMIN_INFO";

export const UPDATE_ADMIN_PWD = "UPDATE_ADMIN_PWD";

export const UPLOAD_ADMIN_AVATAR = "UPLOAD_ADMIN_AVATAR";

export const GET_AVATAR = "GET_AVATAR";

// ADMIN DASHBOARD
export const GET_ARR_FREELANCER_LICENSE = "GET_ARR_FREELANCER_LICENSE";

export const GET_ARR_COMPANY_LICENSE = "GET_ARR_COMPANY_LICENSE";

export const GET_FREELANCER_LICENSE = "GET_FREELANCER_LICENSE";

export const GET_COMPANY_LICENSE = "GET_COMPANY_LICENSE";

export const UPDATE_COMPANY_LICENSE_STATUS = "UPDATE_COMPANY_LICENSE_STATUS";

export const UPDATE_FREELANCER_LICENSE_STATUS = "UPDATE_FREELANCER_LICENSE_STATUS";

export const GET_ARR_FREELANCER_BOOKING = "GET_ARR_FREELANCER_BOOKING";

export const GET_ARR_COMPANY_BOOKING = "GET_ARR_COMPANY_BOOKING";

export const GET_ARR_TOURIST = "GET_ARR_TOURIST";

export const GET_ARR_FREELANCER = "GET_ARR_FREELANCER";

export const GET_ARR_COMPANY = "GET_ARR_COMPANY";

export const GET_ARR_TOUR_REVIEW = "GET_ARR_TOUR_REVIEW";

export const GET_ARR_GUIDE_REVIEW = "GET_ARR_GUIDE_REVIEW";

export const GET_ARR_TOUR_REPORT = "GET_ARR_TOUR_REPORT";

export const GET_ARR_GUIDE_REPORT = "GET_ARR_GUIDE_REPORT";

// ADMIN TOURIST DETAILS
export const GET_TOURIST_INFO_BY_ID_TOURIST = "GET_TOURIST_INFO_BY_ID_TOURIST";

export const GET_TOURIST_GUIDE_BOOKING = "GET_TOURIST_GUIDE_BOOKING";

export const GET_TOURIST_TOUR_BOOKING = "GET_TOURIST_TOUR_BOOKING";

// ADMIN COMPANY DETAILS
export const GET_COMPANY_INFO_BY_ID_COMPANY = "GET_COMPANY_INFO_BY_ID_COMPANY";

export const GET_COMPANY_TOUR_BY_ID_COMPANY = "GET_COMPANY_TOUR_BY_ID_COMPANY";

export const GET_COMPANY_LICENSES_BY_ID_COMPANY = "GET_COMPANY_LICENSES_BY_ID_COMPANY";

// ADMIN FREELANCER DETAILS
export const GET_FREELANCER_INFO_BY_ID_GUIDE = "GET_FREELANCER_INFO_BY_ID_GUIDE";

export const GET_FREELANCER_ATTRACTION_BY_ID_GUIDE = "GET_FREELANCER_ATTRACTION_BY_ID_GUIDE";

export const GET_FREELANCER_LICENSES_BY_ID_GUIDE = "GET_FREELANCER_LICENSES_BY_ID_GUIDE";

export const GET_FREELANCER_TIME_BY_ID_GUIDE = "GET_FREELANCER_TIME_BY_ID_GUIDE";

export const GET_FREELANCER_LANGUAGE = "GET_FREELANCER_LANGUAGE";

// ADMIN TOUR LISTING
export const GET_ARR_TOUR = "GET_ARR_TOUR";

// ADMIN TOUR DETAILS
export const GET_TOUR = "GET_TOUR";

export const GET_TOUR_BOOKING = "GET_TOUR_BOOKING";

export const GET_TOUR_PHOTO = "GET_TOUR_PHOTO";

// BOOKING DETAILS
export const GET_TOUR_BOOKING_BY_ID = "GET_TOUR_BOOKING_BY_ID";

export const GET_GUIDE_BOOKING = "GET_GUIDE_BOOKING";

export const GET_TOUR_BOOKING_LIST = "GET_TOUR_BOOKING_LIST";

// FREELANCER PROFILE

export const GET_TOUR_GUIDE_BY_ID_GUIDE = "GET_TOUR_GUIDE_BY_ID_GUIDE";

export const GET_GUIDE_LANGUAGUE_BY_ID_GUIDE = "GET_GUIDE_LANGUAGUE_BY_ID_GUIDE";

export const GET_GUIDE_LICENSE_BY_ID_GUIDE = "GET_GUIDE_LICENSE_BY_ID_GUIDE";

export const UPDATE_GUIDE_INFO = "UPDATE_GUIDE_INFO";

export const UPDATE_GUIDE_LANGUAGE = "UPDATE_GUIDE_LANGUAGE";

export const UPDATE_GUIDE_AVATAR = "UPDATE_GUIDE_AVATAR";

export const UPDATE_GUIDE_LICENSE = "UPDATE_GUIDE_LICENSE";

export const UPDATE_UPLOADED_LICENSE = "UPDATE_UPLOADED_LICENSE";

export const GET_GUIDE_ATTRACTION_BY_ID_GUIDE = "GET_GUIDE_ATTRACTION_BY_ID_GUIDE";

// FREELANCER CALENDAR

export const GET_GUIDE_TIME_BY_ID_GUIDE = "GET_GUIDE_TIME_BY_ID_GUIDE";

export const UPDATE_GUIDE_TIME_BY_ID_GUIDE = "UPDATE_GUIDE_TIME_BY_ID_GUIDE";

// FREELANCER STATISITC

export const GET_GUIDE_BOOKING_BY_ID_GUIDE = "GET_GUIDE_BOOKING_BY_ID_GUIDE";

export const GET_GUIDE_REVIEW_BY_ID_GUIDEBOOKING = "GET_GUIDE_REVIEW_BY_ID_GUIDEBOOK"


// COMPANY PROFILE

export const GET_COMPANY_INFO= "GET_COMPANY_INFO";

export const GET_GOMPANY_LICENSE = "GET_GOMPANY_LICENSE";

export const UPDATE_COMPANY_INFO = "UPDATE_COMPANY_INFO";

export const UPDATE_COMPANY_LICENSE = "UPDATE_COMPANY_LICENSE";

// COMPANY TOUR

export const GET_TOUR_BY_ID_COMPANY = "GET_TOUR_BY_ID_COMPANY";

export const ADD_TOUR_BY_ID_COMPANY = "ADD_TOUR_BY_ID_COMPANY";

export const UPDATE_TOUR_BY_ID_TOUR = "UPDATE_TOUR_BY_ID_TOUR";

export const DELETE_TOUR_BY_ID_TOUR = "DELETE_TOUR_BY_ID_TOUR"

// COMPANY STATISITC

// ???
export const GET_COMPANY_BOOKING = "GET_COMPANY_BOOKING";

export const GET_COMPANY_REVIEW = "GET_COMPANY_REVIEW";


// BASIC
export const LOGIN = "LOGIN";

export const GET_DESTINATION = "GET_DESTINATION";

export const GET_TOURIST = "GET_TOURIST";

export const DELETE_ACCOUNT = "DELETE_ACCOUNT";

export const LOGOUT = "LOGOUT";

export const SIGNUP = "SIGNUP";

export const GET_INFO_BY_EMAIL = "GET_INFO_BY_EMAIL";

// TOURIST 
export const GET_TOURIST_INFO = "GET_TOURIST_INFO";

export const GET_TOUR_SEARCH = "GET_TOUR_SEARCH";

export const GET_GUIDE_SEARCH = "GET_GUIDE_SEARCH";

export const UPDATE_TOURIST_CART = "UPDATE_TOURIST_CART";

export const GET_TOURIST_BOOKING = "GET_TOURIST_BOOKING";