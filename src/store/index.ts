import { configureStore } from "@reduxjs/toolkit"
import playSongSlice from "./reducer/PlaySongSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query";  
import SongListSlice from "./reducer/SongListSlice";  
import RouteStack from "./router/RouteStack";



const store=configureStore({
    reducer:{
        playSongSlice:playSongSlice.reducer,
        SongListSlice:SongListSlice.reducer,
        RouteStack:RouteStack.reducer
    },
    middleware:(getDefaultmiddleware=>
        getDefaultmiddleware().concat(
          
        )
    )
})
setupListeners(store.dispatch)

export default store