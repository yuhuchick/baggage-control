import React from "react";
import classes from './index.module.css'
import ReactPlayer from 'react-player';

export default function MyVideo({props}){
    console.log(props)
    return(
        <div className={classes.container}>
            <ReactPlayer
            url={'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4'}
            width={'100%'}
            height={'100%'}
            />
        </div>
    )
}