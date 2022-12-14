import React from 'react';
import styled from 'styled-components';
import SideBar from '../main/SideBar';




const LeftNav = ({ open }) => {
  return (
    <>
    
    <BarBox open={open}>
      <SideBar/>
    </BarBox>
    </>
  )
}

export default LeftNav


const BarBox = styled.div`

    flex-flow: column nowrap;
    display: flex;
    align-items: center;
    background-color: #ffff;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0%)' : 'translateX(-100%)'};
    top: 0;
    left: 0;
    height: 100vh;
    width: 270px;
    padding: 4.5rem 0 0 0;
    margin-top: 0;
    transition: transform 0.5s ease-in-out;
`;

