
import { RL } from "../../../../interface/responseInter";
import classes from "./RankingItem.module.css";
import Title from "../../../UI/Title/Title";

import SongItem from "./SongItem/SongItem";

import { useGetRankingListItemQuery } from "../../../../store/Api/songApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forward } from "../../../../store/router/RouteStack";

function RankingItem(props: RL) {
  const dispatch=useDispatch()


  const songList=props.tracks
  const nav=useNavigate()

  const toRankingPageHandler=()=>{
    dispatch(forward(`/RankingPage/${props.id}`))
    nav(`/RankingPage/${props.id}`,{
      replace:false,
      state:{
        method:"PUSH",
   
      }
    })
  }

  

  return (
    <div onClick={toRankingPageHandler} className={classes.wrap}>
      <div>
        <Title title={props.name} type="childrenWrap" desc="深夜emo" />
      </div>
      <div>
        {
          songList.slice(0,3).map((item, index) => (
            <SongItem
              key={item.first}
              name={item.first}
              no={index + 1}
              artistName={item.second}
            />
          ))}
      </div>
    </div>
  );
}

export default RankingItem;
