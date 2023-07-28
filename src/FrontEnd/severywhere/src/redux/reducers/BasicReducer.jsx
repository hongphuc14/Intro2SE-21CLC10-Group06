import { GET_DESTINATION } 
from "../types";

const stateDefault = {
    destination: [{id_des: 1, name: "Ho Chi Minh City"},
                  {id_des: 1, name: "Ha Noi City"},
                  {id_des: 1, name: "Da Nang City"}],
};

export const BasicReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_DESTINATION: {
            state.destination = action.destination;
            return { ...state };
          }
      default:
        return { ...state };
    }
  };