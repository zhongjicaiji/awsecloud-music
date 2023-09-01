import { configureStore } from "@reduxjs/toolkit"
import playSongSlice from "./reducer/PlaySongSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query";    



const store=configureStore({
    reducer:{
        playSongSlice:playSongSlice.reducer
    },
    middleware:(getDefaultmiddleware=>
        getDefaultmiddleware().concat(
          
        )
    )
})
setupListeners(store.dispatch)

export default store