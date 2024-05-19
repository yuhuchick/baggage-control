import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme,message ,Popconfirm,} from 'antd';
import classes from './index.module.css'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('主页', '/', <PieChartOutlined />),
  getItem('报警管理', '', <DesktopOutlined />,[
    getItem('报警数据','/alarmControl'),
    getItem('报警设置','/alarmControl/alarmSet')
  ]),
  getItem('摄像头管理', '/cameraControl', <UserOutlined />),
  getItem('边缘计算设备管理', '/edgeDeviceControl'  , <TeamOutlined />),
  getItem('算法管理', '/algorithmControl', <FileOutlined />),
  getItem('添加布控', '/addControl', <FileOutlined />),
];

export default function HomeLayout(){
    const navigate = useNavigate()
    //获取当前路径 用于菜单高亮
    const { pathname }= useLocation()
    //点击调转到对应地址
    const menuClick = (e)=>{
      navigate(e.key)
    }
    const getName = (pathname)=>{
      if(pathname === '/'){
        return '主页'
      }
      else if(pathname === '/alarmControl'){
        return '报警管理  /  报警数据'
      }
      else if(pathname === '/alarmControl/alarmSet'){
        return '报警管理  /  报警设置'
      }
      else if(pathname === '/cameraControl'){
        return '摄像头管理'
      }
      else if(pathname === '/edgeDeviceControl'){
        return '边缘计算设备管理'
      }
      else if(pathname === '/algorithmControl'){
        return '算法管理'
      }
      else if(pathname === '/addControl'){
        return '添加布控'
      }
      else if(pathname === '/sixth'){
        return '行李查询'
      }
      else if(pathname === '/sixth'){
        return '数据转发'
      }
    }
    const confirm = ()=>{
      navigate('/login')
      message.success('退出成功！')
    }
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <div className={classes.SystemName}><p>机场行李管理系统</p></div>
          <div className={classes.individual}>
              <div className={classes.leftCon}>
                <div className={classes.headImg}>
                </div>
              </div>
              {
                collapsed ? <></> : <div className={classes.rightCon}>
                <p className={classes.welcome}>welcome</p>
                <p className={classes.name}>admin</p>
              </div>
              }
          </div>
          <div className={classes.tip}><p>菜单</p></div>
          <Menu items={items} theme="dark" defaultSelectedKeys={[pathname]} selectedKeys={pathname} mode="inline" onClick={menuClick}>
        </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
        <div className={classes.user_info}>
          <span className={classes.user_name}>admin</span>
          <span className={classes.user_logout}>
            <Popconfirm 
             title="是否确认退出？" okText="退出" cancelText="取消"
             onConfirm={confirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
          </Header>
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
              items={[
                {title: '功能'},
                {title: getName(pathname)}
              ]}
            >
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 80,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet/>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
          </Footer>
        </Layout>
      </Layout>
    );
};