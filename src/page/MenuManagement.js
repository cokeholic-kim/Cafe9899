import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../util/cookie';

const MenuManagement = () => {
    const navigate = useNavigate()
    const isLogin = useSelector(state=>state.logincheck.isLogin)
    const username = getCookie("username")
    const [formData,setFormData] = useState({
        m_name:"",
        m_price:0,
        m_desc:"",
        m_img:""
    })

    return (
        <div>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>메뉴이름</td>
                            <td><input type="text" name="m_name"/></td>
                        </tr>
                        <tr>
                            <td>가격</td>
                            <td><input type="number" name="m_price"/></td>
                        </tr>
                        <tr>
                            <td>설명</td>
                            <td><textarea name="m_desc" rows={4} cols={30}/></td>
                        </tr>
                        <tr>
                            <td>상품 이미지</td>
                            <td><input type="file" name="m_img"/></td>
                            {/* {formData.r_img3 && <div><img src={`${API_URL}/upload/event/${formData.r_img3}`} width="100px" alt=''/></div>}</td> */}
                        </tr>

                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default MenuManagement;