import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../components/Banner';
import { API_URL } from '../config/apiurl';
import useAsync from '../customHook/useAsync';

const MenuStyle = styled.li`
    width:23%;
    margin:5%;
    display:flex;
    flex-direction:column;
    justify-content:center;

    img{
        width: 200px;
        height: 200px;
        border-radius:50%;
    }
    div{
        text-align:center;
        margin-top:20px;
        .menutitle{
            height:70px;
            border-bottom:2px solid #333;
            p{
                font-size:25px;
                font-weight:500;
                padding-bottom:15px;
            }
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


const Menu = ({menu}) =>{
    const navigate = useNavigate()
    const onClick = ()=>{
        navigate(`/menuDetail/${menu.m_number}`)
    }
    return(
    <MenuStyle>
        <div onClick={onClick}>
            <img src={`${API_URL}/upload/menu/${menu.m_img}`} alt=''/>
            <div>
                <div className='menutitle'>
                    <p>{menu.m_name}</p>
                </div>
                <p className='menudesc'>{menu.m_desc}</p>
                <p className='menuprice'>{menu.m_price} 원</p>
            </div>
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
            justify-content:flex-start;
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

async function menuFetch(){
    const response = await axios.get(`${API_URL}/getMenu`);
    return response.data
}

const MenuPage = () => {
    const {loading,error,data} = useAsync(()=>menuFetch(),[])
    if (loading) return <div>로딩중</div>
    if (error) return <div>에러발생</div>
    if (!data) return null  
    const bread = data.filter(e=>e.m_category === "bread")
    const drink = data.filter(e=>e.m_category === "drink")
    const giftset = data.filter(e=>e.m_category === "giftset")
    return (
        <MenuPageStyled>
            <Banner bannerColor={"#96F2E0"} TopTitle="9899" BottomTitle="THE MENUS"/>
            <h2>FLAVORS</h2>
            <div className='breads_menu'>
                <h2>BREADS</h2>
                <ul>
                    {bread.map((e,index)=><Menu key={index} menu={e}/>)}
                </ul>
            </div>
            <div className='cookies_menu'>
                <h2>DRINKS</h2>
                <ul>
                    {drink.map((e,index)=><Menu key={index} menu={e}/>)}
                </ul>
            </div>
            <div className='drinks_menu'>
                <h2>GIFTSET</h2>
                <ul>
                    {giftset.map((e,index)=><Menu key={index} menu={e}/>)}
                </ul>
            </div>
        </MenuPageStyled>
    );
};

export default MenuPage;