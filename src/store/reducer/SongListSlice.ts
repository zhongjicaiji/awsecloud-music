import { createSlice, current } from "@reduxjs/toolkit";

const SongListSlice=createSlice({
    name:"SongList",
    initialState:()=>{
        let localList=sessionStorage.getItem('songList')
        if(localList){

            return JSON.parse(localList)
        }
      return {
        lists:[{
            id: 0,
            playState:false,
            name:'',
            picUrl:'',
            dTime:0,
            fee:0,
            artistName:'',
            currentTime:0,
        }],
        currentSongId:0,
        currentSongUrl:"",
        currentIndex:0  
      } 

    },
    reducers:{
        initSong(state,actions){
            const list=actions.payload.lists
            console.log(actions.payload)
            state.lists=[...list]
       
        //    console.log(actions.payload.index)
            state.currentIndex=actions.payload.index
            state.currentSongId=actions.payload.id
            sessionStorage.setItem('songList',JSON.stringify(state))
            
        },
        switchSong(state,actions){
            state.index=actions.payload.index
            state.currentSongUrl=actions.payload.url
            state.currentSongId=actions.payload.id
            sessionStorage.setItem('songList',JSON.stringify(state))
        },
        changeSong(state,actions){
            state.currentSongId=actions.payload.id;
            state.currentIndex=actions.payload.index
            sessionStorage.setItem('songList',JSON.stringify(state))
        }
        
        

    }
})
export const {initSong,switchSong,changeSong}=SongListSlice.actions
export default SongListSlice
