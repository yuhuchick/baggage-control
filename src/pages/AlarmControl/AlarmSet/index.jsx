import React from "react";
import classes from './index.module.css'
import { Switch } from "antd";

export default function AlarmSet(){
    return(
        <div className={classes.alarm}>
            <p>是否开启声音报警 <span className={classes.setMargin}><Switch/></span></p>
            <p>是否开启灯光报警 <span className={classes.setMargin}><Switch/></span></p>
        </div> 
    )
}
