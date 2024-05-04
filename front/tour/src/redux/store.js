import { configureStore } from '@reduxjs/toolkit'
import darknessReducer from './features/LeftBar/darknessSlice'
import diaryStateReducer from './features/Diary/diaryStateSlice'
import userReducer from "./features/Login/userSlice";

export default configureStore({
    reducer: {
        darkness:darknessReducer,
        diaryState: diaryStateReducer,
        user:userReducer,
    }
})