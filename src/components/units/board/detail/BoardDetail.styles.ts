import styled from "@emotion/styled";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";

export const BD = {
  // BoardDetail
  Custombody: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  Wrapper: styled.div`
    width: 1200px;
    margin: 100px;
  `,
  CardWrapper: styled.div`
    border: 1px solid black;
    padding-top: 80px;
    padding-bottom: 100px;
    padding-left: 102px;
    padding-right: 102px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    box-shadow: 0px 0px 10px gray;
  `,
  Header: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #bdbdbd;
    padding-bottom: 20px;
  `,
  AvatarWrapper: styled.div`
    display: flex;
    flex-direction: row;
  `,
  Avatar: styled.img`
    margin-right: 10px;
  `,
  Info: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  Writer: styled.div``,

  CreatedAt: styled.div``,

  Body: styled.div`
    width: 100%;
    min-height: 800px;
  `,
  Title: styled.h1`
    padding-top: 80px;
  `,
  Contents: styled.div`
    padding-top: 40px;
    padding-bottom: 120px;
  `,
  BottomWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 80px;
  `,
  Button: styled.button`
    width: 179px;
    height: 45px;
    background-color: white;
    border: 1px solid gray;
    margin: 0px 12px;
    cursor: pointer;

    :hover {
      background-color: gold;
      border-color: white;
    }
  `,
  IconWrapper: styled.div`
    text-align: center;
  `,
  Youtube: styled(ReactPlayer)`
    margin: auto;
  `,
  LikeWrapper: styled.div`
    padding-top: 160px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  `,
  LocationIcon: styled.img``,
  LikeIcon: styled(LikeOutlined)`
    font-size: 24px;
    color: #ffd600;
    margin: 0px 20px;
    cursor: pointer;
  `,
  DislikeIcon: styled(DislikeOutlined)`
    font-size: 24px;
    color: #828282;
    margin: 0px 20px;
    cursor: pointer;
  `,
  LikeCount: styled.div`
    color: #ffd600;
  `,
  DislikeCount: styled.div`
    color: #828282;
  `,
  LinkIcon: styled.img``,
};
