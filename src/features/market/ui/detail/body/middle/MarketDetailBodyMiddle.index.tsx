import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

import { useQueryIdChecker } from '@/shared/hooks/customs/useQueryIdChecker';
import { MDBM } from './MarketDetailBodyMiddle.css';
import { IMarketDetailBodyProps } from './MarketDetailBodyMiddle.types';
import { useMarketLike } from '@/shared/hooks/customs/useMarketLike';

declare const window: any;

export default function MarketDetailBodyMiddle(props: IMarketDetailBodyProps) {
  const { id: marketId } = useQueryIdChecker('marketId');
  const { onClickLike } = useMarketLike({ useditemId: marketId });

  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  useEffect(() => {
    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_API_KEY}&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(
            props.data?.fetchUseditem.useditemAddress?.lat || 37.5665,
            props.data?.fetchUseditem.useditemAddress?.lng || 126.978
          ),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(
          props.data?.fetchUseditem.useditemAddress?.lat || 37.5665,
          props.data?.fetchUseditem.useditemAddress?.lng || 126.978
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    };
  }, [props.data]);

  // remark 부가설명 2019 lte 32GB
  // name 상품이름 ex) 갤탭 10.1

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
                  <Image className={MDBM.Image} src={el} alt="Main Image" width={800} height={600} />
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
                    <Image className={MDBM.ThumbnailImage} src={el} alt="Thumbnail Image" width={200} height={150} />
                  </div>
                ))}
              </Slider>
            </div>
          </>
        ) : formattedImages.length === 1 ? (
          <div className={MDBM.MainImageWrapper}>
            <Image className={MDBM.Image} src={formattedImages[0]} alt="Main Image" width={800} height={600} />
          </div>
        ) : (
          <div className={MDBM.MainImageWrapper}>
            <Image
              className={MDBM.Image}
              src="/images/avatar.png"
              alt="Default Avatar"
              width={800}
              height={600}
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
      <div className={MDBM.LikeWrapper}>
        <div style={{ cursor: 'pointer' }} onClick={onClickLike}>
          💛
        </div>
        <div className={MDBM.LikeCount}>
          {props.data?.fetchUseditem?.pickedCount}
        </div>
      </div>
      <div style={{ padding: '40px 0', borderTop: '1px solid #e0e0e0' }}>
        <h3 style={{ marginBottom: '20px' }}>거래 지역</h3>
        {props.data?.fetchUseditem.useditemAddress?.address && (
          <div style={{ marginBottom: '10px' }}>
            {props.data?.fetchUseditem.useditemAddress?.address}{' '}
            {props.data?.fetchUseditem.useditemAddress?.addressDetail}
          </div>
        )}
        <div id="map" style={{ width: '100%', height: '360px' }}></div>
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
