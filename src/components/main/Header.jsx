import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return(
        <StBox>
            <StTitle>TTODOLIST</StTitle>
        </StBox>
    )
}

export default Header;

const StBox = styled.div`
    width: 100vw;
    height: 50px;
    margin-top: 80px;
    background-color: #EEC0C0;
    align-items: center;
    display: flex;
`

const StTitle = styled.h1`
    font-size: 18px;
    font-weight: bold;
    color: white;
    padding-left: 20px;
    
`