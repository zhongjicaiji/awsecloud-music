
import { createSlice } from "@reduxjs/toolkit";
import { CurrentSong } from "../../interface/responseInter";

 

 const playSongSlice=createSlice({
    name:'playSong',
    initialState:()=>{
        if(localStorage.getItem('playingSong')){
            let state:CurrentSong=JSON.parse(localStorage.getItem('playingSong') as string)
            return state
                
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


                localStorage.setItem('playingSong',JSON.stringify(state) )
        },
        pauseHandler(state?){
            state.playState=false
        },
        playHandler(state?){
            state.playState=true
        },
        
        
    }
 })


 export const {initSongHandler, pauseHandler, playHandler }=playSongSlice.actions
 export default playSongSlice