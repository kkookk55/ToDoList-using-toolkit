import React from 'react';
import styled from 'styled-components';

const Layout = (props) => {
    return <StWrap>{props.children}</StWrap>;
  };

export default Layout;
const StWrap = styled.div`
  height: 100vh;
  width: 100vw;
  /* overflow-x: hidden; */
  margin: 0;
`