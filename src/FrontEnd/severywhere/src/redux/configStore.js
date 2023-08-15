import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools} from "redux-devtools-extension";
import { BasicReducer } from "./reducers/BasicReducer";
import { AdminReducer } from "./reducers/AdminReducer";
import { FreelancerReducer } from "./reducers/FreelancerReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { TouristReducer } from "./reducers/TouristReducer";
import { CompanyReducer } from "./reducers/CompanyReducer";
const rootReducer = combineReducers({ 
    BasicReducer,
    AdminReducer,
    FreelancerReducer,
    LoadingReducer,
    CompanyReducer,
    TouristReducer
})

// cấu hình thunk
const middleWare = [thunk];
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWare)));