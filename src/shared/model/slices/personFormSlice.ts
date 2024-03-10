import {createSlice, PayloadAction} from "@reduxjs/toolkit";
interface PersonFormState {
    wasSubmitted: boolean;
    firstVisit: boolean;
    isEmptyRequest: boolean;
}

const initialState: PersonFormState = {
    wasSubmitted: false,
    firstVisit: true,
    isEmptyRequest: true
}

const personFormSlice = createSlice({
    name: "personForm",
    initialState,
    reducers: {
        setWasSubmitted: (state = initialState, action: PayloadAction<boolean>) => {
            state.wasSubmitted = action.payload
        },
        setFirstVisit: (state = initialState, action: PayloadAction<boolean>) => {
            state.firstVisit = action.payload
        },
        setIsEmptyRequest: (state = initialState, action: PayloadAction<boolean>) => {
            state.isEmptyRequest = action.payload
        }
    }
})
export const {
    setWasSubmitted,
    setFirstVisit,
    setIsEmptyRequest
} = personFormSlice.actions
export default personFormSlice.reducer