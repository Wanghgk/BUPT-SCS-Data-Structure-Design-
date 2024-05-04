import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        id:-1,
        username:'',
        avatar:'',
        nickname:'',
        token:''
    },
    reducers:{
        setUserId:(state,action)=>{
            state.id = action.payload
        },
        setUserUsername:(state,action)=>{
            state.username = action.payload
        },
        setUserAvatar:(state,action)=>{
            state.avatar = action.payload
        },
        setUserNickname:(state,action)=>{
            state.nickname = action.payload
        },
        setUserToken:(state,action) =>{
            state.token = action.payload
            console.log(state.nickname)
        }

    }
})

export const {setUserId,setUserUsername,setUserAvatar,setUserNickname,setUserToken} = userSlice.actions

export default userSlice.reducer