
import { RL } from "../../../../interface/responseInter";
import classes from "./RankingItem.module.css";
import Title from "../../../UI/Title/Title";

import SongItem from "./SongItem/SongItem";

import { useGetRankingListItemQuery } from "../../../../store/Api/songApi";

function RankingItem(props: RL) {

  const {data:songList,isSuccess:getSongListSuccess}=useGetRankingListItemQuery(props.id)


  return (
    <div className={classes.wrap}>
      <div>
        <Title title={props.name} type="childrenWrap" desc="深夜emo" />
      </div>
      <div>
        {getSongListSuccess &&
          songList.map((item, index) => (
            <SongItem
              key={item.id}
              id={item.id}
              name={item.name}
              no={index + 1}
              artist={item.ar}
            />
          ))}
      </div>
    </div>
  );
}

export default RankingItem;
