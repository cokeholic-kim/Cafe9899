import React from 'react';
import styled from 'styled-components';

const BannerStyle = styled.div`
        text-align:center;
        height:300px;
        padding-top:90px;
        color:#fff;
        background-color: ${props => props.bannerColor}; //#96F2E0;
        p{font-size:30px;font-weight:700;}
        h1{letter-spacing:10px; font-size:45px;}
`



const Banner = ({bannerColor,TopTitle,BottomTitle}) => {
    return (
        <BannerStyle bannerColor={bannerColor}>
                <p>{TopTitle}</p>
                <h1>{BottomTitle}</h1>
        </BannerStyle>
    );
};

export default Banner;