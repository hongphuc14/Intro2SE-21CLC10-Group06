// import { GET_TOUR_GUIDE_BY_ID_GUIDE,
//         GET_GUIDE_LANGUAGUE_BY_ID_GUIDE,
//         GET_GUIDE_LICENSE_BY_ID_GUIDE,
//         GET_GUIDE_ATTRACTION_BY_ID_GUIDE } 
// from "../types";

// let user = {}
// const stateDefault = {
//     tour_guide_by_id_guide: {},
//     guide_language_by_id_guide: [],
//     guide_license_by_id_guide: [],
//     guide_attraction_by_id_guide: [],
// };

// export const FreelancerReducer = (state = stateDefault, action) => {
//     switch (action.type) {
//       case GET_TOUR_GUIDE_BY_ID_GUIDE: {
//         state.Tour_guide_by_id_guide = action.Tour_guide_by_id_guide;
//         return { ...state };
//       }

//       case GET_GUIDE_LANGUAGUE_BY_ID_GUIDE: {
//         state.Guide_language_by_id_guide = action.Guide_language_by_id_guide;
//         return { ...state };
//       }

//       case GET_GUIDE_LICENSE_BY_ID_GUIDE: {
//         state.GUIDE_LICENSE_BY_ID_GUIDE = action.GUIDE_LICENSE_BY_ID_GUIDE;
//         return { ...state };
//       }

//       case GET_GUIDE_ATTRACTION_BY_ID_GUIDE: {
//         state.GUIDE_ATTRACTION_BY_ID_GUIDE = action.GUIDE_ATTRACTION_BY_ID_GUIDE;
//         return { ...state };
//       }

//       default:
//         return { ...state };
//     }
//   };