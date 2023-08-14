import { GET_DESTINATION, 
        LOGIN } 
from "../types";

export const stateDefault = {
  // tourist
  user_login: {email: "phmyxlinh@gmail.com", role: 1},

  // freelancer
    // user_login: {email: "tunglamtran.work@gmail.com", role: 3},

  // company
    // user_login: {email: "ldgroup@gmail.com"},
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