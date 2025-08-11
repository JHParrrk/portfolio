import styled from "@emotion/styled";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";

export const BDBM = {
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
  ImageWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* 이미지를 가운데 정렬하는 것이 좋습니다. */
  `,
  Image: styled.img`
    width: 75%; /* 부모(ImageWrapper)의 4분의3 */
    height: auto; /* width에 비례하여 높이를 자동으로 조절합니다. */
    max-width: 996px; /* 이미지의 최대 너비를 996px로 제한합니다. */
    margin-bottom: 30px;
  `,
};
