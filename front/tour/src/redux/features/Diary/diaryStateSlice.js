import {createSlice} from "@reduxjs/toolkit";

export const diaryStateSlice = createSlice({
    name:'diaryState',
    initialState:{
        scrollY: 0,
        articles:[],
        requestTimes:0,
    },
    reducers:{
        setDiaryScrollY:(state,action)=>{
            state.scrollY = action.payload
        },
        setDiaryArticles:(state,action) =>{
            state.articles = [...action.payload]
        },
        incRequestTimes:(state)=>{
            state.requestTimes += 1;
        }
    }
})

export const {setDiaryScrollY,setDiaryArticles,incRequestTimes} = diaryStateSlice.actions

export default diaryStateSlice.reducer