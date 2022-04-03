const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplaySpeed: 5000,
  cssEase: 'linear',
  pauseOnHover: true,
  initialSlide: 0,
  lazyLoad: true,
};

export const productSliderSettings = {
  ...sliderSettings,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

export const categoryCarouselSettings = {
  ...sliderSettings,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};
