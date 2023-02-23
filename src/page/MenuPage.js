import React from 'react';
import styled from 'styled-components';
import Banner from '../components/Banner';

const MenuStyle = styled.li`
    width:23%;
    margin:5%;
    img{
        width:100%;
        border-radius:50%;
    }
    div{
        text-align:center;
        margin-top:20px;
        .menutitle{
            font-size:25px;
            font-weight:500;
            padding-bottom:15px;
            border-bottom:2px solid #333;
        }
        .menudesc{
            margin-top:20px;
        }
        .menuprice{
            margin-top:20px;
            font-size:25px;
            font-weight:700;
        }
    }

`

const Menu = () =>{
    return(
    <MenuStyle>
        <img src='../imgs/Cookie.jpg' alt=''/>
        <div>
            <p className='menutitle'>메뉴이름</p>
            <p className='menudesc'>메뉴설명</p>
            <p className='menuprice'>메뉴가격</p>
        </div>
    </MenuStyle>
    )
}

const MenuPageStyled = styled.div`
    >h2{
        text-align:center;
        font-size:40px;
        margin-top:30px;
    }
    div:not(:first-child){
        ul{
            display:flex;
            flex-wrap:wrap;
            width:70%;
            margin:30px auto;
            overflow:hidden;
        }
        h2{
            text-align:center;
            margin-top:40px;
            font-weight:800;
            font-size:30px;
        }
    }
`


const MenuPage = () => {
    return (
        <MenuPageStyled>
            <Banner bannerColor={"#96F2E0"} TopTitle="9899" BottomTitle="THE MENUS"/>
            <h2>FLAVORS</h2>
            <div className='breads_menu'>
                <h2>BREADS</h2>
                <ul>
                    <Menu/>
                    <Menu/>
                    <Menu/>
                    <Menu/>
                </ul>
            </div>
            <div className='cookies_menu'>
                <h2>BREADS</h2>
                <ul>
                    <Menu/>
                    <Menu/>
                    <Menu/>
                    <Menu/>
                </ul>
            </div>
            <div className='drinks_menu'>
                <h2>BREADS</h2>
                <ul>
                    <Menu/>
                    <Menu/>
                    <Menu/>
                    <Menu/>
                </ul>
            </div>
        </MenuPageStyled>
    );
};

export default MenuPage;