import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Game from "./Game";


export default function Swiper({render, nombreIzq, nombreDer}) {
    


  


  return (
    <> 
    {render.length > 0 ? 
    <div className="carrusel slider-main-container">
      <div className="container">
        <swiper-container
          slides-per-view="1"
          space-between="16"
          loop="true"
          navigation="true"
          navigation-prev-el= {`.${nombreIzq}`}
          navigation-next-el={`.${nombreDer}`}
          breakpoints={JSON.stringify({
            0: {
              slidesPerView: 1,
            },

            900: {
              slidesPerView: 2,
            },

            1390: {
              slidesPerView: 3,
            },

            2000: {
              slidesPerView: 4,
            },
          })}
        >
          {render}
        </swiper-container>
      </div>
      <div className={`${nombreIzq} left`} role="button">
        <FaArrowLeft />
      </div>
      <div className={`${nombreDer} right`} role="button">
        <FaArrowRight />
      </div>
    </div>
    : null}
    </>
 
  );
}
