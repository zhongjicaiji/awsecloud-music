import { createSlice } from "@reduxjs/toolkit";

const playControlSlice=createSlice({
    name:"playControlSlice",
    initialState:{
        showStyle:true
    },
    reducers:{
        switchPCStyle:(state)=>{
            state.showStyle=!state.showStyle
        }
    }

})
export const {switchPCStyle}=playControlSlice.actions
export default playControlSlice