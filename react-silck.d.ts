declare module "react-slick" {
  import * as React from "react";

  export interface CustomArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    currentSlide?: number;
    slideCount?: number;
  }

  export interface Settings {
    accessibility?: boolean;
    adaptiveHeight?: boolean;
    afterChange?: (currentSlide: number) => void;
    appendDots?: (dots: React.ReactNode) => React.ReactNode;
    arrows?: boolean;
    asNavFor?: Slider;
    autoplay?: boolean;
    autoplaySpeed?: number;
    beforeChange?: (currentSlide: number, nextSlide: number) => void;
    centerMode?: boolean;
    centerPadding?: string;
    className?: string;
    cssEase?: string;
    customPaging?: (index: number) => React.ReactNode;
    dots?: boolean;
    dotsClass?: string;
    draggable?: boolean;
    easing?: string;
    edgeFriction?: number;
    fade?: boolean;
    focusOnSelect?: boolean;
    infinite?: boolean;
    initialSlide?: number;
    lazyLoad?: "ondemand" | "progressive";
    nextArrow?: React.ReactNode;
    onEdge?: (swipeDirection: string) => void;
    onInit?: () => void;
    onLazyLoadError?: () => void;
    onReInit?: () => void;
    onSwipe?: (swipeDirection: string) => void;
    pauseOnDotsHover?: boolean;
    pauseOnFocus?: boolean;
    pauseOnHover?: boolean;
    prevArrow?: React.ReactNode;
    responsive?: Array<{ breakpoint: number; settings: Settings }>;
    rows?: number;
    rtl?: boolean;
    slide?: string;
    slidesPerRow?: number;
    slidesToScroll?: number;
    slidesToShow?: number;
    speed?: number;
    swipe?: boolean;
    swipeEvent?: (swipeDirection: string) => void;
    swipeToSlide?: boolean;
    touchMove?: boolean;
    touchThreshold?: number;
    useCSS?: boolean;
    useTransform?: boolean;
    variableWidth?: boolean;
    vertical?: boolean;
    verticalSwiping?: boolean;
    waitForAnimate?: boolean;
  }

  export class Slider extends React.Component<Settings, any> {
    slickNext: () => void;
    slickPause: () => void;
    slickPlay: () => void;
    slickPrev: () => void;
    slickGoTo: (slide: number, dontAnimate?: boolean) => void;
    slickCurrentSlide: () => number;
  }

  export default Slider;
}
