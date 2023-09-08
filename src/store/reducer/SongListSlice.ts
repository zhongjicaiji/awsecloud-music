import { createSlice} from "@reduxjs/toolkit";

const SongListSlice=createSlice({
    name:"SongList",
    initialState:()=>{
        let localList=localStorage.getItem('songList')
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
        currentIndex:-1  
      } 

    },
    reducers:{
        initSong(state,actions){
            const list=actions.payload.lists
        
            state.lists=[...list]
            state.currentIndex=actions.payload.index
            state.currentSongId=actions.payload.id
            localStorage.setItem('songList',JSON.stringify(state))
            
        },
        changeSong(state,actions){
            state.currentSongId=actions.payload.id;
            state.currentIndex=actions.payload.index
            localStorage.setItem('songList',JSON.stringify(state))
        }
    }
})
export const {initSong,changeSong}=SongListSlice.actions
export default SongListSlice
