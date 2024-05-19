import { makeAutoObservable } from "mobx";
import { Await } from "react-router-dom";

class DevideStatusStore {
    status = []
    constructor(){
        makeAutoObservable(this)
    }
    getStatus = async(id) => {
        
    }
}
export default DevideStatusStore