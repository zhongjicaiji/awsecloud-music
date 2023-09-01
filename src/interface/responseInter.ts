import { artist, song } from "./propsInterface";
//歌单详情
export interface sheetData {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  playCount: number;
  trackCount: number;
  trackNumberUpdateTime: number;
  canDislike: boolean;
  highQuality: boolean;
}
//排行榜详情
export interface RL {
  ToplistType: string;
  adType: number;
  anonimous: boolean;
  artists: string;
  backgroundCoverId: number;
  backgroundCoverUrl:string;
  cloudTrackCount: number;
  commentThreadId:string;
  coverImageUrl:string;
  coverImgId:number;
  coverImgId_str:string;
  coverImgUrl:string;
  coverText: string;
  createTime: number;
  creator: any;
  description: string;
  englishTitle: string;
  highQuality:boolean;
  iconImageUrl: string;
  id: number;
  name: string;
  newImported: boolean;
  opRecommend: boolean;
  ordered: boolean;
  playCount: number;
  privacy: number;
  recommendInfo: any;
  socialPlaylistCover: any;
  specialType: number;
  status: number;
  subscribed: any;
  subscribedCount:number;
}
//歌单详情类型

export interface trackIdT{
  id:number,
  at:number,
  t:number,
  uid:number,
  v:number
}
export interface sheetDetailT{
  id:number,
  description:string,
  name:string,
  tags:string[],
  trackCount:number,
  trackIds:trackIdT[],
  tracks:song[],
  coverImgUrl:string,
  creator:any,
  commentCount:number,
  shareCount:number,
  subscribedCount:number,
  playCount:number
}
export interface playSongsT{
  count:number|undefined,
  trackIds:trackIdT[]|undefined,
}

//歌曲详情
export interface SongT{
    name:string,
    id:number,
    fee:0|1|4|8,
    dt:number,
    ar:artist[]
    
}