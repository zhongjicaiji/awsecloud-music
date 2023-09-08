import { useCallback } from "react";
import { useSelector } from "react-redux";
import ColorThief from "./colorThief";
import { SongList } from "../../interface/responseInter";


const useColorThief=()=>{
       const currentSong:SongList=useSelector((state:any)=>state.SongListSlice)

    const colorThief = useCallback(( imgRef:HTMLImageElement) => {
        if (imgRef) {
          const thief = new ColorThief();
          imgRef.crossOrigin = "Anonymous";
    
          let color: number[][] = thief.getPalette(imgRef,2,[]);
          if(color.length){
            color.sort((a,b)=>{
              return (a[0]+a[1]+a[2])-(b[0]+b[1]+b[2])
            })
            document.documentElement.style.setProperty(
              "--my-color",
              ` linear-gradient(to top,
                rgb(${color[0][0]},${color[0][1]},${color[0][2]}) 15%,
                rgb(${color[1][0]},${color[1][1]},${color[1][2]}) ,
               
                rgb(${color[0][0]},${color[0][1]},${color[0][2]})
                `
            );
            document.documentElement.style.setProperty("--playControl-color",
            ` 
              rgb(${color[0][0]},${color[0][1]},${color[0][2]})
       
            
              `
            )
          }
      
        }
      }, [currentSong.currentSongId]);

      return colorThief
    
}

export default useColorThief





  
