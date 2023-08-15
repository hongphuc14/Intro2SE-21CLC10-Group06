import { Route} from "react-router";
import { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../App";
import { Layout, Menu } from "antd";
import "./AdminTemplate.scss";
import logo from "./horizontal_black.png";
import { USER_LOGIN } from "../../util/config";
import { logOutAction } from "../../redux/actions/BasicAction";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export const AdminTemplate = (props) => {
    const { Component, ...restProps}  = props;
    const { admin_info } = useSelector( (state) => state.AdminReducer ) || JSON.parse(localStorage.getItem(USER_LOGIN));
    const { admin_avatar } = useSelector((state) => state.AdminReducer);
    console.log("admin_avatar_tem: ", admin_avatar);
    const dispatch = useDispatch();
    
    useEffect(() =>{
        window.scrollTo(0, 0);
    });
    const handleLogout = () =>{
        dispatch(logOutAction());
    }
    const menuItems = [
        {
          key: 'dashboard',
          icon: <i className="fa-solid fa-house"></i>,
          title: 'DASHBOARD',
          link: '/admin-dashboard'
        },
        {
          key: 'users',
          icon: <i className="fa-solid fa-user"></i>,
          title: 'USERS',
          className: 'font-weight-bold',
          items: [
            { key: 'tourists', title: 'TOURISTS', link: '/admin-users/tourists' },
            { key: 'companies', title: 'COMPANIES', link: '/admin-users/companies' },
            { key: 'freelancers', title: 'FREELANCERS', link: '/admin-users/freelancers' }
          ]
        },
        {
            key: 'tours',
            icon: <i className="fa-solid fa-list"></i>,
            title: 'TOURS',
            link: '/admin-tours'
        },
        {
            key: 'booking',
            icon: <i className="fa-solid fa-receipt"></i>,
            title: 'BOOKING',
            link: '/admin-booking'
        },
        {
            key: 'reviews',
            icon: <i className="fa-solid fa-star"></i>,
            title: 'REVIEWS',
            link: '/admin-reviews'
        },
        {
            key: 'report',
            icon: <i className="fa-solid fa-flag"></i>,
            title: 'REPORT',
            link: '/admin-report'
        },
        {
            key: 'profile',
            icon: <i className="fa-solid fa-circle-user"></i>,
            title: 'PROFILE',
            link: '/admin-profile'
        },
        {
            key: 'logout',
            icon: <i className="fa-solid fa-right-from-bracket"></i>,
            title: 'LOGOUT',
            link: 'edit-profile',
            onClick: handleLogout
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
                                <a href="#" style={{fontSize:"15px", fontWeight:"500", color:"#0E4D90"}}>About us & FAQ</a>
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
                                <Menu defaultSelectedKeys={["profile"]} mode='inline'>
                                    {menuItems.map((menuItem) => {
                                        if (menuItem.items) {
                                            return (
                                                <SubMenu key={menuItem.key} icon={menuItem.icon} title={menuItem.title} className={menuItem.className}>
                                                    {menuItem.items.map((subItem) => (
                                                        <Menu.Item key={subItem.key} icon={subItem.icon}>
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