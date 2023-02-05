import { combineReducers, configureStore } from "@reduxjs/toolkit";
import partsReducer from "./parts";
import usersReducer from "./users";

const rootReducer = combineReducers({
    users: usersReducer,
    parts: partsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
