import React, { useState } from "react";
import * as S from "./style";
import backgroundImgL from "../assets/타원 1.png";
import backgroundImgRU from "../assets/타원 4.png";
import backgroundImgRD from "../assets/타원 3.png";
import profileImg from "../assets/이미지 2.png";

const Youtube = ({ subscribe, onCansleSubscribe, onSubscribe }) => {
  return (
    <S.MainWrapper>
      <S.backgroundImg>
        <img src={backgroundImgRU} />
        <img src={backgroundImgRD} />
        <img src={backgroundImgL} />
      </S.backgroundImg>
      <S.MainContainer>
        <div className="upWrapper">
          <img src={profileImg}></img>
          <div className="title">
            <h1>MBCentertainment</h1>
            <p>구독자 821만명</p>
          </div>
          <button subscribe={true}>{subscribe ? "구독중" : "구독"}</button>
          <button onClick={onSubscribe}>+</button>
          <button onClick={onCansleSubscribe}>-</button>
        </div>
        <div className="downWrapper"></div>
      </S.MainContainer>
    </S.MainWrapper>
  );
};

export default Youtube;
