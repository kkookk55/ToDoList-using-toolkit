import styled from 'styled-components';
import Layout from '../components/layout/Layout';
// import Burger from '../components/SideBar/Burger';
import Header from '../components/main/Header';
import SideBar from '../components/main/SideInput';
import TotalListBox from '../components/main/TotalListBox';
// import List from '../components/main/List';
// import '../Font.css'

const TodoList = () => {
    return (
        <Layout>
            {/* <Burger/> */}
            <Header/>
            <PositionBox>
                <TotalListBox/>     
            </PositionBox>           
        </Layout>
    )
}

export default TodoList;

const PositionBox = styled.div`
    width: 100vw;
    position: absolute;
    top: 130px;
    left: 0;
    right: 0;
    z-index:-1;
    overflow-x: hidden;
`
