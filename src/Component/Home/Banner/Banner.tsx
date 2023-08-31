import React, { useEffect, useState, memo, useRef, useCallback } from "react";
import classes from "./Banner.module.css";

import useAxios from "../../Hooks/useAxios";

function Banner() {
  const [banners, setBanners] = useState<any[]>([]);

  const [index, setIndex] = useState<number>(0);
  const { data, loading, axiosRequire } = useAxios();

  const imgWrap = useRef<any>();

  useEffect(() => {
    loading && setBanners([...data.banners.slice(0, 4), data.banners[0]]);
  }, [loading]);
  const rollImgStart: () => any = () => {
    let timer = setInterval(function () {
      setIndex(index + 1);
      if (index === banners.length - 2) {
        imgWrap.current.addEventListener(
          "transitionend",
          transitionEndHandler,
          false
        );
      }
      imgWrap.current.style.transform = `translateX(${-710 * (index + 1)}rem)`;
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
    axiosRequire("/banner");
  }, []);

  useEffect(() => {
    let timer = rollImgStart();
    return () => {
      clearInterval(timer);
    };
  }, [index]);

  return (
    <div className={classes.banner}>
      <div ref={imgWrap} className={classes.imgWrap}>
        {loading &&
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
        {loading &&
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
  );
}

export default memo(Banner);