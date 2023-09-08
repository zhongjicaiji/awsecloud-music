import React, { useEffect, useState, memo, useRef, Suspense} from "react";
import classes from "./Banner.module.css";

import { useGetBannerQuery } from "../../../store/Api/bannerApi";

function Banner() {
  const [banners, setBanners] = useState<any[]>([]);

  const [index, setIndex] = useState<number>(0);


  const imgWrap = useRef<any>();
  const {data:bannerImg,isSuccess:getBannerSuccess}=useGetBannerQuery(null)
  useEffect(()=>{
    getBannerSuccess&&setBanners([...bannerImg, bannerImg[0]]);
  },[getBannerSuccess])

  const rollImgStart: () => any = () => {
    let timer = setTimeout(function move() {
      setIndex(index + 1);
      if (index === banners.length - 2) {
        imgWrap.current.addEventListener(
          "transitionend",
          transitionEndHandler,
          false
        );
      }
      imgWrap.current.style.transform = `translateX(${-710 * (index + 1)}rem)`;
 let timer2=  setTimeout(move,3000)
        clearTimeout(timer2)
    }, 3000);
    return timer;
  };

  const transitionEndHandler = () => {
    imgWrap.current.style.transitionProperty = "none";
    imgWrap.current.style.transform = `translateX(0rem)`;
    setTimeout(() => {
      setIndex(0);
      imgWrap.current.style.transitionProperty = "transform";
    }, 0);

    imgWrap.current.removeEventListener(
      "transitionend",
      transitionEndHandler,
      false
    );
  };

  const clickHandler = (id: number) => {
    setIndex(id);
    imgWrap.current.style.transform = `translateX(${-710 * id}rem)`;
  };



  useEffect(() => {
    let timer = rollImgStart();
    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  return (
    <Suspense>
 <div className={classes.banner}>
      <div ref={imgWrap} className={classes.imgWrap}>
        {getBannerSuccess &&
          banners.map((item, index) => (
            <img
              className={classes.img}
              key={item.imageUrl + index}
              src={item.imageUrl}
              alt="轮播图"
            />
          ))}
      </div>
      <div className={classes.pointer}>
        {getBannerSuccess &&
          banners.slice(0, 4).map((item, i) => (
            <b
              key={i}
              onClick={() => {
                clickHandler(i);
              }}
              className={index === i ? classes.active : ""}
            />
          ))}
      </div>
    </div>
    </Suspense>
   
  );
}

export default memo(Banner);
