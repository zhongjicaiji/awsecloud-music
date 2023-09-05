import { configureStore } from "@reduxjs/toolkit"
import playSongSlice from "./reducer/PlaySongSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query";  
import SongListSlice from "./reducer/SongListSlice";  
import RouteStack from "./router/RouteStack";
import baseApi from "./Api/baseAPI";



const store=configureStore({
    reducer:{
        playSongSlice:playSongSlice.reducer,
        SongListSlice:SongListSlice.reducer,
        RouteStack:RouteStack.reducer,
        [baseApi.reducerPath]:baseApi.reducer

    },
    middleware:(getDefaultMiddleware=>
        getDefaultMiddleware().concat(
          baseApi.middleware
        )
    )
})
setupListeners(store.dispatch)

export default store