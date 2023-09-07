
import { createSlice } from "@reduxjs/toolkit";


 

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
                artistName:'',
                currentTime:0,
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
                state.currentTime=actions.payload.currentTime|| state.currentTime

                sessionStorage.setItem('playingSong',JSON.stringify(state) )
        },
        toggleHandler(state,actions){
        
            state.playState=actions.payload
            sessionStorage.setItem('playingSong',JSON.stringify(state) )
        },
        switchHandler(state,actions){
                state.id=actions.payload
                sessionStorage.setItem('playingSong',JSON.stringify(state) )
        },
        saveRange(state,actions){
            state.currentTime=actions.payload
            sessionStorage.setItem('playingSong',JSON.stringify(state) )
        }   
    }
 })


 export const {initSongHandler,toggleHandler,switchHandler,saveRange }=playSongSlice.actions
 export default playSongSlice