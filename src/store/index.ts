import { configureStore } from "@reduxjs/toolkit"
import playSongSlice from "./reducer/PlaySongSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query";  
import SongListSilce from "./reducer/SongListSlice";  



const store=configureStore({
    reducer:{
        playSongSlice:playSongSlice.reducer,
        SongListSilce:SongListSilce.reducer
        
    },
    middleware:(getDefaultmiddleware=>
        getDefaultmiddleware().concat(
          
        )
    )
})
setupListeners(store.dispatch)

export default store