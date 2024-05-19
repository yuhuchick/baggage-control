import React from "react";
import classes from './index.module.css'
import { useState } from "react";

export default function MyCard({props}){
    const {algorithm,imgsrc,time,type} = props
    const getColor = (type)=>{
        if(type === '1'){
            return 'red'
        }else if(type === '2'){
            return 'blue'
        }else{
            return 'green'
        }
    }
    return(
        <div className={classes.container}>
            <div className={classes.algorithm}>
                <span style={{color : getColor(type)}}>{algorithm}</span>
            </div>
            <div className={classes.imgBox}>
                <img src={imgsrc} alt="" />
            </div>
            <div className={classes.time}>
                <span>{time}</span>
            </div>
        </div>
    )
}