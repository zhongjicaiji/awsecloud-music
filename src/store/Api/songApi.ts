import baseApi from "./baseAPI";
import { SongT, sheetDataT, RL,sheetDetailT } from "../../interface/responseInter";
import { song } from "../../interface/propsInterface";


const songApi = baseApi.injectEndpoints({
  endpoints(builder) {
    return {
      getSongData: builder.query({
        query: (id: number) => {
          return `/song/detail?ids=${id}`;
        },

        transformResponse: (response: { songs: SongT[] }): SongT => {
          return response.songs[0];
        },
      }),
      getSongUrl: builder.query({
        query: (id: number) => {
          return `/song/url?id=${id}`;
        },
        transformResponse: (response: { data: any[] }): any => {
          return response.data[0];
        },
      }),
      getSongSheet: builder.query({
        query: (url: string) => {
          return url;
        },
        transformResponse: (response: {
          result: sheetDataT[];
        }): sheetDataT[] => {
          return response.result;
        },
      }),
      getRankingList: builder.query({
        query: () => {
          return "/toplist/detail";
        },
        transformResponse: (response: { list: RL[] }): RL[] => {
          return response.list.slice(0, 5);
        },
      }),
      getRankingListItem:builder.query({
        query:(id:number)=>{
          return `/playlist/track/all?id=${id}&limit=3`
        },
        transformResponse:(response:{songs:song[]}):song[]=>{
            return response.songs
        }
      }),
      getSheetInfo:builder.query({
        query:(id:number)=>{
          return `/playlist/detail?id=${id}`
        },
        transformResponse:(response:{playlist:sheetDetailT}):sheetDetailT=>{
          return response.playlist
        }
      })
    };
  },
});
export const {
  useGetSongDataQuery,
  useGetSongUrlQuery,
  useGetSongSheetQuery,
  useGetRankingListQuery,
  useGetRankingListItemQuery,
  useGetSheetInfoQuery
} = songApi;
export default songApi;
