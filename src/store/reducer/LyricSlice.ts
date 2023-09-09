import { createSlice } from "@reduxjs/toolkit";
import {  LyricListT } from "../../interface/responseInter";

const LyricSlice=createSlice({
    name:'lyricSlice',
    initialState:<LyricListT>{
        currentTime:0,
        currentIndex:0,
        lyricList:[],
        currentStyle:{},
        showLyric:false

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
           
        },
          setShowLyric(state){
            state.showLyric=! state.showLyric
        }
        
    }
})
export const {scrollLyric,initLyric,setShowLyric}=LyricSlice.actions
export default LyricSlice