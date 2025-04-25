import { LB } from "./LayoutBanner.styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    <LB.Wrapper>
      <Slider {...settings}>
        <div>
          <LB.SliderItem src="/images/layout/banner01.png" />
        </div>
        <div>
          <LB.SliderItem src="/images/layout/banner02.png" />
        </div>
        <div>
          <LB.SliderItem src="/images/layout/banner03.png" />
        </div>
        <div>
          <LB.SliderItem src="/images/layout/banner04.png" />
        </div>
        <div>
          <LB.SliderItem src="/images/layout/banner05.png" />
        </div>
        <div>
          <LB.SliderItem src="/images/layout/banner06.png" />
        </div>
        <div>
          <LB.SliderItem src="/images/layout/banner07.png" />
        </div>
      </Slider>
    </LB.Wrapper>
  );
}
