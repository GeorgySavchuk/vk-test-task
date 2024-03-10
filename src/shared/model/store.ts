import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {catFactReducer} from './slices'
import {personFormReducer} from "./slices";

const rootReducer = combineReducers({
    catFactReducer,
    personFormReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']