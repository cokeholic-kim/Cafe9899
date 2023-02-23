import React from 'react';
import styled from 'styled-components';
import Banner from '../components/Banner';

const ComponentStyle = styled.div`
    margin-top:40px;
    height:40vh;
    color:#333;
    text-align:center;
    p{
        width:60%;
        margin:30px auto 0 auto;
    }

`
const Imageboxstyle = styled.div`
    height:30vh;
    background-color:turquoise;
    overflow:hidden;
    img{
        width:100%;
    }
`

const AboutComp = () =>{
    return(
        <ComponentStyle>
            <h2>OUR PLACE</h2>
            <h3>WE JUST LOVE DESSERT</h3>
            <p>
            I'm a paragraph. Click here to add your own text and edit me. It’s easy. 
            Just click “Edit Text” or double click me to add your own content and make 
            changes to the font. Feel free to drag and drop me anywhere you like on your page. 
            I’m a great place for you to tell a story and let your users know a little more about you.
            <br/>
            <br/>
            This is a great space to write long text about your company and your services. 
            You can use this space to go into a little more detail about your company. 
            Talk about your team and what services you provide. 
            Tell your visitors the story of how you came up with the idea for your business 
            and what makes you different from your competitors. 
            Make your company stand out and show your visitors who you are.  
            </p>
        </ComponentStyle>
    )
}

const About = () => {
    return (
        <div>
            <Banner bannerColor="#FFB79E" TopTitle="ABOUT" BottomTitle="DESSERT"/>
            <AboutComp/>
            <Imageboxstyle>
                <img src='../imgs/lotuscookie.jpg' alt=''/>
            </Imageboxstyle>
            <AboutComp/>
        </div>
    );
};

export default About;