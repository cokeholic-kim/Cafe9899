import React from 'react';
import styled from 'styled-components';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


const Menustyle = styled.div`
    height:100vh;
    .container{
        display: inline-block;
        width: 100%;
        text-align: left;
        position: relative;
        margin: 0 auto;
        padding: 0 48px;
        max-width: 1312px;
    }
    .menutitle{
        position:relative;
        top:20px;
        color:#000;
        font-size:96px;
        font-weight:800;
        margin:30px 0;
        span{
            color:red;
        }
    }
    .tabs{
        width:320px;
        ul{
            display:flex;
            flex-direction:column;
            flex-grow: 1;
            flex-shrink: 0;
            justify-content: flex-start;
        }
        li{
            height:auto;
            margin:28px 0;
            font-size:24px;
            font-weight:900;
        }
    }
    .Menuslides{
        position: absolute;
        overflow: hidden;
        width: 100%;
        min-width: 1320px;
        height: 516px;
        top: 50%;
        left: 50%;
        z-index: 0;
        margin: -200px 0 0 -90px;
        .box{
            width:300;
            height:300;
            img{width:100%}
        }
        .slick-slide{
            padding-right:40px;
        }
        .slick-active{
            width:300px !important;
        }

    }

`
const settings = {
    infinite:true,
    speed:500,
    slidesToShow:1,
    slidesToScroll:1,
    swipeToslide:true,
    cssEase:"linear",
    variableWidth: true
}

const MenuStory = () => {
    return (
        <Menustyle>
            <div className="container">
                <h1 className='menutitle'>9899 MENUS<span>.</span></h1>
                <div className='tabs'>
                    <ul>
                        <li>
                            <strong className="main-subtitle">Coffee & drinks</strong>
                        </li>                    
                        <li>
                            <strong className="main-subtitle">Bakery</strong>
                        </li>                    
                        <li>
                            <strong className="main-subtitle">Gift set</strong>
                        </li>                    
                    </ul>
                </div>
                <div className='Menuslides'>
                    <Slider {...settings}>
                        <div className='box'  style={{ width: 200 }}>
                            <img src='./imgs/Cookie.jpg'/>
                        </div>
                        <div className='box'   style={{ width: 200 }}>
                            <img src='./imgs/Cookie.jpg'/>
                        </div>
                        <div className='box'   style={{ width: 200 }}>
                            <img src='./imgs/Cookie.jpg'/>
                        </div>
                        <div className='box'  style={{ width: 200 }}>
                            <img src='./imgs/Cookie.jpg'/>
                        </div>
                    </Slider>
                </div>

            </div>
        </Menustyle>
    );
};

export default MenuStory;