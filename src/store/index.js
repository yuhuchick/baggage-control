//统一处理
import React from "react";
import DevideStatusStore from "./deviceStatusStore";

class RootStore {
    constructor(){
        this.deviceStatusStore = new DevideStatusStore()

    }
}

const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = ()=> React.useContext(context)

export {useStore}