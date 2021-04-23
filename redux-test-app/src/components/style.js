import styled, { keyframes, css } from "styled-components";

const CircleAnim = keyframes`
0%{
  left: 85%;
  bottom: 67%;
}
50%{
  left: 80%;
  bottom: 65%;
}
100%{
  left: 85%;
  bottom: 67%;
}
`;

const CircleAnim2 = keyframes`
0%{
  left: 94%;
    bottom: 60%;
}
50%{
  left: 90%;
    bottom: 55%;
}
100%{
  left: 94%;
    bottom: 60%;
}
`;
const CircleAnim3 = keyframes`
0%{
  left: -6%;
    bottom: -10%;
}
50%{
  left: 0%;
    bottom: 0%;
}
100%{
  left: -6%;
    bottom: -10%;
}
`;

export const MainWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f1f1f1;
  z-index: -2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div`
  z-index: 100;
  width: 1224px;
  height: 504px;
  background-color: #f9f9f9;
  border: solid 1px #707070;
  border-radius: 56px;
  padding: 0 0 0 48px;
  display: flex;
  flex-direction: column;
  .upWrapper {
    display: flex;
    align-items: center;
    height: 60%;
    width: 100%;
    border-radius: 56px;
    img {
      width: 200px;
      height: 200px;
    }
    button {
      ${(props) =>
        props.subscribe
          ? css`
              background-color: #ff0000;
              border: none;
              color: #f9f9f9;
            `
          : css`
              background-color: #ececec;
              border: #707070 solid 1px;
              color: #606060;
            `}
      width: 180px;
      height: 100px;
      font-size: 34px;
      cursor: pointer;
/*       margin-left: 233px; */
    }
    .title {
      margin-left: 78px;
      font-family: "Segoe UI";
      h1 {
        font-size: 50px;
      }
      p {
        font-size: 30px;
        padding-top: 22px;
      }
    }
  }
  .downWrapper {
    width: 100%;
    height: 40%;
    border-radius: 56px;
  }
`;

export const backgroundImg = styled.div`
  img {
    position: absolute;
  }
  img:nth-child(1) {
    left: 85%;
    bottom: 67%;
    width: 401px;
    height: 422px;
    animation: ${CircleAnim} 24s infinite;
  }
  img:nth-child(2) {
    left: 94%;
    bottom: 60%;
    width: 244px;
    height: 246px;
    z-index: -1;
    animation: ${CircleAnim2} 24s infinite;
  }
  img:nth-child(3) {
    left: -6%;
    bottom: -10%;
    width: 401px;
    height: 422px;
    animation: ${CircleAnim3} 24s infinite;
  }
`;
