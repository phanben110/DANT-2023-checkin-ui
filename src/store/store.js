import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import checkinReducer from "./slices/checkinSlice";
import classReducer from "./slices/classSlice"

const rootReducer = {
    userStore: userReducer,
    checkinStore: checkinReducer,
    classStore: classReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;