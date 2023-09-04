import { createSlice } from "@reduxjs/toolkit";

const SongListSlice=createSlice({
    name:"SongList",
    initialState:()=>{
        let localList=localStorage.getItem('songList')
        if(localList){
            return JSON.parse(localList)
        }


      return {
        lists:[{
            id: 4433364,
            v: 16,
            t: 0,
            at: 1445612322296,
            alg: null,
            uid: 54278024,
            rcmdReason: '',
            sc: null,
            f: null,
            sr: null
        }],
        currentSongId:0,
        currentSongUrl:"",
      } 

    },
    reducers:{
        initSong(state,actions){
            const list=actions.payload
            state.lists=[...list]
            localStorage.setItem('songList',JSON.stringify(state))
            
        },
        switchSong(state,actions?){
            state.currentSongUrl=actions.payload.url
            state.currentSongId=actions.payload.id
        }

    }
})
export const {initSong,switchSong}=SongListSlice.actions
export default SongListSlice
