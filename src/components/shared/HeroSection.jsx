import React, { useState, useEffect } from "react";
import Button from "../ui/button";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = [
    {
      bgImageDesktop: "/images/1.png",
      bgImageMobile: "/images/mobile1.png",
      textColor: "text-white"
    },
    {
      bgImageDesktop: "/images/2.png",
      bgImageMobile: "/images/snapedit_1747988547002.jpg",
      textColor: "text-white"
    },
    {
      bgImageDesktop: "/images/3.png",
      bgImageMobile: "/images/mobile2.png",
      textColor: "text-white"
    },
    {
      bgImageDesktop: "/images/4.png",
      bgImageMobile: "/images/mobile3.png",
      textColor: "text-white"
    }
  ];

  const currentBgImage = (slide) => (isMobile ? slide.bgImageMobile : slide.bgImageDesktop);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) setCurrentSlide((prev) => (prev + 1) % slides.length);
    if (distance < -50) setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <div className="mb-20">
      <div className="relative h-[400px] md:h-[447px] overflow-hidden rounded-[10px] my-6 mx-4 md:mx-auto md:container">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 relative"
              style={{
                backgroundImage: `url(${currentBgImage(slide)})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className={`hidden container mx-auto px-4 py-12 md:py-16 relative z-10 h-full lg:flex items-center`}>
                <div className="w-full">
                  <div className="max-w-xl">
                    <h1 className={`text-2xl md:text-5xl font-bold ${slide.textColor} mb-3 md:mb-4`}>
                      {slide.title}
                    </h1>
                    {/* <div className="bg-red-500 text-white px-3 md:px-6 py-1.5 md:py-3 rounded-lg inline-block mb-5 md:mb-6 text-xl md:text-4xl font-bold shadow-md">
                      {slide.subtitle}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Навигационные точки */}
        <div className="absolute left-1/2 bottom-4 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-[2px] transition-all ${currentSlide === index
                ? "bg-yellow-400 w-6 scale-110"
                : "bg-[#364A5E] bg-opacity-50 hover:bg-opacity-75"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Стрелочки для десктопа */}
        {!isMobile && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="hidden md:flex absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full w-10 h-10 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="hidden md:flex absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full w-10 h-10 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HeroSection;