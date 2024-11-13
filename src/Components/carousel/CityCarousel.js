import React from "react";
import Slider from "react-slick";
import './CityCarousel.css'
export default function CityCarousel() {
  
    var settings = {
        dots: true,                // Show navigation dots
        infinite: false,            // Loop the slides infinitely
        speed: 500,                // Transition speed in ms
        slidesToShow: 4,           // Number of slides to show at once
        slidesToScroll: 1,         // Number of slides to scroll at once
        autoplay: true,            // Enable autoplay
        autoplaySpeed: 3000,       // Speed for autoplay, in ms
        arrows: false,              // Show previous/next arrows
        pauseOnHover: true,        // Pause autoplay when the user hovers over a slide
        responsive: [              // Responsive breakpoints for different screen sizes
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: false,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
        fade: false,               // Use fade effect instead of sliding
        centerMode: false,          // Enable centered view with partial previous/next slides
        centerPadding: '50px',     // Padding on sides when centerMode is enabled
        focusOnSelect: false,       // Enable focus on selected slide
      };
      
  return (
    <div className='container' style={{marginTop:'50px'}}>
    <div className="mt-20">
    <Slider {...settings}>
        <div className="card outerCard">
          <div className="flex flex-col justify-center citiesCard bg-1">
            <p className="text-xl font-semibold">Palasa</p>
            <p>8 Properties</p>
          </div>
        </div>
        <div className="card outerCard">
          <div className="flex flex-col justify-center citiesCard bg-2">
          <p className="text-xl font-semibold">Srikakulam</p>
          <p>2 Properties</p>
          </div>
        </div>
        <div className="card outerCard">
          <div className="flex flex-col justify-center citiesCard bg-3">
          <p className="text-xl font-semibold">IChapuram</p>
          <p>8 Properties</p>
          </div>
        </div>
        <div className="card outerCard">
          <div className="flex flex-col justify-center citiesCard bg-4">
          <p className="text-xl font-semibold">Pathapatnam</p>
          <p>6 Properties</p>
          </div>
        </div>
        <div className="card outerCard">
          <div className="flex flex-col justify-center citiesCard bg-5">
          <p className="text-xl font-semibold">Tikkali</p>
          <p>1 Properties</p>
          </div>
        </div>
    </Slider>
    </div>
  </div>
  )
}
