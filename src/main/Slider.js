import React from 'react';
import styled from 'styled-components';
import Sliderimgs from '../components/Sliderimgs';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { API_URL } from '../config/apiurl';
import useAsync from '../customHook/useAsync';

const ImgSlider = styled.div`
    width: 100%;
    overflow: hidden;
    margin-bottom:-4px;
    .slick-prev {
        left:0;
        z-index: 9999;
    }
    .slick-next {
        right: 40px;
        z-index: 9999;
    }
    .slick-prev:before,
    .slick-next:before {
        position: absolute;
        top: 50%;
        transform:translateY(-50%);
        width: 40px;
        height: 90px;
        opacity: 0.75;
        border-radius: 30px;
        background-color: #fff;
        color: #6666;
    }
`
async function PostFetch(){
    const response = await axios.get(`${API_URL}/getPost`);
    return response.data
}

const SliderComp = () => {
    const {loading,error,data} = useAsync(()=>PostFetch(),[])
    if (loading) return <div>로딩중</div>
    if (error) return <div>에러발생</div>
    if (!data) return null  

    console.log(data)
    const settings = {
        // dots:false,
        infinite: true,
        speed:500,
        slidesToShow:4,
        slidesToScroll:1,
        // 반응형 슬라이드구문
        responsive:[
            {
                breakpoint:1200,
                settings:{
                    slidesToShow:3,
                }
            },
            {
                breakpoint:1023,
                settings:{
                    slidesToShow:2,
                }
            },
            {
                breakpoint:1023,
                settings:{
                    slidesToShow:1,
                }
            }
        ]
    }
    return (
        <ImgSlider>
            <Slider {...settings}>
                {data.map(e=><Sliderimgs imagename={e.p_img}/>)}
                    {/* <Sliderimgs imagename="Cookie.jpg"/>
                    <Sliderimgs imagename="lotuscookie.jpg"/>
                    <Sliderimgs imagename="muffin.jpg"/>
                    <Sliderimgs imagename="saltbread.jpg"/>
                    <Sliderimgs imagename="Cookie.jpg"/>
                    <Sliderimgs imagename="lotuscookie.jpg"/>
                    <Sliderimgs imagename="muffin.jpg"/>
                    <Sliderimgs imagename="saltbread.jpg"/>
 */}
            </Slider>
        </ImgSlider>
        // <ImgSlider>
        //     <ul className='slider'>
                // <Sliderimgs imagename="Cookie.jpg"/>
                // <Sliderimgs imagename="lotuscookie.jpg"/>
                // <Sliderimgs imagename="muffin.jpg"/>
                // <Sliderimgs imagename="saltbread.jpg"/>
        //     </ul>
        // </ImgSlider>
    );
};

export default SliderComp;