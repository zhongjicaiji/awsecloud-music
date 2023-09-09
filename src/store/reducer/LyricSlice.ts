import { createSlice } from "@reduxjs/toolkit";
import {  LyricListT } from "../../interface/responseInter";

const LyricSlice=createSlice({
    name:'lyricSlice',
    initialState:<LyricListT>{
        currentTime:0,
        currentIndex:0,
        lyricList:[],
        currentStyle:{}

    },
    reducers:{
        scrollLyric(state,actions){
        
            state.currentIndex=actions.payload.currentIndex
            state.currentStyle=actions.payload.style
        },
        initLyric(state,actions){
            state.lyricList=[...actions.payload];
            state.currentIndex=0;
            state.currentTime=0;
            state.currentStyle={ 
                transform: 'translateY(0)'
            };
        }
    }
})
export const {scrollLyric,initLyric}=LyricSlice.actions
export default LyricSlice