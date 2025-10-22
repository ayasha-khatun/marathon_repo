import React, { useState, useEffect } from "react";

// Slide data with verified image URLs
const slides = [
  {
    img: "https://i.ibb.co/zTNYX5bz/download-1.png",
    title: "Join the Biggest Marathon of the Year",
    desc: "Run for health, community, and a better tomorrow.",
  },
  {
    img: "https://i.ibb.co/SXtpypL8/download.png",
    title: "Experience the Ultimate Fitness Challenge",
    desc: "Push your limits and achieve your goals!",
  },
  {
    img: "https://i.ibb.co/nNbspcWg/images.png",
    title: "Register Now and Be a Part of the Movement",
    desc: "Early bird discounts available until July 15.",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 4000);
    return () => clearInterval(timer);
  }, [length]);

  return (
    <div className="w-full h-[300px] md:h-[500px] overflow-hidden rounded  dark:bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.img}
            alt={`Slide ${index + 1}`}
            className="w-full h-[500px] object-cover block"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 py-20">
            <h2 className="text-3xl md:text-5xl text-orange-800 font-bold">{slide.title}</h2>
            <p className="mt-2 text-sm text-black font-bold md:text-lg">{slide.desc}</p>
          </div>
        </div>
      ))}

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
