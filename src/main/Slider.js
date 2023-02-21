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
    return (
        <ImgSlider className='slider-container'>
            <ul className='slider'>
                <Sliderimgs imagename="Cookie.jpg"/>
                <Sliderimgs imagename="lotuscookie.jpg"/>
                <Sliderimgs imagename="muffin.jpg"/>
                <Sliderimgs imagename="saltbread.jpg"/>
            </ul>
        </ImgSlider>
    );
};

export default Slider;