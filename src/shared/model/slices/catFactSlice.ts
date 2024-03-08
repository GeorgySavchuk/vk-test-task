import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICatFact} from "../../api";
interface CatFactState {
    catFact: ICatFact;
    isError: boolean;
    wasRequested: boolean;
}

const initialState: CatFactState = {
    catFact: {
        fact: "",
        length: 0
    },
    isError: false,
    wasRequested: false
}
const catFactSlice = createSlice({
    name: "catFact",
    initialState,
    reducers: {
        setCatFact: (state = initialState, action: PayloadAction<ICatFact>) => {
            state.catFact = action.payload
        },
        setError: (state = initialState, action: PayloadAction<boolean>) => {
            state.isError = action.payload
        },
        setWasRequested: (state = initialState, action: PayloadAction<boolean>) => {
            state.wasRequested = action.payload
        }
    }
})
export const {setCatFact, setError, setWasRequested} = catFactSlice.actions
export default catFactSlice.reducer