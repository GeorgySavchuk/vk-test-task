import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PanelsState {
    activePanel: string;
}

const initialState: PanelsState = {
    activePanel: "Часть 1"
}
const panelSlice = createSlice({
    name: "panel",
    initialState,
    reducers: {
        setActivePanel: (state = initialState, action: PayloadAction<string>) => {
            state.activePanel = action.payload
        }
    }
})
export const {setActivePanel} = panelSlice.actions
export default panelSlice.reducer
