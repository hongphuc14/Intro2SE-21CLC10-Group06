import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools} from "redux-devtools-extension";
import { BasicReducer } from "./reducers/BasicReducer";
import { FreelancerReducer } from "./reducers/FreelancerReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { CompanyReducer } from "./reducers/CompanyReducer";
import {TouristReducer } from './reducers/TouristReducer'
const rootReducer = combineReducers({
    BasicReducer,
    FreelancerReducer,
    CompanyReducer,
    LoadingReducer,
    TouristReducer
})

// cấu hình thunk
const middleWare = [thunk];
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWare)));