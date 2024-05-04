import {createSlice} from "@reduxjs/toolkit";

export const darknessSlice = createSlice({
    name:'darkness',
    initialState:{
        value: false
    },
    reducers:{
        toggleDarkness: (darkness)=>{
            darkness.value = !(darkness.value)
        }
    }
})

export const {toggleDarkness} = darknessSlice.actions

export default darknessSlice.reducer