import React from 'react';
import styled from 'styled-components';

const Titlestyle = styled.div`
    padding: 60px 0px;
    text-align: center;
    h2{
        display: block;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }
`

const Title = ({title}) => {
    return (
        <Titlestyle>
           <h2>{title}</h2> 
        </Titlestyle>
    );
};

export default Title;