import { useSelector as useReduxSelector,TypedUseSelectorHook } from "react-redux";
import { LyricListT,RouteStackT ,SongList,CurrentSong} from "./responseInter";
export type RootState={
    playControlSlice:{
        showStyle:boolean
    },
    LyricSlice:LyricListT,
    RouteStack:RouteStackT,
    SongListSlice:SongList,
    playSongSlice:CurrentSong,

}

export const useSelector:TypedUseSelectorHook<RootState>=useReduxSelector