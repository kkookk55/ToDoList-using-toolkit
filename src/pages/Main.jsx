
import Layout from '../components/layout/Layout';
import Header from '../components/main/Header';
import SideBar from '../components/main/SideBar';
import Navbar from '../components/SideBar/Navbar';
// import List from '../components/main/List';
// import '../Font.css'

const TodoList = () => {
    return (
        <Layout>
            <Header/>
            <SideBar/>
            <Navbar/>
            {/* <List/> */}
        </Layout>
    )
}

export default TodoList;