
import { createSlice } from "@reduxjs/toolkit";
import { CurrentSong } from "../../interface/responseInter";

 

 const playSongSlice=createSlice({
    name:'playSong',
    initialState:()=>{
        const state=sessionStorage.getItem('playingSong')
        if(state){
            
            return JSON.parse(state)
                
        }else{
            return {
                id: 0,
                playState:false,
                name:'',
                picUrl:'',
                dTime:0,
                fee:0,
                artistName:''
            
            }
        }
    },
    reducers:{
        initSongHandler(state,actions){
                state.id=actions.payload.id
                state.fee=actions.payload.fee
                state.name=actions.payload.name
                state.playState=actions.payload.playState
                state.dTime=actions.payload.dTime
                state.picUrl=actions.payload.picUrl
                state.artistName=actions.payload.artistName


                sessionStorage.setItem('playingSong',JSON.stringify(state) )
        },
        pauseHandler(state){
        
            state.playState=false
            sessionStorage.setItem('playingSong',JSON.stringify(state) )
        },
        playHandler(state){
            state.playState=true
            sessionStorage.setItem('playingSong',JSON.stringify(state) )
        },
        switchHandler(state,actions){
                state.id=actions.payload
                sessionStorage.setItem('playingSong',JSON.stringify(state) )
        }
     
        
        
    }
 })


 export const {initSongHandler, pauseHandler, playHandler,switchHandler }=playSongSlice.actions
 export default playSongSlice