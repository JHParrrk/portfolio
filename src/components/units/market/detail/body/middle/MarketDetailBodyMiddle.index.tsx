import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useBoardLike } from "../../../../../commons/hooks/customs/useBoardLike";
import { useQueryIdChecker } from "../../../../../commons/hooks/customs/useQueryIdChecker";
import { MDBM } from "./MarketDetailBodyMiddle.styles";
import { IMarketDetailBodyProps } from "./MarketDetailBodyMiddle.types";

export default function MarketDetailBodyMiddle(props: IMarketDetailBodyProps) {
  const { id: marketId } = useQueryIdChecker("marketId");
  //   const { onClickLike, onClickDislike } = useBoardLike({
  //     boardId,
  //   });

  // remark 부가설명 2019 lte 32GB
  // name 상품이름 ex) 갤탭 10.1

  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  const images =
    props.data?.fetchUseditem.images?.filter((el: string) => el) || [];

  const mainSliderSettings = {
    fade: true,
    arrows: true,
  };

  const thumbnailSliderSettings = {
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    centerMode: images.length < 4,
  };

  return (
    <MDBM.Body>
      <MDBM.Title>{props.data?.fetchUseditem?.name}</MDBM.Title>
      <MDBM.Title>{props.data?.fetchUseditem?.name}</MDBM.Title>
      <MDBM.CarouselWrapper>
        <Slider
          {...mainSliderSettings}
          asNavFor={nav2 || undefined}
          ref={(slider) => setNav1(slider)}
          className="main-slider"
        >
          {images.map((el: string) => (
            <MDBM.MainImageWrapper key={el}>
              <MDBM.Image src={`https://storage.googleapis.com/${el}`} />
            </MDBM.MainImageWrapper>
          ))}
        </Slider>

        <MDBM.ThumbnailSliderWrapper>
          <Slider
            {...thumbnailSliderSettings}
            asNavFor={nav1 || undefined}
            ref={(slider) => setNav2(slider)}
          >
            {images.map((el: string) => (
              <MDBM.ThumbnailImageWrapper key={el}>
                <MDBM.ThumbnailImage
                  src={`https://storage.googleapis.com/${el}`}
                />
              </MDBM.ThumbnailImageWrapper>
            ))}
          </Slider>
        </MDBM.ThumbnailSliderWrapper>
      </MDBM.CarouselWrapper>
      {/* ======================== */}
      <MDBM.Contents
        dangerouslySetInnerHTML={{
          __html: props.data?.fetchUseditem?.contents || "",
        }}
      />
      {/* 리액트퀼 태그까지 출력하는거 수정 */}
      {/* {props.data?.fetchUseditem.youtubeUrl && (
        <MDBM.Youtube
          url={props.data?.fetchUseditem.youtubeUrl}
          width="486px"
          height="240px"
        />
      )} */}
      <MDBM.LikeWrapper>
        {/* <MDBM.IconWrapper>
          <MDBM.LikeIcon onClick={onClickLike} />
          <MDBM.LikeCount>
            {props.data?.fetchUseditem.pickedCount}
          </MDBM.LikeCount>
        </MDBM.IconWrapper> */}
        {/* <MDBM.IconWrapper>
          <MDBM.DislikeIcon onClick={onClickDislike} />
          <MDBM.DislikeCount>
            {props.data?.fetchUseditem.dislikeCount}
          </MDBM.DislikeCount>
        </MDBM.IconWrapper> */}
      </MDBM.LikeWrapper>
    </MDBM.Body>
  );
}
