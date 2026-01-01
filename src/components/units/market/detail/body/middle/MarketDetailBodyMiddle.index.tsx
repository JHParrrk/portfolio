import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useQueryIdChecker } from "../../../../../commons/hooks/customs/useQueryIdChecker";
import { MDBM } from "./MarketDetailBodyMiddle.styles";
import { IMarketDetailBodyProps } from "./MarketDetailBodyMiddle.types";

export default function MarketDetailBodyMiddle(props: IMarketDetailBodyProps) {
  const { id: marketId } = useQueryIdChecker("marketId");

  // remark 부가설명 2019 lte 32GB
  // name 상품이름 ex) 갤탭 10.1

  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  const images =
    props.data?.fetchUseditem.images?.filter((el: string) => el) || [];

  const formattedImages = images.map((el) =>
    el.startsWith("https://")
      ? el
      : `https://storage.googleapis.com/${encodeURI(el)}`
  );

  const mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const thumbnailSliderSettings = {
    slidesToShow: images.length < 4 ? images.length : 4,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    infinite: images.length > 4,
    centerMode: false,
  };

  return (
    <MDBM.Body>
      <MDBM.Remarks>{props.data?.fetchUseditem?.remarks}</MDBM.Remarks>
      <MDBM.Title>{props.data?.fetchUseditem?.name}</MDBM.Title>
      <MDBM.Price>
        {props.data?.fetchUseditem?.price?.toLocaleString()}원
      </MDBM.Price>
      <MDBM.CarouselWrapper>
        {formattedImages.length > 1 ? (
          <>
            <Slider
              {...mainSliderSettings}
              asNavFor={nav2 || undefined}
              ref={(slider) => setNav1(slider)}
              className="main-slider"
            >
              {formattedImages.map((el: string) => (
                <MDBM.MainImageWrapper key={el}>
                  <MDBM.Image src={el} />
                </MDBM.MainImageWrapper>
              ))}
            </Slider>

            <MDBM.ThumbnailSliderWrapper>
              <Slider
                {...thumbnailSliderSettings}
                asNavFor={nav1 || undefined}
                ref={(slider) => setNav2(slider)}
              >
                {formattedImages.map((el: string) => (
                  <MDBM.ThumbnailImageWrapper key={el}>
                    <MDBM.ThumbnailImage src={el} />
                  </MDBM.ThumbnailImageWrapper>
                ))}
              </Slider>
            </MDBM.ThumbnailSliderWrapper>
          </>
        ) : formattedImages.length === 1 ? (
          <MDBM.MainImageWrapper>
            <MDBM.Image src={formattedImages[0]} />
          </MDBM.MainImageWrapper>
        ) : (
          <MDBM.MainImageWrapper>
            <MDBM.Image
              src="/images/avatar.png"
              style={{ objectFit: "contain", opacity: 0.5 }}
            />
          </MDBM.MainImageWrapper>
        )}
      </MDBM.CarouselWrapper>
      {/* ======================== */}
      <MDBM.Contents
        dangerouslySetInnerHTML={{
          __html: props.data?.fetchUseditem?.contents || "",
        }}
      />
      <MDBM.Tags>
        {props.data?.fetchUseditem?.tags?.map((el: string, index: number) => (
          <MDBM.Tag key={`${el}_${index}`}>{el}</MDBM.Tag>
        ))}
      </MDBM.Tags>
      {/* 리액트퀼 태그까지 출력하는거 수정 */}
      {/* {props.data?.fetchUseditem.youtubeUrl && (
        <MDBM.Youtube
          url={props.data?.fetchUseditem.youtubeUrl}
          width="486px"
          height="240px"
        />
      )} */}
      <MDBM.LikeWrapper></MDBM.LikeWrapper>
    </MDBM.Body>
  );
}
