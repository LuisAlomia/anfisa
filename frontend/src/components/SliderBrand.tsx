"use client";
import { useState, useRef, useEffect } from "react";
import { fetchBrands } from "@/services/fetchBrand";
import { CardBrand } from "@/app/components/CardBrand";
import { modelbrand } from "@/models/modelbrand";

interface Props {
  data: modelbrand[];
}

const SliderBrand = ({ data }: Props) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  //const [data,setData] = useState([])

  /* useEffect(()=>{
    //alert('rendered')
    async function fetchBrandData() {
      const brands = await fetchBrands();
      setData(brands)
    }
    fetchBrandData();
  },[]) */

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null
      //&&
      //@ts-ignore
      //carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      //@ts-ignore
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? //@ts-ignore
        carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="w-[100]">
      <div className="carousel my-4 mx-auto">
        <div className="relative overflow-hidden">
          <div className="flex justify-between absolute top left w-full h-full">
            <button
              onClick={movePrev}
              className="hover:bg-[#f2c4dc] text-[#f472b6] w-[3rem] h-[3rem] text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-[3] p-1 mx-0 my-auto transition-all ease-in-out duration-300 flex justify-center items-center rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="sr-only">Prev</span>
            </button>
            <button
              onClick={moveNext}
              className="hover:bg-[#f2c4dc] text-[#f472b6] w-[3rem] h-[3rem] text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-[3] p-1 mx-0 my-auto transition-all ease-in-out duration-300 flex justify-center items-center rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="sr-only">Next</span>
            </button>
          </div>
          <div
            ref={carousel}
            className="carousel-container relative flex overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
          >
            {data.map((item: modelbrand, index) => {
              return (
                <div
                  key={index}
                  className="carousel-item text-center relative w-[9rem] h-auto snap-start p-2"
                >
                  <CardBrand key={item.id} data={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderBrand;
