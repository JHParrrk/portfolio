import { LB } from './LayoutBanner.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

export default function LayoutBanner(): JSX.Element {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5초마다 슬라이드 전환
  };

  return (
    <div className={LB.Wrapper}>
      <Slider {...settings}>
        <div>
          <Image
            className={LB.SliderItem}
            src="/images/layout/banner01.png"
            alt="Banner 01"
            width={800}
            height={400}
          />
        </div>
        <div>
          <Image
            className={LB.SliderItem}
            src="/images/layout/banner02.png"
            alt="Banner 02"
            width={800}
            height={400}
          />
        </div>
        <div>
          <Image
            className={LB.SliderItem}
            src="/images/layout/banner03.png"
            alt="Banner 03"
            width={800}
            height={400}
          />
        </div>
        <div>
          <Image
            className={LB.SliderItem}
            src="/images/layout/banner04.png"
            alt="Banner 04"
            width={800}
            height={400}
          />
        </div>
        <div>
          <Image
            className={LB.SliderItem}
            src="/images/layout/banner05.png"
            alt="Banner 05"
            width={800}
            height={400}
          />
        </div>
        <div>
          <Image
            className={LB.SliderItem}
            src="/images/layout/banner06.png"
            alt="Banner 06"
            width={800}
            height={400}
          />
        </div>
        <div>
          <Image
            className={LB.SliderItem}
            src="/images/layout/banner07.png"
            alt="Banner 07"
            width={800}
            height={400}
          />
        </div>
      </Slider>
    </div>
  );
}
