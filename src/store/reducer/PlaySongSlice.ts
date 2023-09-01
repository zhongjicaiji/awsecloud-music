
import { createSlice } from "@reduxjs/toolkit";


 const playSongSlice=createSlice({
    name:'playSong',
    initialState:{
        id:0,
        playState:false

    },
    reducers:{
        playHandler(state,actions){

        }
    }
 })


 export const {playHandler }=playSongSlice.actions
 export default playSongSlice