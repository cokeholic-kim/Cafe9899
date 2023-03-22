import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import axios from 'axios';
import { API_URL } from '../config/apiurl';
import useAsync from '../customHook/useAsync';


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
        top:130px;
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
        position:relative;
        top:300px;
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
            cursor: pointer;
            &.active{
                border-bottom:1px solid #333;
            }
        }
    }
    .Menuslides{
        position: absolute;
        overflow: hidden;
        width: 100%;
        min-width: 1320px;
        height: 516px;
        top: 140%;
        left: 35%;
        z-index: 0;
        margin: -200px 0 0 -90px;
        .productname{
            background-color:#000;
            color:#fff;
            text-align:center;
            width:112px;
            line-height:40px;
            position:relative;
            top: 78.3%;
            left: 10%;
            z-index: 2;
        }
        .slick-track{
            display:flex;
            align-items:flex-end;
        }
        .box{
            img{width:400px;height:400px}
        }
        .slick-slider {
            margin:0 -15px;
        }
        .slick-slide {
            padding:10px;
            text-align:center;
            margin:0 15px;
            width: 400px;
            height: 400px;
        }        
        .slick-prev {
            left:110px;
            z-index: 4;
            top:96%;
            width:40px;
            height:40px;
            background-color: #000;

        }
        .slick-next {
            right: 78%;
            top:96%;
            width:40px;
            height:40px;
            background-color: #000;
            z-index: 2;
        }
        .slick-prev:before{
            width: 40px;
            height: 40px;
            content:"";
            display:block;
            line-height:1;
            background:url('./imgs/ico_arrow_left.svg') 50% 50% no-repeat; 
            color: #fff;        
        }
        .slick-next:before {
            width: 40px;
            height: 40px;
            content:"";
            display:block;
            line-height:1;
            background:url('./imgs/ico_arrow_right.svg') 50% 50% no-repeat; 
            color: #fff;        
        }

    }
`


const MenuStory = ({data}) => {
    const menutitle = useRef()
    const bread = data.filter(e=>e.m_category === "bread")
    const drink = data.filter(e=>e.m_category === "drink")
    const giftset = data.filter(e=>e.m_category === "giftset")
    const [category,setcategory] = useState(drink)
    const onClick = (e)=>{
        let list = document.querySelectorAll('#menuclick li')
        console.log(e.target)
        console.log(list)
        list.forEach(li=>{
            if(e.target === li){
                if(e.target.className === 'Drinks'){
                    setcategory(drink)
                }else if(e.target.className === 'Bakery'){
                    setcategory(bread)
                }else{
                    setcategory(giftset)
                }
                li.classList.add('active');
            } else {
                li.classList.remove('active')
            }
        })
    }

    const settings = {
        className:'center',
        speed:500,
        slidesToShow:1,
        slidesToScroll:1,
        swipeToslide:true,
        cssEase:"linear",
        variableWidth: true,
        afterChange:(e)=>menutitle.current.innerText =(category[e].m_name)
    }
    
    return (
        <Menustyle>
            <div className="container"> 
                <h1 className='menutitle'>9899 MENUS<span>.</span></h1>
                <div className='tabs'>
                    <ul id='menuclick' onClick={onClick}>
                        <li className="Drinks active">
                            Coffee & drinks
                        </li>                    
                        <li className="Bakery">
                            Bakery
                        </li>                    
                        <li className="Giftset">
                           Gift set
                        </li>                    
                    </ul>
                </div>
                <div className='Menuslides'>
                    <div className='productname' ref={menutitle}>
                        {category[0].m_name}
                    </div>
                    <Slider {...settings}>
                        {category.map(menu=><div key={menu.m_number} className='box' style={{width:400,height:400}}><img src={`${API_URL}/upload/menu/${menu.m_img}`}/></div>)}
                        {/* <div className='box' style={{width:400}}>
                            <img src='./imgs/Cookie.jpg'/>
                        </div>
                        <div className='box' style={{width:400}}>
                            <img src='./imgs/Cookie.jpg'/>
                        </div>
                        <div className='box' style={{width:400}}>
                            <img src='./imgs/Cookie.jpg'/>
                        </div>
                        <div className='box' style={{width:400}}>
                            <img src='./imgs/Cookie.jpg'/>
                        </div> */}
                    </Slider>
                </div>

            </div>
        </Menustyle>
    );
};

export default MenuStory;