import React, { lazy } from 'react'
import classes from './index.module.css'
import HomeLayout from '../pages/HomeLayout'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'

const Home = lazy(()=>import('../pages/Home'))
const AlarmControl = lazy(()=>import('../pages/AlarmControl'))
const AlarmSet = lazy(()=>import('../pages/AlarmControl/AlarmSet'))
const CameraControl = lazy(()=>import('../pages/CameraControl'))
const LoginPage = lazy(()=>import('../pages/LoginPage'))
const EdgeDeviceControl = lazy(()=>import('../pages/EdgeDeviceControl'))
const AlgorithmControl = lazy(()=>import('../pages/AlgorithmControl'))
const AddControl = lazy(()=>import('../pages/AddControl'))
const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 40,
        size: 'large'
      }}
      spin
    />
  );

  //悬挂组件用于在异步加载数据时显示加载指示器
const withLoadingComponent = (comp) => (
  <React.Suspense fallback={<div className='classes.spinStyle'><Spin indicator={antIcon} /></div>}>{comp}</React.Suspense>
)


const routes = [
    {
        path: '/',
        element: <HomeLayout/>,
        children: [
            {
                path: '/',
                element: withLoadingComponent(<Home/>),
            },
            {
                path: 'alarmControl',
                element: withLoadingComponent(<AlarmControl/>),
            },
            {
                path: 'alarmControl/alarmSet',
                element: withLoadingComponent(<AlarmSet/>)
            },
            {
                path: 'cameraControl',
                element: withLoadingComponent(<CameraControl/>),
            },
            {
                path: 'edgeDeviceControl',
                element: withLoadingComponent(<EdgeDeviceControl/>),
            },
            {
                path: 'algorithmControl',
                element: withLoadingComponent(<AlgorithmControl/>),
            },
            {
                path: 'addControl',
                element: withLoadingComponent(<AddControl/>),
            },
        ]
    },
    {
        path: '/login',
        element: withLoadingComponent(<LoginPage/>),
    },
]
export default routes