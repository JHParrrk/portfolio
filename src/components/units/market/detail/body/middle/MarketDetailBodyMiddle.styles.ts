import styled from "@emotion/styled";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";

export const MDBM = {
  // =================================================
  // Body & Contents Styles
  // =================================================
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

  // =================================================
  // Image Carousel Styles
  // =================================================
  CarouselWrapper: styled.div`
    width: 100%;
    max-width: 600px; /* 캐러셀 전체 최대 너비 */
    margin: 30px auto; /* 위아래 여백 및 가운데 정렬 */

    /* react-slick 라이브러리 클래스 커스터마이징 */
    .slick-prev::before,
    .slick-next::before {
      font-size: 30px;
      color: #aaa;
    }
    
    .slick-prev {
      left: -40px; /* 왼쪽 화살표 위치 */
    }

    .slick-next {
      right: -40px; /* 오른쪽 화살표 위치 */
    }

    .slick-dots li button:before {
      color: #ddd;
    }

    .slick-dots li.slick-active button:before {
      color: #ffd600; /* 활성화된 점 색상 */
    }
  `,

  MainImageWrapper: styled.div`
    position: relative;
    width: 100%;
    padding-top: 100%; /* 1:1 비율 정사각형을 만들기 위한 트릭 */
  `,

  Image: styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지가 Wrapper에 꽉 차도록 */
  `,

  ThumbnailSliderWrapper: styled.div`
    margin-top: 20px;
    
    /* 썸네일 슬라이더의 각 아이템에 좌우 여백을 주어 잘리지 않게 함 */
    .slick-slide {
      padding: 0 5px;
    }
  `,

  ThumbnailImageWrapper: styled.div`
    cursor: pointer;
    border: 3px solid transparent; /* 평상시 테두리는 투명 */
    border-radius: 5px;
    overflow: hidden;
    transition: border-color 0.3s; /* 테두리 색상 변경 시 부드러운 효과 */

    /* 현재 선택된 썸네일(.slick-current)의 Wrapper에 스타일 적용 */
    .slick-current & {
      border-color: #ffd600; /* 활성화 시 노란색 테두리 */
    }
  `,

  ThumbnailImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block; /* 이미지 하단 여백 제거 */
  `,

  // =================================================
  // Like & Dislike Styles
  // =================================================
  LikeWrapper: styled.div`
    padding-top: 160px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px; /* 아이콘 그룹 간의 간격 */
  `,

  IconWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  LikeIcon: styled(LikeOutlined)`
    font-size: 24px;
    color: #ffd600;
    cursor: pointer;
  `,

  DislikeIcon: styled(DislikeOutlined)`
    font-size: 24px;
    color: #828282;
    cursor: pointer;
  `,

  LikeCount: styled.div`
    padding-top: 4px;
    color: #ffd600;
  `,

  DislikeCount: styled.div`
    padding-top: 4px;
    color: #828282;
  `,

  // =================================================
  // Youtube Player & Other Styles
  // =================================================
  Youtube: styled(ReactPlayer)`
    margin: auto;
  `,
};