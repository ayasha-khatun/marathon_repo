import React from 'react';

const Banner = () => {
    return (
      <div className="w-full">
      <div className="carousel rounded-box h-[300px] md:h-[500px] w-full">
        <div className="carousel-item w-full relative">
          <img
            src="https://i.ibb.co/gFPJj6zX/c88a5bd0-234d-11f0-ae99-03809540dbba.jpg"
            className="w-full object-cover"
            alt="Banner 1"
          />
        </div>
        <div className="carousel-item w-full relative">
          <img
            src="https://i.ibb.co/gFPJj6zX/c88a5bd0-234d-11f0-ae99-03809540dbba.jpg"
            className="w-full object-cover"
            alt="Banner 2"
          />
        </div>
        <div className="carousel-item w-full relative">
          <img
            src="https://i.ibb.co/gFPJj6zX/c88a5bd0-234d-11f0-ae99-03809540dbba.jpg"
            className="w-full object-cover"
            alt="Banner 3"
          />
        </div>
        <div className="carousel-item w-full relative">
          <img
            src="https://i.ibb.co/gFPJj6zX/c88a5bd0-234d-11f0-ae99-03809540dbba.jpg"
            className="w-full object-cover"
            alt="Banner 4"
          />
        </div>
      </div>
    </div>
    );
};

export default Banner;