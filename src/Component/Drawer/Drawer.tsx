import React, { useCallback, useRef, useState,memo } from "react";
import classes from "./Drawer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBolt,
  faEnvelopeOpen,
  faEye,
  faGear,
  faHeadset,
  faHeart,
  faMusic,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import ColorThief from "../Hooks/colorThief";


function Drawer({ close }: { close: Function }) {
  const [showImg, setShowImg] = useState(false);
  const colorThief = new ColorThief();
  const imgRef = useRef<HTMLImageElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const imgUrl =
  "https://p2.music.126.net/SBEm15YRlBj9vnYQhAimrA==/109951162990572542.jpg";
  // const getColor = useCallback(() => {
  
  //   if (imgRef.current && bg.current) {
  //     imgRef.current.crossOrigin = "Anonymous";
  //     const color: number[] = colorThief.getColor(imgRef.current, 1);
  //     console.log(color)
  //     color &&
  //      document.documentElement.style.setProperty(
  //         "--bg-color",
  //         `#F5F5F5`
  //       );
  //   }
  // }, [imgRef.current, bg.current, imgUrl]);

  return (
    <div ref={bg} className={classes.drawer}>
      <button
        type="button"
        onClick={() => {
          close();
        }}
        className={classes.close}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div className={classes.userInfo}>
        <div
          onClick={() => {
            setShowImg(true);
          }}
          className={classes.userHead}
        >
          <img
            ref={imgRef}
           
            className={classes.img}
            src={imgUrl}
            alt=""
          />
        </div>

        {showImg && (
          <div  
          className={classes.preImg}
          onClick={() => {
            setShowImg(false);
          }}>
            <img
              ref={imgRef}
              className={classes.bigImg}
              src={imgUrl}
              alt=""
            />
          </div>
        )}

        <p className={classes.userName}>呀嘞呀嘞dazer</p>
      </div>
      <ul className={classes.menu}>
        <li>
          <FontAwesomeIcon className={classes.icon} icon={faEnvelopeOpen} />
          <span>消息</span>
        </li>
        <li>
          <FontAwesomeIcon className={classes.icon} icon={faMusic} />
          <span> 我的歌单</span>
        </li>
        <li>
          <FontAwesomeIcon className={classes.icon} icon={faBolt} />
          <span>我的会员</span>
        </li>
        <li>
          <FontAwesomeIcon className={classes.icon} icon={faHeart} />
          <span>喜欢</span>
        </li>
        <li>
          <FontAwesomeIcon className={classes.icon} icon={faStar} />
          <span>收藏</span>
        </li>
        <li>
          <FontAwesomeIcon className={classes.icon} icon={faEye} />
          <span>历史记录</span>
        </li>
        <li>
          <FontAwesomeIcon className={classes.icon} icon={faHeadset} />
          <span>我的客服</span>
        </li>
        <li>
          <FontAwesomeIcon className={classes.icon} icon={faGear} />
          <span>设置</span>
        </li>
      </ul>
      <div className={classes.logout}>
        <button className={classes.logoutBtn}>退出登录</button>
      </div>
    </div>
  );
}

export default memo(Drawer)  ;
