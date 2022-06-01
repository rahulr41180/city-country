
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { countryReducer } from "./Country/reducer";

const rootReducer = combineReducers({
    allData : countryReducer,
})

export const store = createStore(

    rootReducer,
    applyMiddleware(thunk),
);

store.subscribe(() => {
    console.log("Subscribe : ",store.getState());
})