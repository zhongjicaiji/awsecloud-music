export type sheetT={
    url:string,
   
}
//艺术家类型
export type artist={
    id:number,
    name:string
}
//歌曲类型

export type song={
    id:number,
    ar:artist[],
    name:string,
    no:number
}
