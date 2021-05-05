import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import styles from "./ImageSlider.module.scss";
const ImageSlider = ({ slides }: any) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    console.log("IMAGESLIDER RENDERED");
    console.log(slides);
  });
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!slides || !Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  const length = slides.length;

  return (
    <section className={styles.slider}>
      <IoIosArrowBack className={styles.left_arrow} onClick={prevSlide} />

      <div className={styles.img_container}>
        {slides.map((slide: any, index: number) => {
          return (
            <div
              className={
                index === current
                  ? `${styles.slide} ${styles.active}`
                  : `${styles.slide}`
              }
              key={index}
            >
              {index === current && (
                <img src={slide} alt="travel image" className={styles.image} />
              )}
            </div>
          );
        })}
      </div>
      <IoIosArrowForward className={styles.right_arrow} onClick={nextSlide} />
    </section>
  );
};

export default ImageSlider;
