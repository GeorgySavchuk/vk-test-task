import {createSlice, PayloadAction} from "@reduxjs/toolkit";
interface PersonFormState {
    wasSubmitted: boolean;
    firstVisit: boolean;
    isEmptyRequest: boolean;
    previousRequest: string;
}

const initialState: PersonFormState = {
    wasSubmitted: false,
    firstVisit: true,
    isEmptyRequest: true,
    previousRequest: ""
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
        },
        setPreviousRequest: (state = initialState, action: PayloadAction<string>) => {
            state.previousRequest = action.payload
        }
    }
})
export const {
    setWasSubmitted,
    setFirstVisit,
    setIsEmptyRequest,
    setPreviousRequest
} = personFormSlice.actions
export default personFormSlice.reducer