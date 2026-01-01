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
    padding: 20px;
    background-color: #ffffff; /* White background for a clean look */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    border-radius: 10px; /* Rounded corners for a modern feel */
  `,

  Title: styled.h1`
    font-size: 36px;
    font-weight: bold;
    padding-top: 20px;
    color: #333333; /* Darker text for better readability */
  `,

  Remarks: styled.div`
    font-size: 18px;
    color: #757575; /* Softer gray for secondary text */
    padding-top: 4px;
  `,

  Price: styled.div`
    font-size: 36px;
    font-weight: bold;
    padding-top: 8px;
    padding-bottom: 40px;
    border-bottom: 1px solid #e0e0e0; /* Lighter border for a cleaner look */
    width: 100%;
    color: #ff5722; /* Highlight price with a vibrant color */
  `,

  Contents: styled.div`
    padding-top: 40px;
    padding-bottom: 40px;
    line-height: 1.8; /* Increased line height for better readability */
    color: #424242; /* Neutral dark gray for content */
  `,

  Tags: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 40px;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
  `,

  Tag: styled.span`
    color: #616161; /* Neutral gray for tags */
    font-size: 16px;
    background-color: #f5f5f5; /* Light background for tags */
    padding: 5px 10px;
    border-radius: 5px; /* Rounded corners for tags */
  `,

  // =================================================
  // Image Carousel Styles
  // =================================================
  CarouselWrapper: styled.div`
    width: 100%;
    max-width: 600px;
    margin: 30px auto;
    background-color: #fafafa; /* Light background for carousel */
    border-radius: 10px;
    padding: 10px;

    .slick-prev::before,
    .slick-next::before {
      font-size: 30px;
      color: #9e9e9e; /* Softer gray for arrows */
    }

    .slick-prev {
      left: -40px;
    }

    .slick-next {
      right: -40px;
    }

    .slick-dots li button:before {
      color: #bdbdbd;
    }

    .slick-dots li.slick-active button:before {
      color: #ff5722; /* Highlight active dot */
    }
  `,

  MainImageWrapper: styled.div`
    position: relative;
    width: 100%;
    padding-top: 100%;
    border-radius: 10px;
    overflow: hidden;
    background-color: #eeeeee; /* Neutral background for images */
  `,

  Image: styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1); /* Slightly larger hover effect */
    }
  `,

  ThumbnailSliderWrapper: styled.div`
    margin-top: 20px;

    .slick-slide {
      padding: 0 5px;
    }
  `,

  ThumbnailImageWrapper: styled.div`
    cursor: pointer;
    border: 3px solid transparent;
    border-radius: 5px;
    overflow: hidden;
    transition: border-color 0.3s;

    .slick-current & {
      border-color: #ff5722; /* Highlight active thumbnail */
    }
  `,

  ThumbnailImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  `,

  // =================================================
  // Like & Dislike Styles
  // =================================================
  LikeWrapper: styled.div`
    padding-top: 160px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  `,

  IconWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  LikeIcon: styled(LikeOutlined)`
    font-size: 24px;
    color: #ff5722; /* Vibrant color for like icon */
    cursor: pointer;
  `,

  DislikeIcon: styled(DislikeOutlined)`
    font-size: 24px;
    color: #9e9e9e; /* Softer gray for dislike icon */
    cursor: pointer;
  `,

  LikeCount: styled.div`
    padding-top: 4px;
    color: #ff5722;
  `,

  DislikeCount: styled.div`
    padding-top: 4px;
    color: #9e9e9e;
  `,

  // =================================================
  // Youtube Player & Other Styles
  // =================================================
  Youtube: styled(ReactPlayer)`
    margin: auto;
    border-radius: 10px; /* Rounded corners for video player */
    overflow: hidden;
  `,
};
