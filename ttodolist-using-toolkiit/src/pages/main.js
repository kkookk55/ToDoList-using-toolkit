import React from 'react';
import Header from '../components/main/Header';
import List from '../components/main/List';
import SideBar from '../components/main/sideBar';
import styled from 'styled-components';


const Main = () => {
    return(
        <StBox>
            <Header/>
            <List/>
            <SideBar/>
        </StBox>
    )
}

export default Main;

const StBox = styled.div`
    margin: 0;
    width: 100vw;
    overflow-x: hidden;
    `