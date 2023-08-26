import { Route} from "react-router";
import { Fragment, useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AdminTemplate.scss";
import logo from "./horizontal_black.png";
import { logOutAction } from "../../redux/actions/BasicAction";
import { updateSelectedMenuItemAction } from "../../redux/actions/AdminAction";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export const AdminTemplate = (props) => {
    const { Component, ...restProps}  = props;
    const { admin_info } = useSelector( (state) => state.AdminReducer );
    const { admin_avatar } = useSelector((state) => state.AdminReducer);
    const { selectedMenuItem } = useSelector((state) => state.AdminReducer);
    
    const [select, setSelect] = useState (selectedMenuItem);
    const dispatch = useDispatch();
    
    useEffect(() =>{
        window.scrollTo(0, 0);
        setSelect(selectedMenuItem);
    }, [selectedMenuItem]);

    const handleSetMenu = (selectedMenuItem) =>{
        console.log("menu")
        dispatch(updateSelectedMenuItemAction(selectedMenuItem));
        window.location.reload();
    }
    const handleLogout = () =>{
        dispatch(logOutAction());
    }

    const menuItems = [
        {
          key: 'dashboard',
          icon: <i className="fa-solid fa-house"></i>,
          title: 'DASHBOARD',
          link: '/dashboard',
          onClick: () => {handleSetMenu("dashboard")}
        },
        {
          key: 'users',
          icon: <i className="fa-solid fa-user"></i>,
          title: 'USERS',
          className: 'font-weight-bold',
          items: [
            { key: 'tourists', title: 'TOURISTS', link: '/tourists-admin', onClick: () => {handleSetMenu("tourists-admin")}},
            { key: 'companies', title: 'COMPANIES', link: '/companies-admin', onClick: () => {handleSetMenu("companies-admin")}},
            { key: 'freelancers', title: 'FREELANCERS', link: '/freelancers-admin', onClick: () => {handleSetMenu("freelancers-admin'")}}
          ]
        },
        {
            key: 'tours',
            icon: <i className="fa-solid fa-list"></i>,
            title: 'TOURS',
            link: '/tours-admin',
            onClick: () => handleSetMenu("tours-admin")
        },
        {
            key: 'bookings',
            icon: <i className="fa-solid fa-receipt"></i>,
            title: 'BOOKING',
            link: '/bookings-admin',
            onClick: () => handleSetMenu("bookings-admin")
        },
        {
            key: 'profile-admin',
            icon: <i className="fa-solid fa-circle-user"></i>,
            title: 'PROFILE',
            link: '/profile-admin',
            onClick: () => {handleSetMenu("profile-admin")}
        },
        {
            key: 'logout',
            icon: <i className="fa-solid fa-right-from-bracket"></i>,
            title: 'LOGOUT',
            link: 'edit-profile',
            onClick: () => handleLogout()
        },
    ];
    
    return(
        <Route 
        {...restProps}
        render = {(propsRoute) =>{
            return(
                <div id='adminTemplate' className='position-relative'>
                    <Fragment>
                        <Header className='site-layout-background'>
                            <div className='logo-admin'>
                                <NavLink to="/admin-dashboard" title="Back to dashboard">
                                    <img src={logo} alt="logo"/>
                                </NavLink>
                            </div>
                            <div className="about-us">
                                <a href="/aboutus-admin" style={{fontSize:"15px", fontWeight:"500", color:"#0E4D90"}}>About us & FAQ</a>
                            </div>
                        </Header>
                        <Layout style={{minHeight:"100vh", marginTop:"65px"}} className='dashboard'>
                            <Sider>
                                <div className="info">
                                    <div className="avatar">
                                        <img src={admin_avatar} alt="avatar" />
                                    </div>
                                    <p style={{paddingLeft:"8px"}}>{admin_info.fullname}</p>
                                </div>
                                <Menu selectedKeys={[select]} mode='inline'>
                                    {menuItems.map((menuItem) => {
                                        if (menuItem.items) {
                                            return (
                                                <SubMenu key={menuItem.key} icon={menuItem.icon} title={menuItem.title} className={menuItem.className}>
                                                    {menuItem.items.map((subItem) => (
                                                        <Menu.Item key={subItem.key} icon={subItem.icon} onClick={subItem.onClick}>
                                                            <NavLink to={subItem.link} style={{fontWeight:"600"}}>{subItem.title}</NavLink>
                                                        </Menu.Item>
                                                    ))}
                                                </SubMenu>
                                            );
                                        } else {
                                            return (
                                                <Menu.Item key={menuItem.key} icon={menuItem.icon} onClick={menuItem.onClick}>
                                                    <NavLink to={menuItem.link} style={{fontWeight:"600"}}>{menuItem.title}</NavLink>
                                                </Menu.Item>
                                            );
                                        }
                                    })}
                                </Menu>
                            </Sider>

                            <Layout className='site-layout'>
                                <Content>
                                    <div className='site-layout-content' style={{ paddingTop: 40, paddingLeft: 70, paddingRight: 70}}>
                                        <Component {...propsRoute}/>
                                    </div>
                                </Content>
                            </Layout>
                        </Layout>
                    </Fragment>
                </div>
            );
        }}
        />
    );
};