import React, { useState } from 'react';
import { SliderData } from "../components/SliderData";
import "../css/slider.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <section className="home-slider">
            <FaChevronLeft className="left-arrow" onClick={prevSlide} />
            <FaChevronRight className="right-arrow" onClick={nextSlide} />
            {/* <i class="fas fa-angle-left" className="left-arrow" onClick={prevSlide} ></i>
            <i class="fas fa-angle-right" className="right-arrow" onClick={nextSlide}></i> */}
            {SliderData.map((slide, index) => {
                return (<div
                    className={index === current ? 'slide active' : 'slide'}
                    key={index}
                >
                    {index === current && (
                        <img src={slide.image} alt='slider' className='slider-img' />
                    )}
                </div>)
            }
            )}
        </section>

    );
};

export default ImageSlider;