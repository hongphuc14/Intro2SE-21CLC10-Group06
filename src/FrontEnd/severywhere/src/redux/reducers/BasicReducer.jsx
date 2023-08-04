import { GET_DESTINATION, 
        LOGIN } 
from "../types";

export const stateDefault = {
    user_login: {id_guide: 1,	password: "********",	avatar: "logo512.png",	fullname: "Tran Tung Lam",	birthday: "1998-12-05",	
      gender: 0,	email: "tunglamtran.work@gmail.com", phone: "0865966366",	id_des: 2,
      experience: "2 years",	description: "Although I only have 2 years of experience, I am confident that I have the skills to help you have the best trip experience possible.",	
      price_per_session: 48.00,	free_cancellation: true,	id_role: 3},
    destination: [{id_des: 1, name: "Ho Chi Minh City"},
                  {id_des: 2, name: "Ha Noi City"},
                  {id_des: 3, name: "Da Nang City"}],
};

export const BasicReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LOGIN:{
          return {...state, action: action.user_login}
        }
        case GET_DESTINATION: {
          return { ...state, destination: action.destination };
        }
      default:
        return { ...state };
    }
  };