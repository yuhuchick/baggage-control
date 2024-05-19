import React from "react";
import classes from './index.module.css'
import { useState } from "react";
import { useStore } from "../../../../store";

export default function SecondCard({props}){
    const {name,ip,storage} = props
    const {deviceStatusStore} = useStore()
   return(
    <div className={classes.container} onClick={deviceStatusStore.getStatus}>
        <span>设备名称：{name}</span>
        <span>IP: {ip}</span>
        <span>内存：{storage}</span>
        <span>{'>'}</span>
    </div>
   )
}