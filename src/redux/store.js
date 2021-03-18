import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { doctorListReducers } from "./reducers/doctorListReducers";

const reducers = combineReducers({ doctorList: doctorListReducers });
const logger = createLogger();

const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger));

export default store;
