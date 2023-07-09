import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools} from "redux-devtools-extension";


// cấu hình thunk
const middleWare = [thunk];
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWare)));