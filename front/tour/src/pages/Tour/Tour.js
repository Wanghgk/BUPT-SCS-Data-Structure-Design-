import React, {useEffect,useRef} from "react";
import {NavLink} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import LeftBar from "../LeftBar/LeftBar";

import Style from "./Tour.module.css"
export default function Tour() {

    const darkness = useSelector(state => state.darkness.value)
    const tour = useRef()
    useEffect(()=>{
        if(darkness){
            tour.current.classList.add(Style["dark"])
        }else{
            tour.current.classList.remove(Style["dark"])
        }
    },[darkness])


    return (
        <div className={Style["tour"]} ref={tour}>
            <div className={Style["header"]}>
                <div className={Style["head-bar"]}>
                    <div className={Style["outline"]}><span>Tour</span></div>
                </div>
            </div>
            <div className={Style["leftbar"]}>
                <LeftBar/>
            </div>
            <div className={Style["main"]}>
                <Outlet/>
            </div>
            <div className={Style["footer"]}>

            </div>
        </div>
    )
}