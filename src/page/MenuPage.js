import React from 'react';
import styled from 'styled-components';

const Menu = () =>{
    return(
    <li>
        <img src='../imgs/Cookie.jpg'/>
        <h3>메뉴이름</h3>
        <p>메뉴설명</p>
        <h3>메뉴가격</h3>
    </li>

    )
}

const MenuPageStyled = styled.div`
`


const MenuPage = () => {
    return (
        <MenuPageStyled>
            <div>
                <p>9899</p>
                <h1>MENU'S</h1>
            </div>
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