import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useQueryIdChecker } from '@/shared/hooks/customs/useQueryIdChecker';
import { MDBM } from './MarketDetailBodyMiddle.css';
import { IMarketDetailBodyProps } from './MarketDetailBodyMiddle.types';

export default function MarketDetailBodyMiddle(props: IMarketDetailBodyProps) {
  const { id: marketId } = useQueryIdChecker('marketId');

  // remark 부가설명 2019 lte 32GB
  // name 상품이름 ex) 갤탭 10.1

  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  const images =
    props.data?.fetchUseditem.images?.filter((el: string) => el) || [];

  const formattedImages = images.map((el) =>
    el.startsWith('https://')
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
    <div className={MDBM.Body}>
      <div className={MDBM.Remarks}>{props.data?.fetchUseditem?.remarks}</div>
      <h1 className={MDBM.Title}>{props.data?.fetchUseditem?.name}</h1>
      <div className={MDBM.Price}>
        {props.data?.fetchUseditem?.price?.toLocaleString()}원
      </div>
      <div className={MDBM.CarouselWrapper}>
        {formattedImages.length > 1 ? (
          <>
            <Slider
              {...mainSliderSettings}
              asNavFor={nav2 || undefined}
              ref={(slider) => setNav1(slider)}
              className="main-slider"
            >
              {formattedImages.map((el: string) => (
                <div className={MDBM.MainImageWrapper} key={el}>
                  <img className={MDBM.Image} src={el} />
                </div>
              ))}
            </Slider>

            <div className={MDBM.ThumbnailSliderWrapper}>
              <Slider
                {...thumbnailSliderSettings}
                asNavFor={nav1 || undefined}
                ref={(slider) => setNav2(slider)}
              >
                {formattedImages.map((el: string) => (
                  <div className={MDBM.ThumbnailImageWrapper} key={el}>
                    <img className={MDBM.ThumbnailImage} src={el} />
                  </div>
                ))}
              </Slider>
            </div>
          </>
        ) : formattedImages.length === 1 ? (
          <div className={MDBM.MainImageWrapper}>
            <img className={MDBM.Image} src={formattedImages[0]} />
          </div>
        ) : (
          <div className={MDBM.MainImageWrapper}>
            <img
              className={MDBM.Image}
              src="/images/avatar.png"
              style={{ objectFit: 'contain', opacity: 0.5 }}
            />
          </div>
        )}
      </div>
      {/* ======================== */}
      <div
        className={MDBM.Contents}
        dangerouslySetInnerHTML={{
          __html: props.data?.fetchUseditem?.contents || '',
        }}
      />
      <div className={MDBM.Tags}>
        {props.data?.fetchUseditem?.tags?.map((el: string, index: number) => (
          <span className={MDBM.Tag} key={`${el}_${index}`}>
            {el}
          </span>
        ))}
      </div>
      {/* 리액트퀼 태그까지 출력하는거 수정 */}
      {/* {props.data?.fetchUseditem.youtubeUrl && (
        <ReactPlayer
          className={MDBM.Youtube}
          url={props.data?.fetchUseditem.youtubeUrl}
          width="486px"
          height="240px"
        />
      )} */}
      <div className={MDBM.LikeWrapper}></div>
    </div>
  );
}
