import React from 'react';
import styled from 'styled-components';
import Sliderimgs from '../components/Sliderimgs';

const ImgSlider = styled.div`
    &{
        width: 100%;
        overflow: hidden;
        ul{
            display: flex;
            transition: transform 0.5s ease;
            margin: 0;
            padding: 0;
            list-style: none;        
        }
    }
`

const Slider = () => {
    const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".slider img");
const imageWidth = images[0].clientWidth;
const numImages = images.length;
const sliderWidth = imageWidth * numImages;

slider.style.width = `${sliderWidth}px`;

let currentImage = 0;

function slide() {
  currentImage++;

  if (currentImage > numImages - 4) {
    currentImage = 0;
  }

  slider.style.transform = `translateX(${-imageWidth * currentImage}px)`;

  setTimeout(slide, 3000);
}

slide();



    return (
        <ImgSlider className='slider-container'>
            <ul className='slider'>
                <Sliderimgs imagename="Cookie.jpg"/>
                <Sliderimgs imagename="lotuscookie.jpg"/>
                <Sliderimgs imagename="muffin.jpg"/>
                <Sliderimgs imagename="saltbread.jpg"/>
                <Sliderimgs imagename="saltbread.jpg"/>
                <Sliderimgs imagename="saltbread.jpg"/>
            </ul>
        </ImgSlider>
    );
};

export default Slider;